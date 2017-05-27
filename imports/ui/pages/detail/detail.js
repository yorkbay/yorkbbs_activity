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
import '../../components/layer/weixin.js'
import {Activity} from '../../../api/activity/activity.js'


Template.detail.onRendered(function () {
    var self=this;
    self.autorun(function () {
        var id=FlowRouter.getParam('id');
        self.subscribe('activitybyid',id);
    });

});

Template.detail.helpers({
    item:function () {
        var id=FlowRouter.getParam('id');
        return Activity.findOne({_id:id});
    }
});