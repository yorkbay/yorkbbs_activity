
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class FeedbackCollection extends Mongo.Collection {}

export const Feedback = new FeedbackCollection('feedbacks');

Feedback.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Feedback.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    st: {
        type: String,
        optional:true,
        label: "status|normal:del"
    },
    ty: {
        type: [String],
        optional:true,
        label: "feedback type"
    },
    ct: {
        type: String,
        optional:true,
        label: "content"
    },
    refid: {
        type: String,
        optional:true,
        label: "status|normal:del"
    },
    refti: {
        type: String,
        optional:true,
        label: "user id"
    },
    fduid: {
        type: String,
        optional:true,
        label: "feedback user id"
    },
    fduname: {
        type: String,
        optional:true,
        label: "feedback user name"
    },
    fddt: {
        type: Date,
        label: "create date",
        optional:true
    },
    ismanage:{
        type:Boolean,
        label: "create date",
        optional:true
    },
    mid: {
        type: String,
        optional:true,
        label: "manage user id"
    },
    mname: {
        type: String,
        optional:true,
        label: "manage user name"
    },
    mct: {
        type: String,
        optional:true,
        label: "manage content"
    },
    mdt: {
        type: Date,
        label: "manage date",
        optional:true
    }
});


Feedback.attachSchema(Feedback.schema);