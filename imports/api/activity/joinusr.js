import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class JoinUsrCollection extends Mongo.Collection {
}

export const JoinUsr = new JoinUsrCollection('activity.joinusrs');



// Deny all client-side updates since we will be using methods to manage this collection
JoinUsr.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

JoinUsr.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    refid: {
        type: String,
        optional:true,
        label: "activity id"
    },
    ti:{
        type: String,
        optional:true,
        label: "activity ti"
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
    'meta.avatar': {
        type: String,
        label: "user Avatar",
        optional:true
    },
    'meta.dt': {
        type: Date,
        label: "create date",
        optional:true
    }
});

JoinUsr.helpers({

});

JoinUsr.attachSchema(JoinUsr.schema);