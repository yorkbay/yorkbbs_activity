/**
 * Created by jack on 6/6/17.
 */
import './admin_comment_check.html';
import {Comment} from '../../../api/comment/comment.js';
import {commentcheck} from '../../../api/comment/methods.js';
import {LogInsert} from '../../../api/log/methods.js';

Template.admin_comment_check.events({
    "click .layer-yes":function (event,instance) {
        let comment={
            _id:$("#commentid").val(),
            isshow:$("[name='isshow']:checked").val()=="true"?true:false,
            review:$("[name='review']:checked").val()=="true"?true:false,
            ct:$("#ct").val()
        }
        commentcheck.call(comment,function (err,result) {
            if(err)return;
            let manager=Session.get("manager");
            var log={
                ty:"backend",
                action:"审核评论",
                ip:headers.getClientIP(),
                from:"",
                refid:$("#commentid").val(),
                ti:"",
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
    }
});

Template.admin_comment_check.helpers({
    "display_isshow_show":function (isshow) {
        return isshow?"checked":"";
    },
    "display_isshow_hidden":function (isshow) {
        return !isshow?"checked":"";
    },
    "display_review_show":function (review) {
        return review?"checked":"";
    },
    "display_review_hidden":function (review) {
        return !review?"checked":"";
    }

});