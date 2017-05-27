/**
 * Created by jack on 5/23/17.
 */
import './user.html';

import '../../components/list/list_item.js';
import '../../components/user/left.js';


Template.usercenter.helpers({
    "list":[
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
    ]
});