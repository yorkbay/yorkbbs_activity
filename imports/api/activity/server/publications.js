/**
 * Created by jack on 5/17/17.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import {Random} from 'meteor/random';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Comment} from '../../comment/comment.js'

import {Activity} from '../activity.js';
import {ActivityImages} from '../image.js';
import {Facets} from '../facets.js';
import {JoinUsr} from '../joinusr.js';

Meteor.publishComposite('activitiesrecommend', function () {
    return {
        find() {
            var query={};
            query.st={$nin:["del","hidden"]};
            query.istop=true;
            query.toptime={$gte:moment().toDate()};
           return Activity.find(query,{limit:5,sort:{topsort:1,'meta.dt':-1}});
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
            query['etime.date']={$gte: new Date()};
            if(time){

                let startOfDay;
                let endOfDay ;
                if(time=="today"){

                    startOfDay = moment().startOf('day').format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().startOf('day').format("YYYY-MM-DD")+" 00:00:00";
                    query.$and = [
                        {'btime.date': {$lte: new Date(startOfDay)}},
                        {'etime.date': { $gte: new Date(endOfDay)}},
                    ];
                }else if(time=="tomorrow"){

                    startOfDay = moment().add(1, 'day').format("YYYY-MM-DD")+" 00:00:00";
                    endOfDay = moment().add(1, 'day').format("YYYY-MM-DD")+" 00:00:00";
                    query.$and = [
                        {'btime.date': {$lte: new Date(startOfDay)}},
                        {'etime.date': { $gte: new Date(endOfDay)}},
                    ];

                }else {
                    switch (time) {
                        case "week":
                            startOfDay = moment().day("Sunday").format("YYYY-MM-DD") + " 00:00:00";
                            endOfDay = moment().day("Saturday").format("YYYY-MM-DD") + " 00:00:00";
                            break;
                        case "weekend":
                            startOfDay = moment().day(6).format("YYYY-MM-DD") + " 00:00:00";
                            endOfDay = moment().day(7).format("YYYY-MM-DD") + " 00:00:00";
                            break;
                        case "nextweekend":
                            startOfDay = moment().day(13).format("YYYY-MM-DD") + " 00:00:00";
                            endOfDay = moment().day(14).format("YYYY-MM-DD") + " 00:00:00";
                            break;
                        case "month":
                            startOfDay = moment().date(1).format("YYYY-MM-DD") + " 00:00:00";
                            endOfDay = moment().add('months', 1).date(0).format("YYYY-MM-DD") + " 00:00:00";
                            break;
                    }
                    query.$or = [
                        {'btime.date': {$gte: new Date(startOfDay), $lte: new Date(endOfDay)}},
                        {'etime.date': {$gte: new Date(startOfDay), $lte: new Date(endOfDay)}},
                    ];
                }

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
            return Activity.find({tags:{ "$in": [tag] },st:{$nin:["del","hidden"]},'etime.date':{$gte: new Date()}},{limit:5,sort:{'meta.dt':-1}});
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
                    st:"normal",
                    isshow:true
                });
            },
            find(item) {
                return JoinUsr.find({
                    refid: item._id
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
        st:String,
        out:String
    });

    const {key,btime,etime,tag,limit,st,out} = params;

    var query={};

    if(out){
        query["etime.date"]={$lte: new Date()};
    }


    if(st){
        query.st=st
    }else {
        query.st = {$ne: "del"};
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



Meteor.publish('tags.facets', function (params) {
    check(params,{
        key:String,
        time:String,
        isfree:String,
        tag:String,
        isrmd:String
    });

    const {key,time, isfree,tag,isrmd} = params;

    const self = this;

    var match={};
    match.st={$nin:["del","hidden"]};
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
        match.$or=[
            {'btime.date': {$gte: new Date(startOfDay),$lte: new Date(endOfDay)}},
            {'etime.date': {$gte: new Date(startOfDay),$lte: new Date(endOfDay)}},
        ];

    }
    if(key){
        let regex = new RegExp( key, 'i' );
        match={
            ti:regex
        }
    }
    if(isfree ==="1"){
        match.pr={ $eq: "free"};
    }else if(isfree ==="0") {
        match.pr = {$ne: "free"};
    }

    if (isrmd) {
        match.iscmd = true;
        match.cmdtime = {$gte: moment().toDate()};
    }

    if(tag){
        match.tags={
            "$in": [tag]
        }
    }

    var pipeline = [
        {
            $match:match
        },
        {
            $facet: {
                "categorizedByTags": [
                    { $unwind: "$tags" },
                    { $sortByCount: "$tags" }
                ]
            }
        }
    ];

    //console.log(JSON.stringify(pipeline));
    const results= Activity.aggregate(pipeline).shift() || {};

    const token = Facets.getToken(params);

    self.added('facets', Random.id(), {
        token: token,
        data:results
    });

    self.ready();
});


