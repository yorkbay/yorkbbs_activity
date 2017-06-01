import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session'
// Import needed templates
import '../../ui/layouts/body/home.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/detail/detail.js';
import '../../ui/pages/release/release.js';
import '../../ui/pages/user/user.js';
import '../../ui/pages/not-found/not-found.js';

import '../../ui/layouts/admin/body.js';
import '../../ui/layouts/admin/login.js'


var usr=Session.get('usr');

if(!usr || !usr.id){
    usr={
        id:"11111",
        uname:"约克管家"
    }

    Session.set("usr",usr);
}
var manager=Session.get('manager');



// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    //BlazeLayout.reset();
    BlazeLayout.render('home', { main: 'App_home' });
  },
});

FlowRouter.route('/upload', {
    name: 'App.upload',
    action(params, queryParams) {
        console.log(params);
        console.log(queryParams);
        return "111111";
    },
});

FlowRouter.route('/release', {
    name: 'App.release',
    action() {
        BlazeLayout.render('home', { main: 'release' });
    },
});

FlowRouter.route('/usr', {
    name: 'App.user',
    action() {
        BlazeLayout.render('home', { main: 'usercenter' });
    },
});

FlowRouter.route('/activity/:id', {
    name: 'App.detail',
    action() {
        $('html,body').scrollTop(0);
        BlazeLayout.render('home', { main: 'detail' });
    },
});

FlowRouter.route('/admin/login', {
    name: 'App.admin.login',
    action() {
        BlazeLayout.render('admin_login_layout', { main: 'admin_login' });
    },
});

FlowRouter.route('/admin', {
    name: 'App.admin',
    action() {
        BlazeLayout.render('admin', { main: 'admin_activity_list' });
    },
});

FlowRouter.route('/admin/activity', {
    name: 'App.activity',
    action() {
        BlazeLayout.render('admin', { main: 'admin_activity_list' });
    },
});

FlowRouter.route('/admin/comment', {
    name: 'App.comment',
    action() {
        BlazeLayout.render('admin', { main: 'admin_comment_list' });
    },
});

FlowRouter.route('/admin/feedback', {
    name: 'App.feedback',
    action() {
        BlazeLayout.render('admin', { main: 'admin_feedback_list' });
    },
});

FlowRouter.route('/admin/log', {
    name: 'App.log',
    action() {
        BlazeLayout.render('admin', { main: 'admin_log_list' });
    },
});

FlowRouter.route('/admin/sys', {
    name: 'App.sys',
    action() {
        BlazeLayout.render('admin', { main: 'admin_sys_right' });
    },
});

FlowRouter.route('/admin/tag', {
    name: 'App.tag',
    action() {
        BlazeLayout.render('admin', { main: 'admin_tag_list' });
    },
});

FlowRouter.route('/admin/newsletter', {
    name: 'App.newsletter',
    action() {
        BlazeLayout.render('admin', { main: 'admin_newsletter_email' });
    },
});

FlowRouter.route('/admin/newslettermsg', {
    name: 'App.newslettermsg',
    action() {
        BlazeLayout.render('admin', { main: 'admin_newsletter_msg' });
    },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('home', { main: 'App_notFound' });
  },
};
