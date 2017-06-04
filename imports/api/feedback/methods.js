/**
 * Created by jack on 6/4/17.
 */
import {Feedback} from './feedback.js';

export const feedbackInsert = new ValidatedMethod({
    name: 'feedbackInsert',
    validate: Feedback.simpleSchema().pick(['st','ty','ty.$','ct','refid','refti','fduid',"fduname","fddt","ismanage"]).validator({ clean: true, filter: false }),
    run(obj) {
        return Feedback.insert(obj);
    }
});

export const feedbackmodifyst = new ValidatedMethod({
    name: 'Feedback.feedbackmodifyst',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Feedback.update(_id, {
            $set:{st:st}
        });
    }
});

export const feedbackmanage = new ValidatedMethod({
    name: 'Feedback.feedbackmanage',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        ismanage:{
            type:Boolean,
        },
        mid: {
            type: String,
        },
        mname: {
            type: String,
        },
        mct: {
            type: String,
        },
        mdt: {
            type: Date,
        }

    }).validator(),
    run(params) {
        const {_id,ismanage,mid,mname,mct,mdt} = params;
        return Feedback.update(_id, {
            $set:{
                ismanage:ismanage,
                mid:mid,
                mname:mname,
                mct:mct,
                mdt:mdt
            }
        });
    }
});

export const feedbackmodifystbyid = new ValidatedMethod({
    name: 'Feedback.feedbackmodifystbyid',
    validate: new SimpleSchema({
        _id: {
            type: [String],
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Feedback.update(
            {_id:{$in:_id}},
            {$set:{st:st}},
            {multi: true}
        );
    }
});