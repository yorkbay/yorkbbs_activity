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
    require('../../ui/stylesheets/front/active.css');
    //BlazeLayout.reset();
    BlazeLayout.render('home', { main: 'App_home' });
  },
});


FlowRouter.route('/release', {
    name: 'App.release',
    action() {
        require('../../ui/stylesheets/front/active.css');
        BlazeLayout.render('home', { main: 'release' });
    },
});

FlowRouter.route('/usr', {
    name: 'App.user',
    action() {
        require('../../ui/stylesheets/front/active.css');
        BlazeLayout.render('home', { main: 'usercenter' });
    },
});

FlowRouter.route('/activity/:id', {
    name: 'App.detail',
    action() {
        require('../../ui/stylesheets/front/active.css');
        $('html,body').scrollTop(0);
        BlazeLayout.render('home', { main: 'detail' });
    },
});

var adminRoutes = FlowRouter.group({
    prefix: "/admin",
    name: "admin",
    triggersEnter: [function(context, redirect) {
        require('../../ui/stylesheets/backend/backstage.css');
    }],
    action() {
        BlazeLayout.render('admin', { main: 'admin_login' });
    }
});

adminRoutes.route('/login', {
    name: 'App.admin.login',
    action() {
        BlazeLayout.render('admin_login_layout', { main: 'admin_login' });
    },
});

adminRoutes.route('/admin/', {
    name: 'App.admin',
    action() {
        BlazeLayout.render('admin', { main: 'admin_activity_list' });
    },
});

adminRoutes.route('/activity', {
    name: 'App.activity',
    action() {
        BlazeLayout.render('admin', { main: 'admin_activity_list' });
    },
});

adminRoutes.route('/comment', {
    name: 'App.comment',
    action() {
        BlazeLayout.render('admin', { main: 'admin_comment_list' });
    },
});

adminRoutes.route('/feedback', {
    name: 'App.feedback',
    action() {
        BlazeLayout.render('admin', { main: 'admin_feedback_list' });
    },
});

adminRoutes.route('/log', {
    name: 'App.log',
    action() {
        BlazeLayout.render('admin', { main: 'admin_log_list' });
    },
});

adminRoutes.route('/sys', {
    name: 'App.sys',
    action() {
        BlazeLayout.render('admin', { main: 'admin_sys_right' });
    },
});

adminRoutes.route('/tag', {
    name: 'App.tag',
    action() {
        BlazeLayout.render('admin', { main: 'admin_tag_list' });
    },
});

adminRoutes.route('/newsletter', {
    name: 'App.newsletter',
    action() {
        BlazeLayout.render('admin', { main: 'admin_newsletter_email' });
    },
});

adminRoutes.route('/newslettermsg', {
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
