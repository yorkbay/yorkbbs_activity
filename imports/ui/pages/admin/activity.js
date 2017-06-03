/**
 * Created by jack on 5/23/17.
 */
import './activity.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import {ReactiveVar} from 'meteor/reactive-var';
import { Activity } from '../../../api/activity/activity.js';
import '../../components/manager/checkManager.js';

import { activitymodifyst } from '../../../api/activity/methods.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_activity_list.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);

    instance.key = () => {
        return FlowRouter.getQueryParam('key')||"";
    };

    instance.time = () => {
        return FlowRouter.getQueryParam('time')||"";
    };
    instance.isfree = () => {
        return FlowRouter.getQueryParam('free')||"";
    };
    instance.tag = () => {
        return FlowRouter.getQueryParam('tag')||"";
    };
    instance.st = () => {
        return FlowRouter.getQueryParam('st')||"";
    };

    instance.isrmd = () => {
        return FlowRouter.getQueryParam('rmd')||"";
    };


    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        const key = instance.key();
        const time = instance.time();
        const isfree = instance.isfree();
        const tag = instance.tag();
        const st = instance.st();
        const isrmd = instance.isrmd();
        const limit = instance.limit.get();

        instance.subscribe('activitieslist', {
            key,time,isfree,tag,isrmd,limit,st
        });

        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_activity_list.onRendered(function releaseOnRendered() {

    $('#startdate').datetimepicker({
        format:'Y/m/d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:jQuery('#enddate').val()?jQuery('#enddate').val():false
            })
        },
        timepicker:false
    });
    $('#enddate').datetimepicker({
        format:'Y/m/d',
        onShow:function( ct ){
            this.setOptions({
                minDate:jQuery('#startdate').val()?jQuery('#startdate').val():false
            })
        },
        timepicker:false
    });

});

Template.admin_activity_list.helpers({
    "list_item": function () {

        const instance = Template.instance();
        const key = instance.key();
        const time = instance.time();
        const isfree = instance.isfree();
        const tag = instance.tag();

        const limit = instance.limit.get();

        var query={};
        if(key){
            let regex = new RegExp( key, 'i' );
            query={
                ti:regex
            }
        }
        if(time){
            var start = moment().startOf('day');
            var end = moment().endOf('day');


            query.btime={
                date:{$gte:start}
            }
        }
        if(isfree === "1"){
            query.pr={
                $eq: "free"
            };
        }else if(isfree === "0"){
            query.pr={
                $ne: "free"
            };
        }
        if(tag){
            query.tags={
                $in:[tag]
            }
        }
        //console.log(query);
        return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
    },
    "display_st":function (st) {
        let val="正常";
        switch (st){
            case "del":
                val="已删除";
                break;
            case "normal":
                val="正常";
                break;
        }
        return val;
    }
});


Template.admin_activity_list.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .del'(event, instance) {
        var obj={
            _id:$(event.currentTarget).attr("itemid"),
            st:"del"
        }
        activitymodifyst.call(obj);
    }

});