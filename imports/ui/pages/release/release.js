/**
 * Created by jack on 5/17/17.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import './release.html';

import '../../components/release/mobile_menu.js';
import '../../components/release/imgupload.js';
import {Activity} from '../../../api/activity/activity.js'

import {
    insert
} from '../../../api/activity/methods.js';

Template.release.onCreated(function () {

});


Template.release.onRendered(function releaseOnRendered() {

    //$("a#dropzoneDiv").dropzone({ url: "/file/post" });

    tinymce.init({
        selector: '#ct',
        skin_url: '/packages/teamon_tinymce/skins/lightgray'

    });

    $('.J-change-tags a').click(function(){
        var tag=$(this).attr("tag")+",";
        var val=$("#tags").val();
        if($(this).hasClass('release-tags-current')){
            val=val.replace(tag,'');
            $(this).removeClass('release-tags-current');
        }else{
            var current=$(".release-tags-current");
            if(current.length>=2){
                return false;
            }
            val=val+tag;
            $(this).addClass('release-tags-current');
        }
        $("#tags").val(val);

        return false;
    });


    /*
    $('#bdate').datetimepicker({
        format: 'yyyy-mm-dd',
        startView: 2,
        minView: 2,
        bootcssVer:3
    });
    $('#btime').datetimepicker({
        format: 'hh:ii',
        startView: 1,
        minView:1,
        maxView: 1,
        bootcssVer:3
    });
    $('#edate').datetimepicker({
        format: 'yyyy-mm-dd',
        startView: 2,
        minView: 2,
        bootcssVer:3
    });
    $('#etime').datetimepicker({
        format: 'hh:ii',
        startView: 1,
        minView:1,
        maxView: 1,
        bootcssVer:3
    });
    */

});

Template.release.events({
    "click #sub":()=>{
        let usr=Session.get('usr');
        var pr="free";
        if(!$("#isfree").is(':checked')){
            pr=$("#pr").val();
        }
        var isonline=$("#isonline").is(':checked');

        var tags=$("#tags").val().split(",");
        tags.pop();
        var doc= {
            "ti":$("#ti").val(),
            "st":"normal",
            "isonline":isonline,
            "location":$("#location").val(),
            "city":$("#city").val(),
            "address":$("#address").val(),
            "code":$("#code").val(),
            "btime":{
                "date":new Date($("#bdate").val()),
                "time":$("#btime").val()
            },
            "etime":{
                "date":new Date($("#edate").val()),
                "time":$("#etime").val()
            },
            "pic":['/img/img1.jpg'],
            "ct":tinymce.activeEditor.getContent(),
            "pr":pr,
            "site":$("#site").val(),
            "tel":$("#tel").val(),
            "tags":tags,
            "meta":{
                "uid":usr.id,
                "usr":usr.uname,
                "dt":new Date()
            }
        };
        //console.log(doc);
        var Id = insert.call(doc);
        //Activity.insert(doc,,{ validate: false, filter: false });

        FlowRouter.go('/');
    },
    'dropped #dropzoneDiv': function(e,template){
        e.preventDefault();
        console.log("hurra");
        console.log(e.originalEvent.dataTransfer.files); // this will contain the list of files that were dropped
    }
});