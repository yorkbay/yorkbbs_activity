/**
 * Created by jack on 5/23/17.
 */
import './activity.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import {ReactiveVar} from 'meteor/reactive-var';
import { Activity } from '../../../api/activity/activity.js';
import '../../components/manager/checkManager.js';
import { Tag } from '../../../api/tag/tag.js';
import { activitymodifyst,activitymodifystbyid,activityCheckModify} from '../../../api/activity/methods.js';

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
    instance.tag = new ReactiveVar("");
    instance.key = new ReactiveVar("");
    instance.st = new ReactiveVar("");

    instance.activityid = new ReactiveVar("");


    instance.time = () => {
        return FlowRouter.getQueryParam('time')||"";
    };



    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        const key = instance.key.get();
        const time = instance.time();
        const tag = instance.tag.get();
        const st = instance.st.get();
        const limit = instance.limit.get();

        instance.subscribe('admin_activitieslist', {
            key,time,tag,limit,st
        });

        instance.subscribe('tagslist');

        const activityid = instance.activityid.get();
        instance.subscribe('activitybyid',activityid);

        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_activity_list.onRendered(function releaseOnRendered() {
    $('#startdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#enddate').datetimepicker({
        format: 'YYYY-MM-DD'
    });

    $('#toptime').datetimepicker({
        format: 'YYYY-MM-DD'
    });

    $('#cmdtime').datetimepicker({
        format: 'YYYY-MM-DD'
    });


});

Template.admin_activity_list.helpers({
    "list_item": function () {

        const instance = Template.instance();
        const key = instance.key.get();
        const time = instance.time();
        const tag = instance.tag.get();
        const st = instance.st.get();

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

        if(st){
            query.st=st;
        }

        if(tag){
            query.tags={
                $in:[tag]
            }
        }

        return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
    },
    "display_st":function (st) {
        let val="正常";
        switch (st){
            case "del":
                val="已删除";
                break;
            case "hidden":
                val="隐藏";
                break;
            case "normal":
                val="正常";
                break;
        }
        return val;
    },
    "display_show":function (st) {
        return st==="normal"?"checked":"";
    },
    "display_hidden":function (st) {
        return st==="hidden"?"checked":"";
    },
    'tags':function () {
        return Tag.find({});
    },
    'Activity':function () {
        const instance = Template.instance();
        const _id=instance.activityid.get();
        return Activity.findOne({_id:_id});
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
    },
    'click #delall'(event,instance){
        var itemid=[];
        $('input[name="delcheckbox"]:checked').each(function() {
            itemid.push(this.value);
        });
        var obj={
            _id:itemid,
            st:"del"
        }
        activitymodifystbyid.call(obj);
    },
    'change #tags'(event,instance){
        var val= $(event.currentTarget).val();
        instance.tag.set(val);
    },
    'click .btn-keyword-search'(event,instance){
        var val= $.trim($("#keyword").val());
        instance.key.set(val);
    },
    'click .J-review'(event,instance){
        var val= $(event.currentTarget).attr("itemid");
        instance.activityid.set(val);
        $('.J-review-pop').show();
    },
    "click .layer-yes":function (event,instance) {
        let toptime=$.trim($("#toptime").val());
        let cmdtime=$.trim($("#cmdtime").val());
        let istop=false,iscmd=false;
        if(toptime){
            istop=true;
        }
        if(cmdtime){
            iscmd=true;
        }
        let id=$("#activityid").val();

        let activity={
            _id:id,
            st:$("[name='isshow']:checked").val()=="true"?"normal":"hidden",
            istop:istop,
            toptime:toptime,
            iscmd:iscmd,
            cmdtime:cmdtime,
            topsort:$("#topsort").val(),
            imgtagcl:$("#imgtagcl").val(),
            imgtag:$("#imgtag").val()

        }

        activityCheckModify.call(activity);
        $('.J-review-pop').hide();
    },
    "click .layer-close":function (event,instance) {

        $('.J-review-pop').hide();
    },
    'change #st'(event,instance){
        var val= $(event.currentTarget).val();
        instance.st.set(val);
    },

});