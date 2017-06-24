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
            });

            let ct=tinymce.activeEditor.getContent();
            let logo=getlogo(ct);
            if(logo){
                $(".release-pic").show();
                $('.release-pic').find('img').attr('src',logo);
            }else{
                $(".release-pic").hide();
            }
        }
    });

    tinymce.remove();
    tinymce.init({
        selector: '#ct',
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
        skin_url: '/packages/teamon_tinymce/skins/lightgray'
    });


    SEO.set({
        title: '活动编辑 - 约克论坛活动预告',
        keywords:'多伦多周末好去处,周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩,本周好去处,本周活动,周末好去处,娱乐活动,多伦多周末有什么好玩的地方,周末好玩的活动,周末去哪玩儿',
        description: '约克论坛活动预告,为加拿大多伦多地区的华人和留学生提供周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩等多伦多活动预告信息'
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

        let isonline=$("#isonline").is(':checked');
        let isifree=$("#isfree").is(':checked');
        let pr=$.trim($("#pr").val());
        let ti=$.trim($("#ti").val());
        let location=$.trim($("#location").val());
        let city=$.trim($("#city").val());
        let address=$.trim($("#address").val());
        let code=$.trim($("#code").val());
        let bdate=$.trim($("#bdate").val());
        let btime=$.trim($("#btime").val());
        let edate=$.trim($("#edate").val());
        let etime=$.trim($("#etime").val());
        let site=$.trim($("#site").val());
        let tel=$.trim($("#tel").val());
        let tags=$.trim($("#tags").val());

        let ct=tinymce.activeEditor.getContent();
        $(".l-release-main").find("input").removeClass("release-hints");
        if(!ti){
            $("#ti").addClass("release-hints");
            $("#ti").focus();
            return;
        }else if(ti.length>20){
            $("#ti").addClass("release-hints");
            $("#ti").focus();
            Bert.alert( '不能超过20个字', 'danger',"growl-top-right");
            return;
        }

        if(!isonline){
            if(!city){
                $("#city").addClass("release-hints");
                $("#city").focus();
                return;
            }
            if(!address){
                $("#address").addClass("release-hints");
                $("#address").focus();
                return;
            }
            if(!code){
                $("#code").addClass("release-hints");
                $("#code").focus();
                return;
            }
        }

        if(!bdate){
            $("#bdate").addClass("release-hints");
            $("#bdate").focus();
            return;
        }
        if(!btime){
            $("#btime").addClass("release-hints");
            $("#btime").focus();
            return;
        }
        if(!edate){
            $("#edate").addClass("release-hints");
            $("#edate").focus();
            return;
        }
        if(!etime){
            $("#etime").addClass("release-hints");
            $("#etime").focus();
            return;
        }
        if(!ct){
            tinyMCE.get('ct').focus()
            return;
        }

        if(!isifree && !pr){
            $("#pr").addClass("release-hints");
            $("#pr").focus();
            return;
        }

        if(site && site.indexOf("http")<0){
            Bert.alert( '活动网站必须以http开头', 'danger',"growl-top-right");
            return;
        }

        if(!tel){
            $("#tel").addClass("release-hints");
            $("#tel").focus();
            return;
        }

        if(!tags){
            Bert.alert( '请至少选择一种活动类型', 'danger',"growl-top-right");
            return;
        }


        let usr=Session.get('usr');
        let manager=Session.get('manager');
        if(manager && manager._id){
            usr={
                id:manager._id,
                uname:manager.uname
            }
        }


        if(!$("#isfree").is(':checked')){
            pr=$("#pr").val();
        }else{
            pr="free";
        }


        tags=$("#tags").val().split(",");
        tags.pop();




        var imageurl=$("#imageurl").val().split(',');
        imageurl.pop();

        imageurl.forEach(function (i) {
            let o_n=i.split(':');
            ct=ct.replace(o_n[0],o_n[1]);
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
            "tags":tags,
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
    return $(content).find('img:first').attr('src').replace('..','');
}