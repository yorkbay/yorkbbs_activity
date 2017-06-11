/**
 * Created by jack on 5/23/17.
 */
import './tag.html';

import '../../components/layer/tagadd.js';
import './comment.html';
import {Tag} from '../../../api/tag/tag.js';
import {tagInsert,tagmodifyst} from '../../../api/tag/methods.js';
import {activityAggr} from '../../../api/activity/methods.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_tag_list.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);
    instance.id = new ReactiveVar("");

    instance.autorun(function () {

        const limit = instance.limit.get();
        const id = instance.id.get();

        instance.subscribe('admin_tagslist', {
            limit
        });

        instance.subscribe('tagfindbyid',id);

        //instance.subscribe('admin_activitiestags');

        instance.ready.set(PostSubs.ready());
    });
});



Template.admin_tag_list.helpers({
    "list_item": function () {

        const instance = Template.instance();

        const limit = instance.limit.get();

        var query={};


        return Tag.find(query,{limit:limit,sort:{'dt':-1}});
    },
    "display_isshow":function (isshow) {
        return isshow?"显示":"隐藏";
    },
    "tag":function () {
        const instance = Template.instance();
        var query={_id:instance.id.get()};

        return Tag.findOne(query);
    },
    /*
    "aggr_tag":function () {
        activityAggr.call({},function (err,result) {
            console.log("Explain Report:", JSON.stringify(result[0]), null, 2);
        });
        return "";
    }
    */
});


Template.admin_tag_list.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .del'(event, instance) {
        var obj={
            _id:$(event.currentTarget).attr("itemid"),
            st:"del"
        }

        tagmodifyst.call(obj);
    },
    'click .J-add-label'(event, instance) {
        $('.J-label-pop').show();
    },
    'click .J-edite-label'(event, instance) {
        $('.J-label-pop').show();
        instance.id.set($(event.currentTarget).attr("itemid"));
    },

});