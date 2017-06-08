// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Activity } from '../../api/activity/activity.js';
import { Tag } from '../../api/tag/tag.js';
import { Manager } from '../../api/manager/manager.js';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {

    if (Manager.find().count() === 0) {
        let date=[
            {
                uname:"jack",
                pwd:"111222",
                role:"activity,frontlog,tag,newsletter,backendlog,comment,feedback,newslettermsg,sys,",
                st:"normal",
                dt:new Date()
            }
        ]

        data.forEach(m => Manager.insert(m));
    }

    if (Tag.find().count() === 0) {
        let date=[
            {
                tg:"周末好去处",
                isshow:true,
                st:"normal",
                uname:"jack",
                dt:new Date()
            },
            {
                tg:"亲子活动",
                isshow:true,
                st:"normal",
                uname:"jack",
                dt:new Date()
            },
            {
                tg:"节日活动",
                isshow:true,
                st:"normal",
                uname:"jack",
                dt:new Date()
            },
            {
                tg:"社区活动",
                isshow:true,
                st:"normal",
                uname:"jack",
                dt:new Date()
            },
            {
                tg:"演出活动",
                isshow:true,
                st:"normal",
                uname:"jack",
                dt:new Date()
            },
            {
                tg:"公益活动",
                isshow:true,
                st:"normal",
                uname:"jack",
                dt:new Date()
            },
            {
                tg:"其他活动",
                isshow:true,
                st:"normal",
                uname:"jack",
                dt:new Date()
            },
        ]

        data.forEach(t => Tag.insert(t));
    }


});
