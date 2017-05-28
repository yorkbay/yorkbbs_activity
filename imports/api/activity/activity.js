/**
 * Created by jack on 5/17/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Comment} from '../comment/comment.js';

class ActivityCollection extends Mongo.Collection {}

export const Activity = new ActivityCollection('activities');

// Deny all client-side updates since we will be using methods to manage this collection


//Activity.allow({
//    insert:function(){
//        return true;
//    },
//    update:function (userId,doc) {
//        return !!userId;
//    }
//});

Activity.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Activity.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    ti: {
        type: String,
        optional:true,
        label: "title"
    },
    st: {
        type: String,
        optional:true,
        label: "status|waiting:normal:top:commond:del"
    },
    logo: {
        type: String,
        label: "logo",
        optional:true
    },
    imgtag: {
        type: String,
        label: "imgtag",
        optional:true
    },
    imgtagcl: {
        type: String,
        label: "img tag color",
        optional:true
    },
    istop: {
        type: Boolean,
        label: "istop",
        optional:true
    },
    toptime:{
        type: Date,
        label: "toptime",
        optional:true
    },
    cmdtime:{
        type: Date,
        label: "commond time",
        optional:true
    },
    color: {
        type: String,
        label: "color",
        optional:true
    },
    sort: {
        type: Number,
        label: "sort",
        optional:true
    },
    isonline: {
        type: Boolean,
        label: "isonline",
        optional:true
    },
    location: {
        type: String,
        label: "location",
        optional:true
    },
    city: {
        type: String,
        label: "city",
        optional:true
    },
    address: {
        type: String,
        label: "address",
        optional:true
    },
    code: {
        type: String,
        label: "code",
        optional:true
    },
    lat: {
        type: String,
        label: "code",
        optional:true,
        autoValue:function(){
            if(this.code){
                var hills = Zipcodes.lookup(this.code);
                console.log(hills);
                return hills.latitude;
            }else {
                return "";
            }

        }
    },
    lng: {
        type: String,
        label: "code",
        optional:true,
        autoValue:function(){
            if(this.code){
                var hills = Zipcodes.lookup(this.code);
                return hills.longitude;
            }else {
                return "";
            }
        }
    },
    'btime.date': {
        type: Date,
        label: "begin date",
        optional:true
    },
    'btime.time': {
        type: String,
        label: "begin time",
        optional:true
    },
    'etime.date': {
        type: Date,
        label: "end date",
        optional:true
    },
    'etime.time': {
        type: String,
        label: "end time",
        optional:true
    },
    pic: {
        type: [String],
        label: "pic",
        optional:true
    },
    ct: {
        type: String,
        label: "content",
        optional:true
    },
    pr: {
        type: String,
        label: "price:free:$..",
        optional:true
    },
    site: {
        type: String,
        label: "site",
        optional:true
    },
    tel: {
        type: String,
        label: "tel",
        optional:true
    },
    tags: {
        type: [String],
        label: "tag",
        optional:true
    },
    'meta.uid': {
        type: String,
        label: "user id",
        optional:true
    },
    'meta.usr': {
        type: String,
        label: "user",
        optional:true
    },
    'meta.dt': {
        type: Date,
        label: "create date",
        optional:true
    },
    "meta.lm": {
        type: Date,
        label: "Last Modified",
        autoValue:function(){
            return new Date()
        },
        optional:true
    }

});


Activity.attachSchema(Activity.schema);


Activity.helpers({
    comments() {
        return {
            itemid:this._id,
            comments:Comment.find({refid: this._id}, {sort: {'meta.dt': -1}})
        }
    }
});
