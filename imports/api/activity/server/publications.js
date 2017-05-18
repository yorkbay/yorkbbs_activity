/**
 * Created by jack on 5/17/17.
 */
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {Activity} from '../activity.js';

Meteor.publish('activities', function () {
    return Activity.find();
});