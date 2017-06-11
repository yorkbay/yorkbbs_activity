/**
 * Created by jack on 5/23/17.
 */
import './nl_email.html';

import {Newsletter} from '../../../api/newsletter/newsletter.js';
import {newslettermodifyst,newslettermodifystbyid} from '../../../api/newsletter/methods.js';

const numOfRecords = 5;

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

Template.admin_newsletter_email.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);

    instance.btime = new ReactiveVar("");
    instance.etime = new ReactiveVar("");

    instance.autorun(function () {

        const btime = instance.btime.get();
        const etime = instance.etime.get();
        const limit = instance.limit.get();

        instance.subscribe('newsletterlist', {
           btime, etime,limit
        });

        instance.ready.set(PostSubs.ready());
    });
});


Template.admin_newsletter_email.onRendered(function releaseOnRendered() {

    $('#startdate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#enddate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});

Template.admin_newsletter_email.helpers({
    "list_item": function () {

        const instance = Template.instance();

        const btime = instance.btime.get();
        const etime = instance.etime.get();
        const limit = instance.limit.get();

        var query={};
        if(btime){
            query.dt={$gte:new Date(moment(btime).format("YYYY-MM-DD"))}
        }

        if(etime){
            query.dt={$lte:new Date(moment(etime).format("YYYY-MM-DD"))}
        }
        return Newsletter.find(query,{limit:limit,sort:{dt:-1}});
    },
    "display_issend":function (issend) {
        return issend?"推送":"未推送";
    }
});


Template.admin_newsletter_email.events({
    'click #more'(event, instance) {
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .del'(event, instance) {
        var obj={
            _id:$(event.currentTarget).attr("itemid"),
            st:"del"
        }

        newslettermodifyst.call(obj);
    },
    'click #delall'(event,instance){

        var itemid=[];
        $('input[name="delcheckbox"]:checked').each(function() {
            itemid.push(this.value);
        });
        var obj={
            _id:itemid,
            st:"del"
        }

        newslettermodifystbyid.call(obj);
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