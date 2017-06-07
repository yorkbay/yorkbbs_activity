/**
 * Created by jack on 6/6/17.
 */
import './activitycheck.html';
import {activityCheckModify} from '../../../api/activity/methods.js';

Template.activitycheck.events({
    "click .layer-yes":function (event,instance) {
        const manager=Session.get("manager");

        var tagid=$("#tagid").val();
        if(tagid){
            var tag={
                "_id":tagid,
                "isshow":$("[name='isshow']:checked").val()=="true"?true:false

            };
            var tag = tagmodifyisshow.call(tag, function (err, result) {
                if (err || !result) {
                    return;
                }
                $('.J-label-pop').hide();
                $("#tagname").val('');
                $("#tagid").val('');
                return tag;
            });

        }else {
            var tag={
                "tg":$("#tagname").val(),
                "isshow":$("[name='isshow']:checked").val()=="true"?true:false,
                "st":"normal",
                "uid":manager.id,
                "uname":manager.uname,
                "dt":new Date()
            };
            var tag = tagInsert.call(tag, function (err, result) {
                if (err || !result) {
                    return;
                }
                $('.J-label-pop').hide();
                $("#tagname").val('');
                $("#tagid").val('');
                return tag;
            });
        }


    },
    "click .layer-close":function (event,instance) {

        $('.J-review-pop').hide();
    }
});