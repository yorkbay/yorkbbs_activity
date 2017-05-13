/**
 * Created by shunxiangchen on 5/12/17.
 */
import './detail.html';


import '../../components/detail/share.js';
import '../../components/detail/comment.js';
import '../../components/detail/recommend.js';
import '../../components/detail/user.js';
import '../../components/googlemap/rightmap.js';
import '../../components/layer/error.js';
import '../../components/layer/share.js';

Template.detail.helpers({
    "item":{
        "ti":"2017加拿大国家电影节免费看电影111",
        "img":"/img/img4.jpg",
        "pr":"$5，12岁以下儿童免费",
        "btime":"11月20日 5:30 PM",
        "etime":"12月20日 7:30 PM",
        "location":"Wellington Street West, Toronto, ON M5V 2V5Colette Grand Café",
        "content":'<p>1月26日 安省冬季旅游展 安省热门旅游区及五大滑雪场共聚一堂 助您计划完美白雪假期!</p> <p>加拿大冬天漫长寒冷，初来步到不太习惯的华人难免感觉单调和寂寞，其实冬天的冰天雪地里蕴含无限生机与乐趣，高山滑雪体验零度飞跃、雪鞋远足踏遍山林原野、雪地摩托穿山越岭、还有狗拉雪橇、湖面冰钓等等，令人对冬季充满期待。</p>',
        "tg":["周末好去处1","公益讲座"],
        "recommends":[
            {
                "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
                "pr":"1111111",
                "hot":true,
                "btime":"11月20日",
                "etime":"11月23日",
                "tg":["周末好去处1","公益讲座"]
            },
            {
                "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
                "pr":"2222222",
                "hot":false,
                "btime":"11月20日",
                "etime":"11月23日",
                "tg":["周末好去处2","公益讲座"]
            },
            {
                "ti":"Prima Academy盛大开张——音乐、绘画、舞蹈",
                "pr":"333333",
                "hot":true,
                "btime":"11月20日",
                "etime":"11月23日",
                "tg":["周末好去处3","公益讲座"]
            },
        ]
    }
});