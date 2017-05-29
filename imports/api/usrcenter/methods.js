import { Meteor } from 'meteor/meteor';
import { UsrCenter } from './usrcenter.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


export const usrCenterInsert = new ValidatedMethod({
    name: 'UsrCenter.insert',
    validate: UsrCenter.simpleSchema().pick(["ti","refid",'st','ty','location','city','address','code','btime.date','btime.time','etime.date','etime.time',"logo",'pr','tags','tags.$',"meta.uid","meta.usr"]).validator({ clean: true, filter: false }),
    run(obj) {
        var usrct = UsrCenter.findOne({refid: obj.refid});
        if (!usrct || !usrct._id) {
            return UsrCenter.insert(obj);
        }else{
            return usrct;
        }
    }
});


export const findbyuid = new ValidatedMethod({
    name: 'UsrCenter.findbyuid',
    validate: new SimpleSchema({
        uid:{type:String},
        ty:{type:String},
        limit:{type:Number}
    }).validator({ clean: true, filter: false }),
    run({uid,ty,limit}) {
        return UsrCenter.find({"meta.uid":uid,ty:ty},{limit:limit,sort:{'meta.dt':-1}});
    }
});

