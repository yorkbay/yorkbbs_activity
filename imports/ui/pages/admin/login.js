/**
 * Created by jack on 5/31/17.
 */
import './login.html';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import {managerLogin} from '../../../api/manager/methods.js';
import {Manager} from '../../../api/manager/manager.js';



Template.admin_login.onCreated(function(){
    const instance = this;


    instance.uname = new ReactiveVar();
    instance.pwd = new ReactiveVar();

    instance.autorun(function () {

        const uname = instance.uname.get();
        const pwd = instance.pwd.get();

    });
});

Template.admin_login.events({
    "click .connect-login":function (event,instance) {
        var manager={
            "uname":$("#uname").val(),
            "pwd":$("#pwd").val()
        }

        managerLogin.call(manager,function (err,result) {
            if(result){
                Session.set("manager",result);
                FlowRouter.go('/admin/activity');
            }
        });
    }
});