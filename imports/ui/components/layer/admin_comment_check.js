/**
 * Created by jack on 6/6/17.
 */
import './admin_comment_check.html';
import {Comment} from '../../../api/comment/comment.js';
import {commentcheck} from '../../../api/comment/methods.js';

Template.admin_comment_check.events({
    "click .layer-yes":function (event,instance) {
        let comment={
            _id:$("#commentid").val(),
            isshow:$("[name='isshow']:checked").val()=="true"?true:false,
            review:$("[name='review']:checked").val()=="true"?true:false,
            ct:$("#ct").val()
        }
        commentcheck.call(comment);
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