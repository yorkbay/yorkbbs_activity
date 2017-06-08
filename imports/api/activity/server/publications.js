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
           return Activity.find(query,{limit:8,sort:{topsort:1}});
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
                //var condition=getdate(time);


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
                query.isrmd=true;
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
        time:String,
        tag:String,
        limit:Number,
        st:String
    });

    const {key,time,tag,limit,st} = params;

    var query={};

    if(st){
        query.st=st
    }else {
        query.st = {$ne: "del"};
    }

    if(time){
        //var condition=getdate(time);

        var start = moment().startOf('day');
        var end = moment().endOf('day');

        query.btime={
            date:{$gte:start}
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


