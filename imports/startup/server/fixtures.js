// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Activity } from '../../api/activity/activity.js';


Meteor.startup(() => {
  if (Activity.find().count() === 0) {
    const data = [
        {
            "ti":"11111",
            "st":"normal",
            "isonline":true,
            "location":"111",
            "city":"",
            "address":"111",
            "code":"111",
            "lat":"111",
            "lng":"111",
            "btime":{
                'date':new Date(),
                'time':"11pm"
            },
            "etime":{
                'date':new Date(),
                'time':"11am"
            },
            "logo":"/img/img4.jpg",
            "pic":[],
            "ct":"content",
            "pr":"free",
            "site":"111",
            "tel":"111",
            "tags":["周末好去处","社区活动"]
        },
        {
            "ti":"2222",
            "st":"normal",
            "isonline":true,
            "location":"111",
            "city":"",
            "address":"111",
            "code":"111",
            "lat":"111",
            "lng":"111",
            "btime":{
                'date':new Date(),
                'time':"11pm"
            },
            "etime":{
                'date':new Date(),
                'time':"11am"
            },
            "logo":"/img/img4.jpg",
            "pic":[],
            "ct":"content",
            "pr":"free",
            "site":"111",
            "tel":"111",
            "tags":["公益讲座","亲子活动"]
        },
        {
            "ti":"333333",
            "st":"normal",
            "isonline":true,
            "location":"111",
            "city":"",
            "address":"111",
            "code":"111",
            "lat":"111",
            "lng":"111",
            "btime":{
                'date':new Date(),
                'time':"11pm"
            },
            "etime":{
                'date':new Date(),
                'time':"11am"
            },
            "logo":"/img/img4.jpg",
            "pic":[],
            "ct":"content",
            "pr":"free",
            "site":"111",
            "tel":"111",
            "tags":["节日活动","公益讲座"]
        }
    ];

    data.forEach(act => Activity.insert(act));
  }
});
