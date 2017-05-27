/**
 * Created by jack on 5/26/17.
 */
/**
 * Created by jack on 5/17/17.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


class CommentCollection extends Mongo.Collection {}

export const Comment = new CommentCollection('comments');

Comment.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Comment.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    ct: {
        type: String,
        optional:true,
        label: "content"
    },
    st: {
        type: String,
        optional:true,
        label: "status|normal:del"
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
    }
});


Comment.attachSchema(Comment.schema);