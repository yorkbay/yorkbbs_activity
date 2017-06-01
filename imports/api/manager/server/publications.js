/**
 * Created by jack on 5/26/17.
 */
import {Manager} from '../manager.js'

Meteor.publish('managerlist', function (limit) {
    check(limit,Number);
    return Manager.find({},{limit:limit,sort:{'meta.dt':-1}});
});