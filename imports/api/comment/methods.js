import { Meteor } from 'meteor/meteor';
import {Comment} from './comment.js';

export const commentInsert = new ValidatedMethod({
    name: 'commentInsert',
    validate: Comment.simpleSchema().pick(['ct','st','review','refid','ti','meta.uid','meta.usr','meta.dt']).validator({ clean: true, filter: false }),
    run(obj) {
        return Comment.insert(obj);
    }
});


export const commentmodifyst = new ValidatedMethod({
    name: 'Comment.commentmodifyst',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Comment.update(_id, {
            $set:{st:st}
        });
    }
});

export const commentmodifyreview = new ValidatedMethod({
    name: 'Comment.commentmodifyreview',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        review:{
            type:Boolean
        }
    }).validator(),
    run({_id,review}) {
        return Comment.update(_id, {
            $set:{review:review}
        });
    }
});

export const commentmodifystbyid = new ValidatedMethod({
    name: 'Comment.commentmodifystbyid',
    validate: new SimpleSchema({
        _id: {
            type: [String],
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Comment.update(
            {_id:{$in:_id}},
            {$set:{st:st}},
            {multi: true}
        );
    }
});