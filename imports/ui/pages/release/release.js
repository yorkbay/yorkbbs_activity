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
        }
        if(!isonline){
            if(!location){
                $("#location").addClass("release-hints");
                $("#location").focus();
                return;
            }
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
        if(!site){
            $("#site").addClass("release-hints");
            $("#site").focus();
            return;
        }
        if(!tel){
            $("#tel").addClass("release-hints");
            $("#tel").focus();
            return;
        }

        if(!tags){
            $("#tag_error").show();
            $("#tags").focus();
            return;
        }else{
            $("#tag_error").hide();
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
                "time":$('#btime').val()
            },
            "etime":{
                "date":new Date($("#edate").val()),
                "time":$('#etime').val()
            },
            "ct":ct,
            "pr":pr,
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
            }
        });

    },
    "click #closemap":function (event,instance) {
        $("#google-map").hide();
    }
});



function getlogo(content){
    return $(content).find('img:first').attr('src');
}