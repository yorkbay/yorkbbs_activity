/**
 * Created by jack on 5/29/17.
 */
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {UsrCenter} from '../usrcenter.js'
import {Activity} from '../../activity/activity.js';


Meteor.publishComposite('usrcenterinfo', function (ty,uid,limit) {
    check(uid,String);
    check(limit,Number);
    check(ty,String);
    return {
        find(){
            return UsrCenter.find({"meta.uid":uid,ty:ty},{limit:limit,sort:{'meta.dt':-1}});
        },
        children: [{
            find(item) {
                return Activity.find({
                    _id: item.refid
                });
            }
        }]
    }
});