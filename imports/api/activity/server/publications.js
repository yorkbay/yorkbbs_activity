/**
 * Created by jack on 5/17/17.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Comment} from '../../comment/comment.js'

import {Activity} from '../activity.js';

Meteor.publish('activitiesrecommend', function () {
    return Activity.find({},{limit:8,sort:{'meta.dt':-1}});
});


Meteor.publish('activitieslist', function (params) {
    check(params,{
        time:String,
        isfree:String,
        tag:String,
        isrmd:String,
        limit:Number
    });
    const {time, isfree,tag,isrmd,limit} = params;

    var query={};
    if(time){
        query.time=time;
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
    return Activity.find(query,{limit:limit,sort:{'meta.dt':-1}});
});

Meteor.publish('activitiesbytag', function (tag) {
    check(tag,String);
    return Activity.find({tags:{ "$in": [tag] }},{limit:8,sort:{'meta.dt':-1}});
});

/*
Meteor.publish('activitybyid', function (id) {
    check(id,String);
    return Activity.find({_id:id});
});
*/

Meteor.publishComposite('activitybyid', function (id) {
    check(id,String);
    return {
        find(){
           return Activity.find({_id:id});
        },
        children: [{
            find(item) {
                return Comment.find({
                    refid: item._id
                });
            }
        }]
    };
});


