/**
 * Created by jack on 5/23/17.
 */
import './comment.html';
import {Comment} from '../../../api/comment/comment.js';
import {commentmodifyst,commentmodifyreview,commentmodifystbyid} from '../../../api/comment/methods.js';
import {LogInsert} from '../../../api/log/methods.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_comment_list.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);
    instance.review = new ReactiveVar("");
    instance.key = new ReactiveVar("");
    instance.id = new ReactiveVar("");
    instance.isshow = new ReactiveVar("");

    instance.btime = new ReactiveVar("");
    instance.etime = new ReactiveVar("");

    instance.autorun(function () {
        const key = instance.key.get();
        const btime = instance.btime.get();
        const etime = instance.etime.get();
        const isshow = instance.isshow.get();
        const review = instance.review.get();
        const limit = instance.limit.get();

        instance.subscribe('admin_commentslist', {
            key,btime, etime,limit,isshow,review
        });

        const id = instance.id.get();
        instance.subscribe('commentfindbyid',id);

        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_comment_list.onRendered(function releaseOnRendered() {

    $('#startdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#enddate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});

Template.admin_comment_list.helpers({
    "list_item": function () {

        const instance = Template.instance();
        const key = instance.key.get();
        const btime = instance.btime.get();
        const etime = instance.etime.get();
        const isshow = instance.isshow.get();
        const review = instance.review.get();
        const limit = instance.limit.get();

        var query={};

        if(key){

            let regex = new RegExp( key, 'i' );
            query={
                ct:regex
            }

        }
        if(btime){
            query['meta.dt']={$gte:new Date(moment(btime).format("YYYY-MM-DD"))}
        }

        if(etime){
            query['meta.dt']={$lte:new Date(moment(etime).format("YYYY-MM-DD"))}
        }

        if(isshow){
            if(isshow =="true"){
                query.isshow=true;
            }else{
                query.isshow=false;
            }
        }

        if(review){
            if(review =="true"){
                query.review=true;
            }else{
                query.review=false;
            }
        }


        return Comment.find(query,{limit:limit,sort:{'meta.dt':-1}});
    },
    "display_isshow":function (review) {
      return review?"显示":"隐藏";
    },
    "display_review":function (review) {
        return review?"已审核":"未审核";
    },
    "comment":function () {
        const instance = Template.instance();
        var query={_id:instance.id.get()};

        return Comment.findOne(query);
    }
});


Template.admin_comment_list.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .del'(event, instance) {
        var obj={
            _id:$(event.currentTarget).attr("itemid"),
            st:"del"
        }

        commentmodifyst.call(obj,function (err,result) {
            if(err)return;
            let manager=Session.get("manager");
            var log={
                ty:"backend",
                action:"删除评论",
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
    'click .review'(event, instance) {
        instance.id.set($(event.currentTarget).attr("itemid"));
        $(".J-review-pop").show();
    },
    'change #review'(event,instance){
        var val= $(event.currentTarget).val();
        instance.review.set(val);
    },
    'change #isshow'(event,instance){
        var val= $(event.currentTarget).val();
        instance.isshow.set(val);
    },
    'click #search'(event,instance){
        var val= $("#keyword").val();
        instance.key.set(val);
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
        commentmodifystbyid.call(obj);
        let manager=Session.get("manager");
        var log={
            ty:"backend",
            action:"删除评论",
            ip:headers.getClientIP(),
            from:"",
            refid:itemid.toString(),
            ti:"",
            meta:{
                uid:manager._id,
                usr:manager.uname,
                dt:new Date()
            }
        }
        LogInsert.call(log);
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