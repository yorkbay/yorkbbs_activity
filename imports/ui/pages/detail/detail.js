/**
 * Created by shunxiangchen on 5/12/17.
 */
import './detail.html';
import { Session } from 'meteor/session';

import '../../components/detail/share.js';
import '../../components/detail/comment.js';
import '../../components/detail/recommend.js';
import '../../components/detail/user.js';
import '../../components/googlemap/rightmap.js';
import '../../components/layer/error.js';
import '../../components/layer/share.js';
import '../../components/layer/weixin.js'
import {Activity} from '../../../api/activity/activity.js'
import {Comment} from '../../../api/comment/comment.js';

import { listbytag } from '../../../api/activity/methods.js';
import { usrCenterInsert } from '../../../api/usrcenter/methods.js'
import {LogInsert} from '../../../api/log/methods.js';
import {
    commentInsert
} from '../../../api/comment/methods.js'

Template.detail.onCreated(function(){

    var self=this;
    var id=FlowRouter.getParam('id');
    const usr=Session.get("usr");
    var doc= {
        "ty":"log",
        "refid":id,
        "st":"normal",
        "meta":{
            "uid":usr.id,
            "usr":usr.uname
        }
    };
    usrCenterInsert.call(doc);

    var log={
        ty:"front",
        action:"查看信息",
        ip:headers.getClientIP(),
        from:"",
        refid:id,
        ti:"",
        meta:{
            uid:usr.id,
            usr:usr.uname,
            dt:new Date()
        }
    }
    LogInsert.call(log);

    self.autorun(function () {
        self.subscribe('activitybyid',id);
        self.subscribe('commentslistbyid',{id});

        self.subscribe('activitiesbytag','周末好去处');

        const key = "";
        const time = "";
        const isfree = "";
        const tag = "";
        const isrmd = "true";
        const st = "normal"
        const limit = 3;
        self.subscribe('activitieslist', {
            key,time,isfree,tag,isrmd,limit,st
        });
    });

});

Template.detail.onRendered(function () {

});

Template.detail.helpers({
    item:function () {
        var id=FlowRouter.getParam('id');

        var item=Activity.findOne({_id: id});
        if(item) {
            let desc=removeHTMLTag(item.ct);
            SEO.set({
                title: item.ti + '-活动预告 - 约克论坛活动预告',
                keywords: item.ti + ',多伦多周末好去处,周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩,本周好去处,本周活动,周末好去处,娱乐活动,多伦多周末有什么好玩的地方,周末好玩的活动,周末去哪玩儿',
                description: '约克论坛活动预告,为加拿大多伦多地区的华人和留学生提供周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩等多伦多活动预告信息'
            });
        }
        return item;
    },
    comments:function () {
        var id=FlowRouter.getParam('id');

        var item=Comment.find({refid: id},{sort:{"meta.dt":-1}});
        return item;
    },
    "listbytag": function (tag) {
        return listbytag.call({tag});
    },
    recommends:function () {
        var query={};
        query.iscmd=true;
        query['etime.date']={$gte: new Date()};
        let items=Activity.find(query,{limit:3,sort:{"meta.dt":-1}}).fetch();
        return items;
    }
});

Template.detail.events({
    'click #fav':function (event,instance) {
        const usr=Session.get("usr");
        var id=$(event.currentTarget).attr("itemid");
        var doc= {
            "ty":"fav",
            "refid":id,
            "st":"normal",
            "meta":{
                "uid":usr.id,
                "usr":usr.uname
            }
        };
        usrCenterInsert.call(doc,function (err,result) {
            if(result=="1"){
                Bert.alert( '收藏成功', 'success',"growl-top-right");
            }else{
                Bert.alert( '取消收藏', 'success',"growl-top-right");
            }

        });
        return;

    },
    'click .J-error-submit':function (event,instance) {
        $('.J-error-layer').show()
        $('.J-error-layer').find('.layer-content').addClass('animate-down-show');
        return false;
    },
    "click #sub":()=>{
        let usr=Session.get('usr');

        var val=$("#commentct").val();
        if($.trim(val)==""){
            return;
        }
        var doc= {
            "ct":val,
            "st":"normal",
            "isshow":true,
            "ti":$("#ti").val(),
            "review":false,
            "refid":$("#refid").val(),
            "meta":{
                "uid":usr.id,
                "usr":usr.uname,
                "dt":new Date()
            }

        };

        commentInsert.call(doc);

        var log={
            ty:"front",
            action:"发布评论",
            ip:headers.getClientIP(),
            from:"",
            refid:$("#refid").val(),
            ti:$("#ti").val(),
            meta:{
                uid:usr.id,
                usr:usr.uname,
                dt:new Date()
            }
        }
        LogInsert.call(log);
        $("#commentct").val('');
    }
});

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}