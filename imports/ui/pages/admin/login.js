/**
 * Created by jack on 5/31/17.
 */
import './login.html';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import {managerLogin} from '../../../api/manager/methods.js';

Template.admin_login.events({
    "click .connect-login":function (event,instance) {
        var manager={
            "uname":$("#uname").val(),
            "pwd":$("#pwd").val()
        }
        var islogin=managerLogin.call(manager);
        //console.log(islogin);
        if(islogin){
            Session.set("manager",manager);
            FlowRouter.go('/admin/');
        }

    }
});