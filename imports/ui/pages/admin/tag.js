/**
 * Created by jack on 5/23/17.
 */
import './tag.html';

import '../../components/layer/tagadd.js';
import './comment.html';
import {Tag} from '../../../api/tag/tag.js';
import {tagInsert,tagmodifyst} from '../../../api/tag/methods.js';

const numOfRecords = 10;

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

    instance.autorun(function () {

        const limit = instance.limit.get();

        instance.subscribe('tagslist', {
            limit
        });

        instance.ready.set(PostSubs.ready());
    });
});



Template.admin_tag_list.helpers({
    "list_item": function () {

        const instance = Template.instance();

        const limit = instance.limit.get();

        var query={};


        return Tag.find(query,{limit:limit,sort:{'meta.dt':-1}});
    },
    "display_isshow":function (isshow) {
        return isshow?"显示":"隐藏";
    }
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
    }
});