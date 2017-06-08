/**
 * Created by jack on 5/23/17.
 */
import './feedback.html';
import { Session } from 'meteor/session'
import '../../components/layer/tagadd.js';
import './comment.html';
import {Feedback} from '../../../api/feedback/feedback.js';
import {feedbackmodifyst,feedbackmanage,feedbackmodifystbyid} from '../../../api/feedback/methods.js';
import {LogInsert} from '../../../api/log/methods.js';

const numOfRecords = 10;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_feedback_list.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.key = new ReactiveVar("");
    instance.ismanage = new ReactiveVar("");
    instance.ty = new ReactiveVar("");
    instance.limit = new ReactiveVar(numOfRecords);

    instance.autorun(function () {
        const ismanage = instance.ismanage.get();
        const ty = instance.ty.get();
        const key = instance.key.get();
        const limit = instance.limit.get();

        instance.subscribe('feedbackslist', {
            key,ty,ismanage,limit
        });

        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_feedback_list.onRendered(function FeedbackOnRendered() {


});


Template.admin_feedback_list.helpers({
    "list_item": function () {

        const instance = Template.instance();
        const key = instance.key.get();
        const ismanage = instance.ismanage.get();
        const ty = instance.ty.get();

        const limit = instance.limit.get();

        var query={};
        if(key){
            let regex = new RegExp( key, 'i' );
            query.ct=regex
        }
        if(ty){
            query.ty={$in:[ty]}
        }

        if(ismanage){
            if(ismanage =="true"){
                query.ismanage=true;
            }else{
                query.ismanage=false;
            }
        }

        return Feedback.find(query,{limit:limit,sort:{fddt:-1}});
    },
    "display_ismanage":function (ismanage) {
        return ismanage?"已处理":"未处理";
    }
});


Template.admin_feedback_list.events({
    'click .J-process'(event, instance) {
        $('.J-report-pop').show();
        var ismanage=$(event.currentTarget).attr("ismanage")
        $("#itemid").val($(event.currentTarget).attr("itemid"));
        $("#mct").val($(event.currentTarget).attr("mct"));
        if(ismanage){
            $('input:radio[name=ismanage]').filter('[value=true]').prop('checked', true);
        }else{
            $('input:radio[name=ismanage]').filter('[value=false]').prop('checked', true);
        }
    },
    'click .layer-close'(event, instance) {
        $('.J-report-pop').hide();
        $("#mct").val("");
    },
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .del'(event, instance) {
        var obj={
            _id:$(event.currentTarget).attr("itemid"),
            st:"del"
        }

        feedbackmodifyst.call(obj);
        let manager=Session.get("manager");
        var log={
            ty:"backend",
            action:"删除举报",
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
    },
    'change #ismanage'(event,instance){
        var val= $(event.currentTarget).val();
        instance.ismanage.set(val);
    },
    'change #ty'(event,instance){
        var val= $(event.currentTarget).val();
        instance.ty.set(val);
    },
    'click #search'(event,instance){
        var val= $("#keyword").val();
        instance.key.set(val);
    },
    'click .layer-yes'(event,instance){
        var manager=Session.get("manager");
        var obj={
            _id:$("#itemid").val(),
            ismanage:$("[name='ismanage']:checked").val()=="true"?true:false,
            mid:manager._id,
            mname:manager.uname,
            mct:$.trim($("#mct").val()),
            mdt:new Date()
        };
        feedbackmanage.call(obj);

        var log={
            ty:"backend",
            action:"处理举报",
            ip:headers.getClientIP(),
            from:"",
            refid:$("#itemid").val(),
            ti:"",
            meta:{
                uid:manager._id,
                usr:manager.uname,
                dt:new Date()
            }
        }
        LogInsert.call(log);
        $('.J-report-pop').hide();
        $("#mct").val("");
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
        console.log(obj);
        feedbackmodifystbyid.call(obj);
    }

});