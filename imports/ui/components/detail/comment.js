/**
 * Created by shunxiangchen on 5/12/17.
 */
import './comment.html';

import {Comment} from '../../../api/comment/comment.js';

import {
    commentInsert
} from '../../../api/comment/methods.js'

Template.comment.events({
    "click #sub":()=>{
        var val=$("#ct").val();
        if($.trim(val)==""){
            return;
        }
        var doc= {
            "ct":$("#ct").val(),
            "st":"normal",
            "refid":$("#refid").val(),
            "meta":{
                "uid":"",
                "usr":""
            }

        };

        commentInsert.call(doc);
        $("#ct").val('');
    }
});