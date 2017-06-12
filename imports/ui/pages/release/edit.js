/**
 * Created by jack on 5/17/17.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import './edit.html';

import '../../components/release/mobile_menu.js';
import {Activity} from '../../../api/activity/activity.js';
import {Tag} from '../../../api/tag/tag.js';

import {
    modify
} from '../../../api/activity/methods.js';



Template.edit.onCreated(function () {
    const instance = this;


    const id=FlowRouter.getParam('id');

    let manager=Session.get('manager');
    if(!manager || !manager._id){
        FlowRouter.go('/');
    }
    if(!id){
        FlowRouter.go('/');
    }

    instance.autorun(function () {
        instance.subscribe('tagslist');

        instance.subscribe('activitybyid', id);
    });
});


Template.edit.onRendered(function releaseOnRendered() {

    $('#bdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#edate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#btime').datetimepicker({
        format: 'LT'
    });
    $('#etime').datetimepicker({
        format: 'LT'
    });

    $("a#dropzoneDiv").dropzone({
        url: "/upload" ,
        acceptedFiles:"image/*",
        uploadMultiple:true,
        success: function(file, response){
            $(".dz-preview").hide();

            var files=JSON.parse(response).files;

            files.forEach(function(file){
                var imageurl='upload/'+file.name+':'+file._path+',';
                let hdnimagurl=$("#imageurl").val();
                hdnimagurl=hdnimagurl+imageurl;
                $("#imageurl").val(hdnimagurl);
                //var img="<img src='"+file.path+"' />";
                var img="<img src='/upload/"+file.name+"'  refsrc='"+file._path+"'/>";
                tinymce.activeEditor.insertContent(img);
            })
        }
    });

    tinymce.init({
        selector: '#ct',
        skin_url: '/packages/teamon_tinymce/skins/lightgray'

    });
});

Template.edit.helpers({
    'tags':function () {
        return Tag.find({});
    },
    'Activity':function () {
        const id=FlowRouter.getParam('id');
        let activity=Activity.findOne({_id:id});

        return activity;
    },
    'display_isonline':function (isonline) {
        if(isonline){
            $('.J-online-or').parents().find('.J-online-or').attr('disabled','disabled');
            return "checked";
        }
        return isonline?"checked":"";
    },
    'display_isfree':function (isfree) {
        if(isfree=="free"){
            $('.J-free-or').attr('disabled','disabled');
            return "checked";
        }
    },
    'display_ct':function (ct) {
        if(tinymce.activeEditor) {
            tinymce.activeEditor.insertContent(ct);
        }
    },
    'display_tag':function (tag,tags) {
        if(tags && tags.indexOf(tag)>=0){
            return "release-tags-current";
        }
    },
    'display_city':function (city) {
        $("#city").val(city);
    }
})

Template.edit.events({
    'change #isonline':function (event,instance) {
        let ischeck=event.target.checked;
        if(ischeck){
            $('.J-online-or').parents().find('.J-online-or').attr('disabled','disabled');
        }else{
            $('.J-online-or').parents().find('.J-online-or').attr('disabled',false);
        }
    },
    'change #isfree':function (event,instance) {
        let ischeck=event.target.checked;
        if(ischeck){
            $('.J-free-or').attr('disabled','disabled');
        }else{
            $('.J-free-or').attr('disabled',false);
        }
    },
    "click #sub":()=>{

        var pr="free";
        if(!$("#isfree").is(':checked')){
            pr=$("#pr").val();
        }
        var isonline=$("#isonline").is(':checked');

        var tags=$("#tags").val().split(",");
        tags.pop();

        var ct=tinymce.activeEditor.getContent();

        var imageurl=$("#imageurl").val().split(',');
        imageurl.pop();

        imageurl.forEach(function (i) {
            let o_n=i.split(':');
            ct=ct.replace(o_n[0],o_n[1]).replace('../','');

        });

        let Id=$("#activityid").val();
        var doc= {
            "_id":Id,
            "ti":$("#ti").val(),
            "logo":getlogo(ct),
            "isonline":isonline,
            "location":$("#location").val(),
            "city":$("#city").val(),
            "address":$("#address").val(),
            "code":$("#code").val(),
            "btime":{
                "date":new Date($("#bdate").val()),
                "time":$('#btime').val()
            },
            "etime":{
                "date":new Date($("#edate").val()),
                "time":$('#etime').val()
            },
            "ct":ct,
            "pr":pr,
            "site":$("#site").val(),
            "tel":$("#tel").val(),
        };


        modify.call(doc);

        FlowRouter.go('/activity/'+Id);

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
    return $(content).find('img:first').attr('src').replace('../','');
}