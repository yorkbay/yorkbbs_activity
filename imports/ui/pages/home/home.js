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
import { listbytag,tagnum } from '../../../api/activity/methods.js'

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

    instance.key = () => {
        return FlowRouter.getQueryParam('key')||"";
    };

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

    instance.st = () => {
        return FlowRouter.getQueryParam('st')||"";
    };


    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        instance.subscribe('activitiesrecommend');
        instance.subscribe('activitiestags');
        instance.subscribe('activitiesbytag','周末好去处');


        const key = instance.key();
        const time = instance.time();
        const isfree = instance.isfree();
        const tag = instance.tag();
        const isrmd = instance.isrmd();
        const st = instance.st();
        const limit = instance.limit.get();

        instance.subscribe('activitieslist', {
            key,time,isfree,tag,isrmd,limit,st
        });

        instance.ready.set(PostSubs.ready());
    });


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
        const key = instance.key();
        const time = instance.time();
        const isfree = instance.isfree();
        const tag = instance.tag();

        const limit = instance.limit.get();

        var query={};
        if(key){
            let regex = new RegExp( key, 'i' );
            query={
                ti:regex
            }
        }
        if(time){
            let startOfDay = moment.utc().startOf('day').toDate();
            let endOfDay = moment.utc().endOf('day').toDate();
            const date = moment.utc().toDate();

            //console.log(startOfDay+'----------'+endOfDay+"---------"+date);

            query.btime={
                date:{
                    $lte: new Date(date)

                }
            }

            query.etime={
                date:{
                    $gte: new Date(date)
                }
            }
        }
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
        //console.log(query);
        return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
    }
});


Template.App_home.events({
    'click #more'(event, instance) {
        // reset page limit
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .search_left_isfree'(event, instance) {
        instance.limit.set(numOfRecords);
        $(".search_isfree li").removeClass("active-tags-on");
        $(event.currentTarget).parent('li').addClass("active-tags-on");
        var free=$(event.currentTarget).attr("free");
        var url=ChangeParam("free",free);
        FlowRouter.go("/"+url);
    },
    'click .search_left_tag'(event, instance) {
        instance.limit.set(numOfRecords);
        $(".search_tag li").removeClass("active-tags-on");
        $(event.currentTarget).parent('li').addClass("active-tags-on");
        var tag=$(event.currentTarget).attr("tag");
        var url=ChangeParam("tag",tag);
        FlowRouter.go("/"+url);
    },
    'click .search_left_time'(event, instance) {
        instance.limit.set(numOfRecords);
        $(".search_time li").removeClass("active-tags-on");
        $(event.currentTarget).parent('li').addClass("active-tags-on");
        var time=$(event.currentTarget).attr("time");
        var url=ChangeParam("time",time);
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
        var url=ChangeParam("time",'');
        FlowRouter.go("/"+url);
    },
    'keyup .subnav-search-input'(event, instance) {
        let value = $.trim($(".subnav-search-input").val());
        if (event.keyCode === 13) {
            var url=ChangeParam("key",value);
            FlowRouter.go("/"+url);
        }
    },
    'click .subnav-submit'(event, instance) {
        let value = $.trim($(".subnav-search-input").val());
        var url=ChangeParam("key",value);
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





