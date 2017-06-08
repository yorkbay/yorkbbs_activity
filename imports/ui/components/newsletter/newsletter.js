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
        var check = reg.test(email);
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

