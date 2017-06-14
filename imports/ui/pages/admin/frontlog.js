/**
 * Created by jack on 6/6/17.
 */
import './frontlog.html';
import {Log} from '../../../api/log/log.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_frontlog.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);
    instance.action = new ReactiveVar("");
    instance.usr = new ReactiveVar("");
    instance.ty = new ReactiveVar("front");

    instance.btime = new ReactiveVar("");
    instance.etime = new ReactiveVar("");

    instance.autorun(function () {
        const usr = instance.usr.get();
        const btime = instance.btime.get();
        const etime = instance.etime.get();
        const action = instance.action.get();
        const ty = instance.ty.get();
        const limit = instance.limit.get();

        instance.subscribe('admin_loglist', {
            usr,btime, etime,limit,action,ty
        });


        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_frontlog.onRendered(function releaseOnRendered() {

    $('#startdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#enddate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});

Template.admin_frontlog.helpers({
    "list_item": function () {

        const instance = Template.instance();
        const usr = instance.usr.get();
        const btime = instance.btime.get();
        const etime = instance.etime.get();
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

        if(btime || etime) {
            query.$and = [];
            if (btime) {
                let b = {'meta.dt': {$gte: new Date(moment(btime).format("YYYY-MM-DD"))}}
                query.$and.push(b);
            }

            if (etime) {
                let e = {'meta.dt': {$lte: new Date(moment(etime).format("YYYY-MM-DD"))}}
                query.$and.push(e);
            }
        }
        return Log.find(query,{limit:limit,sort:{'meta.dt':-1}});
    }
});


Template.admin_frontlog.events({
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
    },
    'blur #startdate'(event,instance){
        var val= $.trim($(event.currentTarget).val());
        instance.btime.set(val);
        instance.limit.set(numOfRecords);
    },
    'blur #enddate'(event,instance){
        var val= $.trim($(event.currentTarget).val());
        instance.etime.set(val);
        instance.limit.set(numOfRecords);
    },

});