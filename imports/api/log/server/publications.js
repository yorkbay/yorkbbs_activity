/**
 * Created by jack on 6/7/17.
 */
import {Log} from '../log.js';

Meteor.publish('admin_loglist', function (params) {
    check(params,{
        usr:String,
        btime:Date,
        etime:Date,
        limit:Number,
        action:String,
        ty:String
    });
    const {usr,btime, etime,limit,action,ty} = params;

    var query={};

    if(usr){
        let regex = new RegExp(usr, 'i' );
        query["meta.usr"]=regex;
    }
    if(ty){
        query.ty=ty;
    }
    if(action){
        query.action=action;
    }

    return Log.find(query,{limit:limit,sort:{'meta.dt':-1}});
});