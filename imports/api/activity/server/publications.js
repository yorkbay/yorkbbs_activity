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
        key:String,
        time:String,
        isfree:String,
        tag:String,
        isrmd:String,
        limit:Number,
        st:String
    });
    const {key,time, isfree,tag,isrmd,limit,st} = params;

    var query={};

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
    return Activity.find({tags:{ "$in": [tag] }},{limit:5,sort:{'meta.dt':-1}});
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
                    refid: item._id
                });
            }
        }]
    };
});

Meteor.publish('activitiestags', function () {
    const results ="";
    /*
    let query={
        $facet: {
            "categorizedByTags": [
                {$unwind: "$tags"},
                {$sortByCount: "$tags"}
            ]
        }
    };


    const results =Activity.aggregate(query).shift() || {};

    // post processing facet values
    for (let facet in results) {
        results[facet] && results[facet].forEach(obj => {
            obj.id = obj._id;
            delete obj._id;
        });
    }
    */
    return results;
});

function getdate(time) {
    var condition={};
    var searchtime;
    if(time==="today"){
        searchtime=moment(new Date()).format("YYYY-MM-DD");
        condition={
            btime:{date:{$eq:searchtime}},
            etime:{date:{$eq: searchtime}}
        }
    }
    return condition;
}
