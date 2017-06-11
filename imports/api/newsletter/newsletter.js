
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class NewsletterCollection extends Mongo.Collection {}

export const Newsletter = new NewsletterCollection('newsletters');

Newsletter.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Newsletter.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    email: {
        type: String,
        optional:true,
        label: "tag name"
    },
    st: {
        type: String,
        optional:true,
        label: "status|normal:del"
    },
    issend: {
        type: Boolean,
        optional:true,
        label: "issend"
    },
    uid: {
        type: String,
        optional:true,
        label: "user id"
    },
    uname: {
        type: String,
        optional:true,
        label: "user name"
    },
    dt: {
        type: Date,
        label: "create date",
        optional:true
    }
});


Newsletter.attachSchema(Newsletter.schema);