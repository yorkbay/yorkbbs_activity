
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Activity} from '../activity/activity.js';

class UsrCenterCollection extends Mongo.Collection {}

export const UsrCenter = new UsrCenterCollection('usrcenters');


UsrCenter.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});


UsrCenter.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    ty: {
        type: String,
        optional:true,
        label: "type"
    },
    st: {
        type: String,
        optional:true,
        label: "status|normal:del"
    },
    refid: {
        type: String,
        optional:true,
        label: "activity id"
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
        optional:true,
        autoValue:function () {
            return new Date();
        }
    }
});


UsrCenter.attachSchema(UsrCenter.schema);

UsrCenter.helpers({
    findActivitybyid() {
        return Activity.findOne({_id:this.refid});
    }
});