import './home.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import {ReactiveVar} from 'meteor/reactive-var';

import '../../components/googlemap/leftmap.js';;
import '../../components/newsletter/newsletter.js';
import '../../components/search/search.js';
import '../../components/list/list.js';
import '../../components/list/simple.js';
import '../../components/list/grid.js';
import { Activity } from '../../../api/activity/activity.js';
import { listbytag } from '../../../api/activity/methods.js'

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

const numOfRecords = 2;

Template.App_home.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);

    instance.time = () => {
        return FlowRouter.getQueryParam('time')||"";
    };
    instance.isfree = () => {
        return FlowRouter.getQueryParam('free')||"";
    };
    instance.tag = () => {
        return FlowRouter.getQueryParam('tag')||"";
    };
    instance.isrmd = () => {
        return FlowRouter.getQueryParam('rmd')||"";
    };


    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        instance.subscribe('activitiesrecommend');
        instance.subscribe('activitiesbytag','周末好去处');

        const time = instance.time();
        const isfree = instance.isfree();
        const tag = instance.tag();
        const isrmd = instance.isrmd();
        const limit = instance.limit.get();

        instance.subscribe('activitieslist', {
            time,isfree,tag,isrmd,limit
        });

        instance.ready.set(PostSubs.ready());
    });


});


Template.App_home.onRendered(function App_homeOnRendered() {
    const instance = this;

});



Template.App_home.helpers({
    "grid_items": function () {
        return Activity.find({});
    },
    "listbytag": function (tag) {
        return listbytag.call({tag});

    },
    "list_item": function () {

        const instance = Template.instance();
        const isfree = instance.isfree();
        const tag = instance.tag();

        const limit = instance.limit.get();

        var query={};
        if(isfree === "1"){
            query.pr={
                $eq: "free"
            };
        }else if(isfree === "0"){
            query.pr={
                $ne: "free"
            };
        }
        if(tag){
            query.tags={
                $in:[tag]
            }
        }

        return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
    },
});


Template.App_home.events({
    'click #more'(event, instance) {
        // reset page limit
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .search_left_isfree'(event, instance) {
        instance.limit.set(numOfRecords);

        var free=$(event.currentTarget).attr("free");
        var url=ChangeParam("free",free);
        FlowRouter.go("/"+url);
    },
    'click .search_left_tag'(event, instance) {
        instance.limit.set(numOfRecords);
        var tag=$(event.currentTarget).attr("tag");
        var url=ChangeParam("tag",tag);
        FlowRouter.go("/"+url);
    },
    'click .tag_close'(event, instance) {
        var url=ChangeParam("tag",'');
        FlowRouter.go("/"+url);
    },
    'click .free_close'(event, instance) {
        var url=ChangeParam("free",'');
        FlowRouter.go("/"+url);
    },
    'click .time_close'(event, instance) {

        FlowRouter.go("/"+url);
    },
});


function ChangeParam(name,value)
{
    var url=window.location.search ;
    var newUrl="";
    var reg = new RegExp("(^|)"+ name +"=([^&]*)(|$)");
    var tmp = name + "=" + value;
    if(url.match(reg) != null)
    {
        newUrl= url.replace(eval(reg),tmp);
    }
    else
    {
        if(url.match("[\?]"))
        {
            newUrl= url + "&" + tmp;
        }
        else
        {
            newUrl= url + "?" + tmp;
        }
    }
    return newUrl;
}