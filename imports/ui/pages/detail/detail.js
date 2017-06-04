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

Template.detail.onCreated(function(){

    var self=this;
    var id=FlowRouter.getParam('id');
    self.autorun(function () {
        self.subscribe('activitybyid',id);
        self.subscribe('activitiesbytag','周末好去处');
    });

});

Template.detail.onRendered(function () {
    const usr=Session.get("usr");
    var id=FlowRouter.getParam('id');
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

    $('.J-error-submit').click(function(){
        $('.J-error-layer').show()
        $('.J-error-layer').find('.layer-content').addClass('animate-down-show');
        return false;
    });
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