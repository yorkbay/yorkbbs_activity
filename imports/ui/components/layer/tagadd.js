/**
 * Created by jack on 5/23/17.
 */
import './tagadd.html';
import {tagInsert} from '../../../api/tag/methods.js';

Template.admin_tag_add.events({
    "click .layer-yes":function (event,instance) {
        const manager=Session.get("manager");
        var tag={
            "tg":$("#tagname").val(),
            "isshow":$("#isshow").val()=="true"?true:false,
            "st":"normal",
            "uid":manager.id,
            "uname":manager.uname,
            "dt":new Date()
        };
        var tag=tagInsert.call(tag);
        $('.J-label-pop').hide();
        return tag;
    }
});