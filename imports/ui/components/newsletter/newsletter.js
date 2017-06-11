/**
 * Created by shunxiangchen on 5/12/17.
 */
import './newsletter.html';

import {newsletterInsert} from '../../../api/newsletter/methods.js';

Template.newsletter.events({
    'click #submitnewsletter':function () {
        const usr=Session.get("usr");
        var reg = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;
        let email=$.trim($("#newsletter-email").val());
         if(!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/.test(email)) {
             Bert.alert( '请输入正确的邮件地址', 'danger',"growl-top-right");
             return;
         }

        if(email){
            let doc={
                email:email,
                st:"normal",
                issend:false,
                uid:usr.id,
                uname:usr.uname
            }
            newsletterInsert.call(doc);

            $("#newsletter-email").val("");
            $(".emailinput").hide();
            $('.emailsuccess').show();
            $(this).addClass('release-hints')
        }else{
            $('.emailsuccess').hide();
            $(this).removeClass('release-hints')
        }

    }
});

