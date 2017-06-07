import './body.html';
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../../pages/admin/activity.js';
import '../../pages/admin/comment.js';
import '../../pages/admin/feedback.js';
import '../../pages/admin/log.js';
import '../../pages/admin/sys_right.js';
import '../../pages/admin/tag.js';
import '../../pages/admin/nl_email.js';
import '../../pages/admin/nl_msg.js';
import '../../pages/admin/login.js';
import '../../components/layer/activitycheck.js';


Template.admin.helpers({
    "manager":function(){
        var manager=Session.get("manager");
        return manager;
    }
});



Template.admin.events({
    "click .logout":function(event,instance){
        Session.get("manager",null);
        FlowRouter.go('/admin/login');
    }
});


//xx月xx日
Template.registerHelper('formatDate_MD', function(date) {
    return moment.utc(date).format("MM月DD日");
});

//xx月xx日
Template.registerHelper('formatDate_HS', function(date) {
    return moment.utc(date).format("H:mm");
});

//xx月xx日
Template.registerHelper('formatDate_YMDHS', function(date) {
    return moment.utc(date).format("YYYY-MM-DD HH:mm");
});