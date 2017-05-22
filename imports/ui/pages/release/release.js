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

Template.release.events({
    "click #sub":()=>{
        var pr="free";
        if(!$("#isfree").is(':checked')){
            pr=$("#pr").val();
        }
        var isonline=$("#isonline").is(':checked');

        var doc= {
            "ti":"2222",
            "st":"normal",
            "isonline":isonline,
            "location":"111",
            "city":"",
            "address":"111",
            "code":"111",
            "lat":"111",
            "lng":"111",
            "btime":{
                "date":new Date($("#bdate").val()),
                "time":$("#btime").val()
            },
            "etime":{
                "date":new Date($("#edate").val()),
                "time":$("#etime").val()
            },
            "pic":[],
            "ct":"content",
            "pr":pr,
            "site":"111",
            "tel":"111",
            "tags":["周末好去处","亲子活动"]
        };

        //console.log(doc);
        var Id = insert.call(doc);


        //Activity.insert(doc,,{ validate: false, filter: false });

        FlowRouter.go('/');
    }
});