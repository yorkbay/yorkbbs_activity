import { Meteor } from 'meteor/meteor';
import { UsrCenter } from './usrcenter.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


export const usrCenterInsert = new ValidatedMethod({
    name: 'UsrCenter.insert',
    validate: UsrCenter.simpleSchema().pick(["refid",'st','ty',"meta.uid","meta.usr"]).validator({ clean: true, filter: false }),
    run(obj) {
        if(Meteor.isServer) {
            let result="";
            var usrct = UsrCenter.findOne({refid: obj.refid, ty: obj.ty, "meta.uid": obj.meta.uid});
            if (!usrct || !usrct._id) {
               UsrCenter.insert(obj);
                result="1";
            } else {
                UsrCenter.remove({_id:usrct._id});
                result= "0";
            }
            return result;
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

