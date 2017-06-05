import {FlowRouter} from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import './checkManager.html';

Template.admin_checkManager.onCreated(function () {

    var manager=Session.get("manager");

    if(!manager || !manager.uname){
        FlowRouter.go('/admin/login');
    }
    /*
    var page=FlowRouter.current().path.replace('/admin/','');
    if(manager.role.indexOf(page)<0){
        FlowRouter.go('/admin/login');
    }
    */

});