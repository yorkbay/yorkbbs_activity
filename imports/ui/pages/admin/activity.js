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
import {LogInsert} from '../../../api/log/methods.js';

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
    instance.out = new ReactiveVar("");

    instance.activityid = new ReactiveVar("");
    instance.btime = new ReactiveVar("");
    instance.etime = new ReactiveVar("");



    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        const key = instance.key.get();
        const btime = instance.btime.get();
        const etime = instance.etime.get();
        const tag = instance.tag.get();
        const st = instance.st.get();
        const out = instance.out.get();
        const limit = instance.limit.get();

        instance.subscribe('admin_activitieslist', {
            key,btime,etime,tag,limit,st,out
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
        const btime = instance.btime.get();
        const etime = instance.etime.get();
        const tag = instance.tag.get();
        const st = instance.st.get();
        const out = instance.out.get();

        const limit = instance.limit.get();

        var query={};

        if(out){
            query["etime.date"]={$lte: new Date()};
        }

        if(key){
            let regex = new RegExp( key, 'i' );
            query={
                ti:regex
            }
        }

        if(btime || etime) {
            query.$and = [];
            if (btime) {
                let b = {'meta.dt': {$gte: new Date(moment(btime).format("YYYY-MM-DD"))}}
                query.$and.push(b);
            }

            if (etime) {
                let e = {'meta.dt': {$lte: new Date(moment(etime).format("YYYY-MM-DD"))}}
                query.$and.push(e);
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
    "display_st":function (st,edate) {
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

        if(new Date(edate)<new Date()){
            val="过期";
        }
        return val;
    },
    "display_show":function (st) {
        return st==="normal"?"checked":"";
    },
    "display_hidden":function (st) {
        return st==="hidden"?"checked":"";
    },
    "display_toptime":function (istop,time) {
        return istop?moment.utc(time).format("YYYY-MM-DD"):"";
    },
    "display_cmdtime":function (iscmd,time) {
        return iscmd?moment.utc(time).format("YYYY-MM-DD"):"";
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
        activitymodifyst.call(obj,function (err,result) {
            if(err)return;
            let manager=Session.get("manager");
            var log={
                ty:"backend",
                action:"删除信息",
                ip:headers.getClientIP(),
                from:"",
                refid:$(event.currentTarget).attr("itemid"),
                ti:"",
                meta:{
                    uid:manager._id,
                    usr:manager.uname,
                    dt:new Date()
                }
            }
            LogInsert.call(log);
        });
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
        instance.limit.set(numOfRecords);
    },
    'click .btn-keyword-search'(event,instance){
        var val= $.trim($("#keyword").val());
        instance.key.set(val);
        instance.limit.set(numOfRecords);
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

        activityCheckModify.call(activity,function (err,result) {
            if(err)return;
            let manager=Session.get("manager");
            var log={
                ty:"backend",
                action:"审核信息",
                ip:headers.getClientIP(),
                from:"",
                refid:$("#activityid").val(),
                ti:$("#activityti").val(),
                meta:{
                    uid:manager._id,
                    usr:manager.uname,
                    dt:new Date()
                }
            }
            LogInsert.call(log);
        });

        $('.J-review-pop').hide();
    },
    "click .layer-close":function (event,instance) {
        $('.J-review-pop').hide();
    },
    'change #st'(event,instance){
        var val= $(event.currentTarget).val();
        if(val=="out"){
            instance.out.set("true");
        }else {
            instance.st.set(val);
            instance.out.set("");
        }
        instance.limit.set(numOfRecords);
    },
    'blur #startdate'(event,instance){
        var val= $.trim($(event.currentTarget).val());
        instance.btime.set(val);
        instance.limit.set(numOfRecords);
    },
    'blur #enddate'(event,instance){
        var val= $.trim($(event.currentTarget).val());
        instance.etime.set(val);
        instance.limit.set(numOfRecords);
    },
});