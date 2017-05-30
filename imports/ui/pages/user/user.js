/**
 * Created by jack on 5/23/17.
 */
import './user.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import {ReactiveVar} from 'meteor/reactive-var';

import '../../components/list/list_item.js';
import '../../components/user/left.js';
import '../../components/user/usr_list_item.js';
import { Activity } from '../../../api/activity/activity.js';
import { UsrCenter } from '../../../api/usrcenter/usrcenter.js'
import { Session } from 'meteor/session';

import {
    findbyuid
} from '../../../api/usrcenter/methods.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});



Template.usercenter.onCreated(function(){
    const instance = this;

    const uid=Session.get("usr").id;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);

    instance.ty = () => {
        return FlowRouter.getQueryParam('ty')||"relea";
    };



    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {

        const ty = instance.ty();

        const limit = instance.limit.get();
        /*
        instance.subscribe('activitiesbyusr',
            uid,limit
        );

        instance.subscribe('activitiesbyfav',
            uid,limit
        );

        instance.subscribe('activitiesbylog',
            uid,limit
        );
        */

        instance.subscribe('usrcenterinfo',
            ty,uid,limit
        );
        instance.ready.set(PostSubs.ready());
    });

});

Template.usercenter.onRendered(function App_homeOnRendered() {
    const instance = Template.instance();
    /*
    const ty = instance.ty();
    $(".aside-nav li").removeClass("aside-nav-current")
    if(ty==="relea"){
        $(".aside-nav li:eq(1)").addClass("aside-nav-current")
    }else if(ty==="fav"){
        $(".aside-nav li:first").addClass("aside-nav-current")
    }else if(ty==="log"){
        $(".aside-nav li:last").addClass("aside-nav-current")
    }
    */

});



Template.usercenter.helpers({
    "list":function () {
        const instance = Template.instance();
        const ty = instance.ty();
        const limit = instance.limit.get();

        var uid=Session.get("usr").id;

        return findbyuid.call({ty,uid,limit});
    }
});

Template.usercenter.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    '.aside-nav li a'(event, instance) {


    }
});