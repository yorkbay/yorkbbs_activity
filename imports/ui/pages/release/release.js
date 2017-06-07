/**
 * Created by jack on 5/17/17.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import './release.html';

import '../../components/release/mobile_menu.js';
import {Activity} from '../../../api/activity/activity.js';
import {Tag} from '../../../api/tag/tag.js';

import {
    insert
} from '../../../api/activity/methods.js';

import { usrCenterInsert } from '../../../api/usrcenter/methods.js'

Template.release.onCreated(function () {
    const instance = this;

    instance.autorun(function () {
        instance.subscribe('tagslist');
    });
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
                var imageurl='/upload/'+file.name+':'+file._path+',';
                let hdnimagurl=$("#imageurl").val();
                hdnimagurl=hdnimagurl+imageurl;
                $("#imageurl").val(hdnimagurl);
                //var img="<img src='"+file.path+"' />";
                var img="<img src='/upload/"+file.name+"'  data-src='"+file._path+"'/>";
                tinymce.activeEditor.insertContent(img);
            })
        }
    });

    tinymce.init({
        selector: '#ct',
        skin_url: '/packages/teamon_tinymce/skins/lightgray'

    });

});

Template.release.helpers({
    'tags':function () {
        return Tag.find({});
    }
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

        ct=replaceContent(ct);


        var doc= {
            "ti":$("#ti").val(),
            "st":"normal",
            "isshow":true,
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

        usrCenterInsert.call(doc);

        FlowRouter.go('/');

    },
    'click .J-change-tags a':(event,instance)=>{
        var tag=$(event.currentTarget).attr("tag")+",";
        var val=$("#tags").val();
        if($(event.currentTarget).hasClass('release-tags-current')){
            val=val.replace(tag,'');
            $(event.currentTarget).removeClass('release-tags-current');
        }else{
            var current=$(".release-tags-current");
            if(current.length>=2){
                return false;
            }
            val=val+tag;
            $(event.currentTarget).addClass('release-tags-current');
        }
        $("#tags").val(val);
    }
});



function getlogo(content){
    return "/"+$(content).find('img:first').attr('src');
}


function replaceContent(content){
    var ct=content;
   $(ct).find('img').each(function () {
        const data_src=$(this).attr("data-src");
        $(this).attr("src",data_src);
    });
    return ct;


}