/**
 * Created by shunxiangchen on 5/12/17.
 */
import './comment.html';
import { Session } from 'meteor/session';

import {Comment} from '../../../api/comment/comment.js';

import {
    commentInsert
} from '../../../api/comment/methods.js'

Template.comment.events({
    "click #sub":()=>{
        let usr=Session.get('usr');

        var val=$("#commentct").val();
        if($.trim(val)==""){
            return;
        }
        var doc= {
            "ct":val,
            "st":"normal",
            "isshow":true,
            "ti":$("#ti").val(),
            "review":false,
            "refid":$("#refid").val(),
            "meta":{
                "uid":usr.id,
                "usr":usr.uname,
                "dt":new Date()
            }

        };

        commentInsert.call(doc);
        $("#commentct").val('');
    }
});