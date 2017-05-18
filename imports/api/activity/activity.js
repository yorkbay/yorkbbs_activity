/**
 * Created by jack on 5/17/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class ActivityCollection extends Mongo.Collection {}

export const Activity = new ActivityCollection('activities');

// Deny all client-side updates since we will be using methods to manage this collection


Activity.allow({
    insert:function(){
        return true;
    },
    update:function (userId,doc) {
        return !!userId;
    }
});

Activity.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    ti: {
        type: String,
        label: "title"
    },
    st: {
        type: String,
        label: "status",
        autoValue:function(){
            return ""
        }
    },
    istop: {
        type: String,
        label: "istop",
        autoValue:function(){
            return ""
        }
    },
    sort: {
        type: Number,
        label: "sort",
        autoValue:function(){
            return 1
        }
    },
    location: {
        type: String,
        label: "location",
        autoValue:function(){
            return ""
        }
    },
    city: {
        type: String,
        label: "city",
        autoValue:function(){
            return ""
        }
    },
    address: {
        type: String,
        label: "address",
        autoValue:function(){
            return ""
        }
    },
    code: {
        type: String,
        label: "code",
        autoValue:function(){
            return ""
        }
    },
    'btime.date': {
        type: Date,
        label: "begin date"
    },
    'btime.time': {
        type: String,
        label: "begin time"
    },
    'etime.date': {
        type: Date,
        label: "end date"
    },
    'etime.time': {
        type: String,
        label: "end time"
    },
    pic: {
        type: [String],
        label: "pic",
        autoValue:function(){
            return []
        }
    },
    ct: {
        type: String,
        label: "content",
        autoValue:function(){
            return ""
        }
    },
    pr: {
        type: String,
        label: "price:free:$..",
        autoValue:function(){
            return "free"
        }
    },
    site: {
        type: String,
        label: "site",
        autoValue:function(){
            return ""
        }
    },
    tel: {
        type: String,
        label: "tel",
        autoValue:function(){
            return ""
        }
    },
    tag: {
        type: [String],
        label: "tag",
        autoValue:function(){
            return []
        }
    },
    'meta.uid': {
        type: String,
        label: "user id",
        autoValue:function(){
            return ""
        }
    },
    'meta.usr': {
        type: String,
        label: "user",
        autoValue:function(){
            return ""
        }
    },
    'meta.dt': {
        type: Date,
        label: "create date",
        autoValue:function(){
            return new Date()
        }
    },
    "meta.lm": {
        type: Date,
        label: "Last Modified",
        autoValue:function(){
            return new Date()
        }
    }

});

Activity.attachSchema(Activity.schema);

Activity.publicFields = {
    _id: 1,
    ti: 1,
    istop: 1,
    'btime.date': 1,
    'etime.date': 1,
    pic: 1,
    pr: 1
};

Activity.helpers({

});