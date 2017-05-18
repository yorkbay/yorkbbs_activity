/**
 * Created by jack on 5/17/17.
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Activity } from './activity.js';

Meteor.methods({
    'activity.insert'(ti) {
        check(ti, String);

        return Activity.insert({
            ti
        });
    },
});