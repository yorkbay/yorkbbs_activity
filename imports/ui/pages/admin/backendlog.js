/**
 * Created by jack on 6/6/17.
 */
import './backendlog.html';
import {Log} from '../../../api/log/log.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_backendlog.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);
    instance.action = new ReactiveVar("");
    instance.usr = new ReactiveVar("");
    instance.ty = new ReactiveVar("backend");

    instance.btime = () => {
        return FlowRouter.getQueryParam('btime')||"";
    };
    instance.etime = () => {
        return FlowRouter.getQueryParam('etime')||"";
    };

    instance.autorun(function () {
        const usr = instance.usr.get();
        const btime = new Date(instance.btime());
        const etime = new Date(instance.etime());
        const action = instance.action.get();
        const ty = instance.ty.get();
        const limit = instance.limit.get();

        instance.subscribe('admin_loglist', {
            usr,btime, etime,limit,action,ty
        });


        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_backendlog.onRendered(function releaseOnRendered() {

    $('#startdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#enddate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});

Template.admin_backendlog.helpers({
    "list_item": function () {

        const instance = Template.instance();
        const usr = instance.usr.get();
        const btime = new Date(instance.btime());
        const etime = new Date(instance.etime());
        const action = instance.action.get();
        const ty = instance.ty.get();
        const limit = instance.limit.get();

        var query={};

        if(usr){
            let regex = new RegExp(usr, 'i' );
            query["meta.usr"]=regex;
        }
        if(ty){
            query.ty=ty;
        }
        if(action){
            query.action=action;
        }
        return Log.find(query,{limit:limit,sort:{'meta.dt':-1}});
    }
});


Template.admin_backendlog.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'change #action'(event,instance){
        var val= $(event.currentTarget).val();
        instance.action.set(val);
    },
    'click #search'(event,instance){
        var val= $("#keyword").val();
        instance.usr.set(val);
    }

});