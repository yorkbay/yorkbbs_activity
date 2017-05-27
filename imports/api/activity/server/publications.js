/**
 * Created by jack on 5/17/17.
 */
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {Activity} from '../activity.js';

Meteor.publish('activitiesrecommend', function () {
    return Activity.find({},{limit:8,sort:{'meta.dt':-1}});
});


Meteor.publish('activitiesbytag', function (tag) {
    check(tag,String);
    return Activity.find({tags:{ "$in": [tag] }},{limit:8,sort:{'meta.dt':-1}});
});

Meteor.publish('activitybyid', function (id) {
    check(id,String);
    return Activity.find({_id:id});
});