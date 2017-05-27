import './home.html';


import '../../components/googlemap/leftmap.js';
import '../../components/newsletter/newsletter.js';
import '../../components/search/search.js';
import '../../components/list/list.js'
import '../../components/list/simple.js'
import '../../components/list/grid.js';
import { Activity } from '../../../api/activity/activity.js';



Template.App_home.onCreated(function(){

    let template = Template.instance();
    template.searchQuery = new ReactiveVar();
    template.searching   = new ReactiveVar( false );
//https://themeteorchef.com/tutorials/simple-search
    template.autorun(function () {
        template.subscribe('activitiesrecommend');
        template.subscribe('activitieslist', template.searchQuery.get(), () => {
            setTimeout( () => {
                template.searching.set( false );
            }, 300 );
        });
        template.subscribe('activitiesbaytag','周末好去处');
    });


});

Template.App_home.helpers({
    "grid_items": function () {
        return Activity.find({});

    },
    "recommond_list": [
        {
            "_id":"1111",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈recommond",
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
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈recommond",
            "img":"img/img1.jpg",
            "sub":"2222222",
            "hot":false,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处2","公益讲座"]
        }
    ],
    "news_list": [
        {
            "_id":"1111",
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈new",
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
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈new",
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
            "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈new",
            "img":"img/img1.jpg",
            "sub":"333333",
            "hot":true,
            "location":"Langstaff Community Centre Gym A – 155 Red Maple Road, L4B 4P9",
            "btime":"11月20日",
            "etime":"11月23日",
            "tg":["周末好去处3","公益讲座"]
        }
    ]

});