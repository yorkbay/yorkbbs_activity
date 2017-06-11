import './body.html';
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../../pages/admin/activity.js';
import '../../pages/admin/comment.js';
import '../../pages/admin/feedback.js';
import '../../pages/admin/frontlog.js';
import '../../pages/admin/backendlog.js';
import '../../pages/admin/sys_right.js';
import '../../pages/admin/tag.js';
import '../../pages/admin/nl_email.js';
import '../../pages/admin/nl_msg.js';
import '../../pages/admin/login.js';
import '../../components/layer/activitycheck.js';
import '../../components/layer/admin_comment_check.js';


Template.admin.helpers({
    "manager":function(){
        var manager=Session.get("manager");
        return manager;
    }
});



Template.admin.events({
    "click #logout":function(event,instance){
        Session.set("manager",null);
        FlowRouter.go('/admin/login');
    }
});


//xx月xx日
Template.registerHelper('formatDate_MD', function(date) {
    if(!date)return "";
    return moment.utc(date).format("MM月DD日");
});

//xx月xx日
Template.registerHelper('formatDate_HS', function(date) {
    if(!date)return "";
    return moment.utc(date).format("H:mm");
});

//xx月xx日
Template.registerHelper('formatDate_YMDHS', function(date) {
    if(!date)return "";
    return moment.utc(date).format("YYYY-MM-DD HH:mm");
});

//xx月xx日
Template.registerHelper('formatDate_YMD', function(date) {
    if(!date)return "";
    return moment(date).format("YYYY-MM-DD");
});