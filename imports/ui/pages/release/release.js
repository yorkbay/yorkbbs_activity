/**
 * Created by jack on 5/17/17.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import './release.html';

import '../../components/release/mobile_menu.js';
import {Activity} from '../../../api/activity/activity.js'

import {
    insert
} from '../../../api/activity/methods.js';

Template.release.onCreated(function () {

});


Template.release.onRendered(function releaseOnRendered() {
    $(function() {
        $('#startDate').datetimepicker({
            format: 'yyyy-mm-dd',
            startView: 2,
            minView: 2,
            bootcssVer: 3
        });
        $('#startTime').datetimepicker({
            format: 'hh:ii',
            startView: 1,
            minView: 1,
            maxView: 1,
            bootcssVer: 3
        });
        $('#endDate').datetimepicker({
            format: 'yyyy-mm-dd',
            startView: 2,
            minView: 2,
            bootcssVer: 3
        });
        $('#endTime').datetimepicker({
            format: 'hh:ii',
            startView: 1,
            minView: 1,
            maxView: 1,
            bootcssVer: 3
        });
    });



});

Template.release.events({
    "click #sub":()=>{
        var pr="free";
        if(!$("#isfree").is(':checked')){
            pr=$("#pr").val();
        }
        var isonline=$("#isonline").is(':checked');

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
            "ct":$("#ct").val(),
            "pr":pr,
            "site":$("#site").val(),
            "tel":$("#tel").val(),
            "tags":["周末好去处","亲子活动"]
        };

        //console.log(doc);
        var Id = insert.call(doc);


        //Activity.insert(doc,,{ validate: false, filter: false });

        FlowRouter.go('/');
    }
});