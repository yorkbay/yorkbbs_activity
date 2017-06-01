
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class ManagerCollection extends Mongo.Collection {}

export const Manager = new ManagerCollection('managers');

Manager.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Manager.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    uname: {
        type: String,
        optional:true,
        label: "content"
    },
    pwd: {
        type: String,
        optional:true,
        label: "content"
    },
    role: {
        type: [String],
        optional:true,
        label: "role"
    },
    st: {
        type: String,
        optional:true,
        label: "status|normal:del"
    },
    dt: {
        type: Date,
        label: "create date",
        optional:true,
        autoValue:function () {
            return new Date();
        }
    },
    lm: {
        type: Date,
        label: "last login date",
        optional:true
    }
});


Manager.attachSchema(Manager.schema);