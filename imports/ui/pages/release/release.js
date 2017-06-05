/**
 * Created by jack on 5/17/17.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import './release.html';

import '../../components/release/mobile_menu.js';
import {Activity} from '../../../api/activity/activity.js'

import {
    insert
} from '../../../api/activity/methods.js';

import { usrCenterInsert } from '../../../api/usrcenter/methods.js'

Template.release.onCreated(function () {

});


Template.release.onRendered(function releaseOnRendered() {

    /*
    $('#bdate').datepicker();
    $('#btime').datepicker();
    $('#edate').datepicker();
    $('#etime').datepicker();
    */
    $('#bdate').datetimepicker();
    $('#edate').datetimepicker();



    $("a#dropzoneDiv").dropzone({
        url: "/upload" ,
        acceptedFiles:"image/*",
        uploadMultiple:true,
        success: function(file, response){
            $(".dz-preview").hide();

            var files=JSON.parse(response).files;
            files.forEach(function(file){
                var img="<img src='"+file.path+"' />";
                tinymce.activeEditor.insertContent(img);
            })
        }
    });

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

});

Template.release.helpers({

})

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
        var ct=tinymce.activeEditor.getContent();
        var doc= {
            "ti":$("#ti").val(),
            "st":"normal",
            "logo":getlogo(ct),
            "isonline":isonline,
            "location":$("#location").val(),
            "city":$("#city").val(),
            "address":$("#address").val(),
            "code":$("#code").val(),
            "btime":{
                "date":new Date($("#bdate").val()),
                "time":""
            },
            "etime":{
                "date":new Date($("#edate").val()),
                "time":""
            },
            "pic":['/img/img1.jpg'],
            "ct":ct,
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

        var Id = insert.call(doc);
        doc= {
            "ty":"relea",
            "refid":Id,
            "st":"normal",
            "meta":{
                "uid":usr.id,
                "usr":usr.uname
            }
        };
        console.log(doc);
        usrCenterInsert.call(doc);

        FlowRouter.go('/');
    },
});

function getlogo(content){
    return "/"+$(content).find('img:first').attr('src');
}