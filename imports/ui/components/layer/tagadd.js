/**
 * Created by jack on 5/23/17.
 */
import './tagadd.html';
import {tagInsert,tagmodifyisshow} from '../../../api/tag/methods.js';

Template.admin_tag_add.events({
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
            let tg=$("#tagname").val();
            if(!tg)return;
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
        $("#tagname").val('');
        $("#tagid").val('');
        $('.J-label-pop').hide();
    }
});


Template.admin_tag_add.helpers({
    "display_show":function (isshow) {
        return isshow?"checked":"";
    },
    "display_hidden":function (isshow) {
        return !isshow?"checked":"";
    }

});