/**
 * Created by jack on 5/29/17.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {UsrCenter} from '../usrcenter'


Meteor.publish('activitiesbyfav', function (uid,limit) {
    check(uid,String);
    check(limit,Number);

    return UsrCenter.find({"meta.uid":uid,ty:"fav"},{limit:limit,sort:{'meta.dt':-1}});
});

Meteor.publish('activitiesbylog', function (uid,limit) {
    check(uid,String);
    check(limit,Number);
    return UsrCenter.find({"meta.uid":uid,ty:"log"},{limit:limit,sort:{'meta.dt':-1}});
});