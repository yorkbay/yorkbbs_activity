/**
 * Created by shunxiangchen on 5/12/17.
 */
import './error.html'

import {feedbackInsert} from '../../../api/feedback/methods.js';

Template.error.events({
    "click .layer-yes":function (event,instance) {
        const usr=Session.get("usr");
        var ty=[];
        $('input[name="errortype"]:checked').each(function() {
            ty.push(this.value);
        });

        var tag={
            "st":"normal",
            "ty":ty,
            "ct":$.trim($("#ct").val()),
            "refid":$("#refid").val(),
            "refti":$("#refti").val(),
            "fduid":usr.id,
            "fduname":usr.uname,
            "fddt":new Date(),
            "ismanage":false
        };
        var feedback=feedbackInsert.call(tag);
        $('.J-error-layer').hide();
        return tag;
    }
});