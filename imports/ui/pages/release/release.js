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
import {LogInsert} from '../../../api/log/methods.js';

GoogleMaps.load({ v: '3', key: 'AIzaSyD0uzSeEzo4VtiYz9nIxFsRN2AWLa6s-vA', libraries: 'geometry,places' });

Template.release.onCreated(function () {
    const instance = this;

    instance.autorun(function () {
        instance.subscribe('tagslist');

    });
});


Template.release.onRendered(function releaseOnRendered() {

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
        title: '活动发布 - 约克论坛活动预告',
        keywords:'多伦多周末好去处,周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩,本周好去处,本周活动,周末好去处,娱乐活动,多伦多周末有什么好玩的地方,周末好玩的活动,周末去哪玩儿',
        description: '约克论坛活动预告,为加拿大多伦多地区的华人和留学生提供周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩等多伦多活动预告信息'
    });

});

Template.release.helpers({
    'tags':function () {
        return Tag.find({});
    },
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(43.7182197, -79.4482687),
                zoom: 12
            };
        }
    }
})

let markers=[];
Template.release.events({
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
    "click #sub":(event,instance)=>{

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


        var doc= {
            "ti":$("#ti").val().replace("|",""),
            "st":"normal",
            "logo":getlogo(ct),
            "isonline":isonline,
            "location":$("#location").val(),
            "city":$("#city").val(),
            "address":$("#address").val(),
            "code":$("#code").val(),
            "btime":{
                "date":new Date($("#bdate").val()+" 00:00:00"),
                "time":$('#btime').val()
            },
            "etime":{
                "date":new Date($("#edate").val()+" 00:00:00"),
                "time":$('#etime').val()
            },
            "ct":ct,
            "pr":pr,
            "joinnum":0,
            "lat":$("#hdnlat").val(),
            "lng":$("#hdnlng").val(),
            "site":$("#site").val(),
            "tel":$("#tel").val(),
            "tags":tags,
            "meta":{
                "uid":usr.id,
                "usr":usr.uname,
                "dt":new Date()
            }
        };

        if(!doc.logo){
            Bert.alert( '请至少上传一张图片，作为封面图', 'danger',"growl-top-right");
            return;
        }

        $("#sub").prop( "disabled", true );
        insert.call(doc,function (err,result) {
            if(err){
                console.log(err);
                return;
            }

            doc= {
                "ty":"relea",
                "refid":result,
                "st":"normal",
                "meta":{
                    "uid":usr.id,
                    "usr":usr.uname
                }
            };

            usrCenterInsert.call(doc);

            var log={
                ty:"front",
                action:"发布信息",
                ip:headers.getClientIP(),
                from:"",
                refid:result,
                ti:$("#ti").val(),
                meta:{
                    uid:usr.id,
                    usr:usr.uname,
                    dt:new Date()
                }
            }
            LogInsert.call(log);

            FlowRouter.go('/activity/'+result);
        });


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
    },
    "keyup #address":function (event,instance) {
        let address = $.trim($(event.currentTarget).val());
        if (!address)return;
        clearMarkers();

        $("#google-map").css("visibility","visible");


        const map=GoogleMaps.maps.releasemap.instance;
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $("#hdnlat").val(results[0].geometry.location.lat());
                $("#hdnlng").val(results[0].geometry.location.lng());
                map.setCenter(results[0].geometry.location);
                let marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                markers.push(marker);
            }
        });

    },
    "click #closemap":function (event,instance) {
        $("#google-map").css("visibility","hidden");
    }
});

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function getlogo(content){
    return $(content).find('img:first').attr('src');
}