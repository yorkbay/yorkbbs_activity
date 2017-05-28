import { Meteor } from 'meteor/meteor';
import {Comment} from './comment.js';

export const commentInsert = new ValidatedMethod({
    name: 'commentInsert',
    validate: Comment.simpleSchema().pick(['ct','st','refid','meta.uid','meta.usr']).validator({ clean: true, filter: false }),
    run(obj) {
        return Comment.insert(obj);
    }
});