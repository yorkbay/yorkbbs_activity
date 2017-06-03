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

        var val=$("#ct").val();
        if($.trim(val)==""){
            return;
        }
        var doc= {
            "ct":$("#ct").val(),
            "st":"normal",
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
        $("#ct").val('');
    }
});