// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Activity } from '../../api/activity/activity.js';


Meteor.startup(() => {
  if (Activity.find().count() === 0) {
    const data = [
        {
            "img":"img/img1.jpg",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "pr":"1111111",
            "btime":{
                'date':new Date(),
                'time':"11pm"
            },
            "etime":{
                'date':new Date(),
                'time':"11am"
            },
            "tg":["周末好去处1","公益讲座"]
        },
        {
            "img":"img/img1.jpg",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "pr":"2222222",
            "btime":{
                'date':new Date(),
                'time':"11pm"
            },
            "etime":{
                'date':new Date(),
                'time':"11am"
            },
            "tg":["周末好去处2","公益讲座"]
        },
        {
            "pic":"img/img1.jpg",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "pr":"333333",
            "btime":{
                'date':new Date(),
                'time':"11pm"
            },
            "etime":{
                'date':new Date(),
                'time':"11am"
            },
            "tg":["周末好去处3","公益讲座"]
        }
    ];

    data.forEach(act => Activity.insert(act));
  }
});
