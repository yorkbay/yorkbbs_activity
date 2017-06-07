import {FlowRouter} from 'meteor/kadira:flow-router';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import {ReactiveVar} from 'meteor/reactive-var';
import './sys_right.html';

import '../../components/layer/managerstate.js';
import '../../components/layer/managerright.js';
import '../../components/layer/manager.js';
import {Manager} from '../../../api/manager/manager.js';


const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

const numOfRecords = 10;

Template.admin_sys_right.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);
    instance.id = new ReactiveVar("");


    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {

        const limit = instance.limit.get();

        instance.subscribe('managerlist', limit);


        const id = instance.id.get();
        instance.subscribe('managerfindbyid',id);

        instance.ready.set(PostSubs.ready());
    });


});

Template.admin_sys_right.onRendered(function admin_sys_rightOnRendered() {
    $('.J-add-admin').click(function(){
        $('.J-authority-pop').show();
        $('.add-authority-pop').show().siblings().hide();
        return false;
    });

});

Template.admin_sys_right.helpers({
    "items":function(){
        const instance = Template.instance();
        const limit = instance.limit.get();
        return Manager.find({},{limit:limit,sort:{dt:-1}});
    },
    "display_st":function (st) {
        let s="正常";
        if(st==="normal"){
            s="正常";
        }else if(st==="forbidden"){
            s="禁止登录";
        }
        return s;
    },
    'manager':function () {
        const instance = Template.instance();
        const id = instance.id.get();
        return Manager.findOne({_id:id});
    }
});

Template.admin_sys_right.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .J-add-admin'(event, instance) {
        $('.J-authority-pop').show();
        $('.add-authority-pop').show().siblings().hide();
    },
    'click .J-change-start'(event, instance) {
        instance.id.set($(event.currentTarget).attr("itemid"));
        $('.J-authority-pop').show();
        $('.change-start-pop').show().siblings().hide();
    },
    'click .J-change-authority'(event, instance) {
        instance.id.set($(event.currentTarget).attr("itemid"));
        $('.J-authority-pop').show();
        $('.change-authority-pop').show().siblings().hide();
    },
});