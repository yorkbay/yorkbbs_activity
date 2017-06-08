/**
 * Created by shunxiangchen on 5/12/17.
 */
import './error.html'
import {LogInsert} from '../../../api/log/methods.js';
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


        var log={
            ty:"front",
            action:"信息纠错",
            ip:headers.getClientIP(),
            from:"",
            refid:$("#refid").val(),
            ti:$("#refti").val(),
            meta:{
                uid:usr.id,
                usr:usr.uname,
                dt:new Date()
            }
        }
        LogInsert.call(log);
        return tag;
    }
});