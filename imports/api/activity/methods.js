/**
 * Created by jack on 5/17/17.
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Activity } from './activity.js';


export const insert = new ValidatedMethod({
    name: 'Activity.insert',
    validate: new SimpleSchema({
        ti: {
            type: String
        },
        st: {
            type: String
        },
        isonline: {
            type: Boolean,
            label: "isonline"
        },
        location: {
            type: String
        },
        city: {
            type: String
        },
        address: {
            type: String
        },
        code: {
            type: String
        },
        lat: {
            type: String
        },
        lng: {
            type: String
        },
        'btime.date': {
            type: Date
        },
        'btime.time': {
            type: String
        },
        'etime.date': {
            type: Date
        },
        'etime.time': {
            type: String
        },
        pic: {
            type: [String],
            label: "pic"

        },
        ct: {
            type: String,
            label: "content"
        },
        pr: {
            type: String,
            label: "price:free:$.."
        },
        site: {
            type: String,
            label: "site"
        },
        tel: {
            type: String,
            label: "tel"
        },
        tags: {
            type: [String],
            label: "tag"
        },
    }).validator(),
    run(obj) {
        console.log(obj);
        return Activity.insert(obj);
    }
});