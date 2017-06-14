/**
 * Created by jack on 5/23/17.
 */
import './tag.html';

import '../../components/layer/tagadd.js';
import './comment.html';
import {Tag} from '../../../api/tag/tag.js';
import {tagInsert,tagmodifyst} from '../../../api/tag/methods.js';
import {activityAggr} from '../../../api/activity/methods.js';
import {Facets} from '../../../api/activity/facets.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

let categorizedByTags;

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

        const key ="";
        const time = "";
        const isfree = "";
        const tag = "";
        const isrmd = "";
        instance.subscribe('tags.facets',{
            key,time,isfree,tag,isrmd
        });

        //instance.subscribe('admin_activitiestags');

        instance.ready.set(PostSubs.ready());
    });

});



Template.admin_tag_list.helpers({
    "list_item": function () {

        const instance = Template.instance();

        const limit = instance.limit.get();

        var query={};

        const key = "";
        const time = "";
        const isfree = "";
        const tag = "";
        const isrmd = "";

        const token = Facets.getToken({
            key,time,isfree,tag,isrmd
        });

        let facets=Facets.findOne({token});
        let categorizedByTags=[]
        if(facets) {
            categorizedByTags=facets.data.categorizedByTags;
        }

        let tags=Tag.find(query,{limit:limit,sort:{'dt':-1}});
        return {
            tags:tags,
            facets:categorizedByTags
        };
        //return Tag.find(query,{limit:limit,sort:{'dt':-1}});
    },
    "display_isshow":function (isshow) {
        return isshow?"显示":"隐藏";
    },
    "tag":function () {
        const instance = Template.instance();
        var query={_id:instance.id.get()};

        return Tag.findOne(query);
    },
    "aggr_tag":function (tg) {
        let count=0;
        categorizedByTags.forEach(function (t) {
            let tag=t._id;
            console.log(tag+"----"+tg);
            if(tg===tag){
                count= t.count;
            }
        });
        return count;
    },
    "display_num":function (tg,facets) {
        let count=0;
        if(facets) {
            facets.forEach(function (t) {
                let tag = t._id;
                if (tg === tag) {
                    count = t.count;
                }
            });
        }
        return count;
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
    },
    'click .J-add-label'(event, instance) {
        $('.J-label-pop').show();
    },
    'click .J-edite-label'(event, instance) {
        $('.J-label-pop').show();
        instance.id.set($(event.currentTarget).attr("itemid"));
    },

});