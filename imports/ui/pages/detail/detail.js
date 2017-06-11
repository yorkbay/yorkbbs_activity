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

        self.subscribe('activitiesbytag','周末好去处');
    });

});

Template.detail.onRendered(function () {

});

Template.detail.helpers({
    item:function () {
        var id=FlowRouter.getParam('id');

        var item=Activity.findOne({_id: id});


        return item;
    },
    "listbytag": function (tag) {
        return listbytag.call({tag});
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
        usrCenterInsert.call(doc);
        Bert.alert( '收藏成功', 'success',"growl-top-right");
        return;

    },
    'click .J-error-submit':function (event,instance) {
        $('.J-error-layer').show()
        $('.J-error-layer').find('.layer-content').addClass('animate-down-show');
        return false;
    }
});