/**
 * Created by shunxiangchen on 5/12/17.
 */
import './user.html';
import {joinActivity} from '../../../api/activity/methods.js'

Template.user.events({
    "click #join":function (event,instance) {
        let usr=Session.get('usr');
        let doc={
            refid:$("#refid").val(),
            ti:$("#ti").val(),
            "meta":{
                "uid":usr.id,
                "usr":usr.uname,
                "avatar":usr.Avatar,
                "dt":new Date()
            }
        }
        joinActivity.call(doc,function (err,result) {
            if(result){
                $("#addshow").removeClass("none");
                $("#addshow").addClass("zanone");
            }
        });
    }
});


Template.user.helpers({
    "display_joinnum":function (joinnum) {
        return joinnum?joinnum:0;
    },
    "showavatar":function (avatar) {
        return avatar.replace("/media","/media/c3");
    }
});