
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class TagCollection extends Mongo.Collection {}

export const Tag = new TagCollection('tags');

Tag.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Tag.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    tg: {
        type: String,
        optional:true,
        label: "tag name"
    },
    st: {
        type: String,
        optional:true,
        label: "status|normal:del"
    },
    dt: {
        type: Date,
        label: "create date",
        optional:true
    }
});


Tag.attachSchema(Tag.schema);