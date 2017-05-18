import './home.html';


import '../../components/googlemap/leftmap.js';
import '../../components/newsletter/newsletter.js';
import '../../components/search/search.js';
import '../../components/list/list.js'
import '../../components/list/simple.js'
import '../../components/list/grid.js';
import { Activity } from '../../../api/activity/activity.js';


Template.App_home.onCreated(function(){
    var self=this;
    self.autorun(function () {
        self.subscribe('activities');
    });
});

Template.App_home.helpers({
    "grid_items": function () {
        return Activity.find({});
    },
    "list_items": [
        {
            "_id":"1111",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "img":"img/img1.jpg",
            "sub":"1111111",
            "hot":true,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处1","公益讲座"]
        },
        {
            "_id":"2222",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "img":"img/img1.jpg",
            "sub":"2222222",
            "hot":false,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处2","公益讲座"]
        },
        {
            "_id":"3333",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "img":"img/img1.jpg",
            "sub":"333333",
            "hot":true,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处3","公益讲座"]
        },
        {
            "_id":"4444",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "img":"img/img1.jpg",
            "sub":"1111111",
            "hot":true,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处4","公益讲座"]
        },
        {
            "_id":"5555",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "img":"img/img1.jpg",
            "sub":"4444",
            "hot":true,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处","公益讲座"]
        },
        {
            "_id":"666",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "img":"img/img1.jpg",
            "sub":"5555",
            "hot":true,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处","公益讲座"]
        },
        {
            "_id":"777",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
            "img":"img/img1.jpg",
            "sub":"66666",
            "hot":true,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处","公益讲座"]
        },
    ]

});