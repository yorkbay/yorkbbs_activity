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
import {Facets} from '../../../api/activity/facets.js';
import {Tag} from '../../../api/tag/tag.js';

const PostSubs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

const numOfRecords = 25;



Template.App_home.onCreated(function(){
    const instance = this;

    instance.ready = new ReactiveVar();
    instance.limit = new ReactiveVar(numOfRecords);
    instance.key = new ReactiveVar("");
    instance.time = new ReactiveVar("");
    instance.isfree = new ReactiveVar("");

    instance.isrmd = new ReactiveVar("true");
    instance.st = new ReactiveVar("");

    instance.tag = () => {
        return FlowRouter.getQueryParam('tag')||"";
    };

    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        instance.subscribe('activitiesrecommend');
        instance.subscribe('activitiestags');
        instance.subscribe('activitiesbytag','周末好去处');

        instance.subscribe('tagslist');




        const key = instance.key.get();
        const time = instance.time.get();
        const isfree = instance.isfree.get();
        const tag = instance.tag();
        const isrmd = instance.isrmd.get();
        const st = instance.st.get();
        const limit = instance.limit.get();

        instance.subscribe('activitieslist', {
            key,time,isfree,tag,isrmd,limit,st
        });

        instance.subscribe('tags.facets',{
            key,time,isfree,tag,isrmd
        });

        instance.ready.set(PostSubs.ready());
    });

    SEO.set({
        title: '活动预告 - 约克论坛活动预告',
        keywords:'多伦多周末好去处,周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩,本周好去处,本周活动,周末好去处,娱乐活动,多伦多周末有什么好玩的地方,周末好玩的活动,周末去哪玩儿',
        description: '约克论坛活动预告,为加拿大多伦多地区的华人和留学生提供周末活动,周末免费活动,多伦多精彩周末,活动讲座,多伦多去哪玩等多伦多活动预告信息'
    });



});

Template.App_home.helpers({
    "grid_items": function () {
        let query={};
        query.istop=true;
        query.toptime={$gte:moment().toDate()};
        return Activity.find(query);
    },
    "listbytag": function (tag) {
        return listbytag.call({tag});
    },
    "list_item": function () {

        const instance = Template.instance();
        const key = instance.key.get();
        const time = instance.time.get();
        const isrmd = instance.isrmd.get();
        const isfree = instance.isfree.get();
        const tag = instance.tag();

        const limit = instance.limit.get();

        var query={};
        if(key){
            let regex = new RegExp( key, 'i' );
            query.ti=regex;
        }
        query['etime.date']={$gte: new Date()};
        if(time){

            let startOfDay;
            let endOfDay ;

            switch (time){
                case "today":
                    startOfDay = moment().startOf('day').format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().startOf('day').format("YYYY-MM-DD")+" 00:00:00";

                    break;
                case "tomorrow":
                    startOfDay = moment().add(1, 'day').format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().add(1, 'day').format("YYYY-MM-DD")+" 00:00:00";
                    break;
                case "week":
                    startOfDay =moment().day("Sunday").format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().day("Saturday").format("YYYY-MM-DD")+" 00:00:00";
                    break;
                case "weekend":
                    startOfDay =moment().day(6).format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().day(7).format("YYYY-MM-DD")+" 00:00:00";
                    break;
                case "nextweekend":
                    startOfDay =moment().day(13).format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().day(14).format("YYYY-MM-DD")+" 00:00:00";
                    break;
                case "month":
                    startOfDay =moment().date(1).format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().add('months', 1).date(0).format("YYYY-MM-DD")+" 00:00:00";
                    break;
            }
            query.$or=[
                {'btime.date': {$gte: new Date(startOfDay),$lte: new Date(endOfDay)}},
                {'etime.date': {$gte: new Date(startOfDay),$lte: new Date(endOfDay)}},
            ];

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

        if(isrmd){
            query.iscmd=true;
            query.cmdtime={$gte:moment().toDate()};
        }
        return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
    },
    'tags_item':function () {

        let tags=Tag.find({});

        const instance = Template.instance();

        const key = instance.key.get();
        const time = instance.time.get();
        const isfree = instance.isfree.get();
        const tag = instance.tag();
        const isrmd = instance.isrmd.get();

        const token = Facets.getToken({
            key,time,isfree,tag,isrmd
        });

        let facets=Facets.findOne({token});
        let categorizedByTags=[]
        if(facets) {
            categorizedByTags=facets.data.categorizedByTags;
        }

        return {
            tags:tags,
            facets:categorizedByTags
        };
    },
});

Template.App_home.events({
    'click #more'(event, instance) {
        // reset page limit
        instance.limit.set(instance.limit.get() + numOfRecords);
    },
    'click .search_left_isfree'(event, instance) {
        var free=$(event.currentTarget).attr("free");
        instance.limit.set(numOfRecords);
        instance.isfree.set(free);

        $("#div_isfree").show();

        $("#div_isfree").find('span').html(event.currentTarget.innerText);
        $(".search_isfree li").removeClass("active-tags-on");
        $(event.currentTarget).parent('li').addClass("active-tags-on");
    },
    'click .search_left_tag'(event, instance) {

        var tag=$(event.currentTarget).attr("tag");
        $("#div_tag").show();
        $("#div_tag").find('span').html(tag);
        $(".search_tag li").removeClass("active-tags-on");
        $(event.currentTarget).parent('li').addClass("active-tags-on");

        instance.limit.set(numOfRecords);

        var url=ChangeParam("tag",tag);
        FlowRouter.go("/"+url);
    },
    'click .search_left_time'(event, instance) {
        var time=$(event.currentTarget).attr("time");
        instance.limit.set(numOfRecords);
        instance.time.set(time);

        $("#div_time").show();

        $("#div_time").find('span').html(event.currentTarget.innerText);
        $(".search_time li").removeClass("active-tags-on");
        $(event.currentTarget).parent('li').addClass("active-tags-on");
    },
    'click .tag_close'(event, instance) {

        $("#div_tag").hide();
        $(".search_tag li").removeClass("active-tags-on");
        var url=ChangeParam("tag",'');
        FlowRouter.go("/"+url);
    },
    'click .free_close'(event, instance) {
        instance.isfree.set("");
        $("#div_isfree").hide();
        $(".search_isfree li").removeClass("active-tags-on");
    },
    'click .time_close'(event, instance) {
        instance.time.set("");
        $("#div_time").hide();
        $(".search_time li").removeClass("active-tags-on");
    },
    'keyup .subnav-search-input'(event, instance) {
        let value = $.trim($(".subnav-search-input").val());
        if (event.keyCode === 13) {
            instance.key.set(value);
        }
    },
    'click .subnav-submit'(event, instance) {
        let value = $.trim($(".subnav-search-input").val());
        instance.key.set(value);
    },
    'click #tab_commend'(event, instance) {
        instance.limit.set(numOfRecords);
        $(event.currentTarget).addClass("newslist-images-current");
        $("#tab_news").removeClass("newslist-images-current")
        instance.isrmd.set("true");
    },
    'click #tab_news'(event, instance) {
        instance.limit.set(numOfRecords);
        $(event.currentTarget).addClass("newslist-images-current");
        $("#tab_commend").removeClass("newslist-images-current");
        instance.isrmd.set("");
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

