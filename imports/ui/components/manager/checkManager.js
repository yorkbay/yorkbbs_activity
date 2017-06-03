import {FlowRouter} from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'
import './checkManager.html';

Template.admin_checkManager.onCreated(function () {

    var manager={
        _id:"ibiSfc4DeNQC6nQmG",
        uname:'jack'
    }
    Session.set("manager",manager);
    /*
    var manager=Session.get("manager");
    console.log(manager);
    var page=FlowRouter.current().path.replace('/admin/','');
    if(!manager || !manager.uname){
        FlowRouter.go('/admin/login');
    }
    if(manager.role.indexOf(page)<0){
        FlowRouter.go('/admin/login');
    }
    */
});