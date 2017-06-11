/**
 * Created by jack on 5/17/17.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Comment} from '../../comment/comment.js'

import {Activity} from '../activity.js';
import {ActivityImages} from '../image.js';

Meteor.publishComposite('activitiesrecommend', function () {
    return {
        find() {
            var query={};
            query.st={$nin:["del","hidden"]};
            query.istop=true;
            query.toptime={$gte:moment().toDate()};
           return Activity.find(query,{limit:8,sort:{topsort:1,'meta.dt':-1}});
        },

        children: [
            {
                find(post) {
                    return ActivityImages.find({
                        _id: {
                            $in: post._images || []
                        }
                    });
                },
            }
        ],
    };
});

Meteor.publishComposite('activitieslist', function (params) {
    check(params,{
        key:String,
        time:String,
        isfree:String,
        tag:String,
        isrmd:String,
        limit:Number,
        st:String
    });

    return {
        find() {
            const {key,time, isfree,tag,isrmd,limit,st} = params;

            var query={};
            query.st={$nin:["del","hidden"]};
            if(time){

                let startOfDay = moment.utc().startOf('day').format("YYYY-MM-DD");
                let endOfDay = moment.utc().endOf('day').format("YYYY-MM-DD");

                switch (time){
                    case "today":
                        startOfDay = moment().startOf('day').format("YYYY-MM-DD");
                        endOfDay = moment().startOf('day').format("YYYY-MM-DD");
                        break;
                    case "tomorrow":
                        startOfDay = moment().add(1, 'day').format("YYYY-MM-DD");
                        endOfDay = moment().add(1, 'day').format("YYYY-MM-DD");
                        break;
                    case "week":
                        startOfDay =moment().day(0).format("YYYY-MM-DD");
                        endOfDay = moment().day(7).format("YYYY-MM-DD");
                        break;
                    case "weekend":
                        startOfDay =moment().day(6).format("YYYY-MM-DD");
                        endOfDay = moment().day(7).format("YYYY-MM-DD");
                        break;
                    case "nextweekend":
                        startOfDay =moment().day(13).format("YYYY-MM-DD");
                        endOfDay = moment().day(14).format("YYYY-MM-DD");
                        break;
                    case "month":
                        startOfDay =moment().date(1).format("YYYY-MM-DD");
                        endOfDay = moment().add('months', 1).date(0).format("YYYY-MM-DD");
                        break;
                }

                query.$and=[
                    {'btime.date': {$lte: new Date(startOfDay)}},
                    {'etime.date': {$gte: new Date(endOfDay)}},
                ];

            }
            if(key){
                let regex = new RegExp( key, 'i' );
                query={
                    ti:regex
                }
            }
            if(isfree ==="1"){
                query.pr={ $eq: "free"};
            }else if(isfree ==="0"){
                query.pr={ $ne: "free"};
            }
            if(tag){
                query.tags={
                    "$in": [tag]
                }
            }
            if(isrmd){
                query.iscmd=true;
                query.cmdtime={$gte:moment().toDate()};
            }
            return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
        },

        children: [
            {
                find(post) {
                    return ActivityImages.find({
                        _id: {
                            $in: post._images || []
                        }
                    });
                },
            }
        ],
    };
});

Meteor.publishComposite('activitiesbytag', function (tag) {
    check(tag,String);
    return {
        find() {
            return Activity.find({tags:{ "$in": [tag] },st:{$nin:["del","hidden"]}},{limit:5,sort:{'meta.dt':-1}});
        },
        children: [
            {
                find(post) {
                    return ActivityImages.find({
                        _id: {
                            $in: post._images || []
                        }
                    });
                },
            }
        ],
    };
});

Meteor.publish('activitiesbyusr', function (uid,limit) {
    check(uid,String);
    check(limit,Number);

    return Activity.find({"meta.uid":uid},{limit:limit,sort:{'meta.dt':-1}});
});

Meteor.publishComposite('activitybyid', function (id) {
    check(id,String);
    return {
        find(){
           return Activity.find({_id:id});
        },
        children: [{
            find(item) {
                return Comment.find({
                    refid: item._id,
                    st:"normal"
                });
            }
        }]
    };
});

Meteor.publish('admin_activitieslist', function (params) {
    check(params,{
        key:String,
        btime:String,
        etime:String,
        tag:String,
        limit:Number,
        st:String
    });

    const {key,btime,etime,tag,limit,st} = params;

    var query={};

    if(st){
        query.st=st
    }else {
        query.st = {$ne: "del"};
    }
    if(btime){
        query['meta.dt']={$gte:new Date(moment(btime).format("YYYY-MM-DD"))}
    }

    if(etime){
        query['meta.dt']={$lte:new Date(moment(etime).format("YYYY-MM-DD"))}
    }
    if(key){
        let regex = new RegExp( key, 'i' );
        query={
            ti:regex
        }
    }

    if(tag){
        query.tags={
            "$in": [tag]
        }
    }

    return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
});


