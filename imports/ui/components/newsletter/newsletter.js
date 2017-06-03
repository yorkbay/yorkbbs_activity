/**
 * Created by shunxiangchen on 5/12/17.
 */
import './newsletter.html';

import {newsletterInsert} from '../../../api/newsletter/methods.js';

Template.newsletter.events({
    'click #submitnewsletter':function () {
        const usr=Session.get("usr");
        let email=$.trim($("#newsletter-email").val());
        if(email){
            let doc={
                email:email,
                st:"normal",
                issend:false,
                uid:usr.id,
                uname:usr.uname
            }
            newsletterInsert.call(doc);
            $(".emailsuccess").show();
            $(".emailinput").hide();
            $("#newsletter-email").val("");
        }
    }
});

