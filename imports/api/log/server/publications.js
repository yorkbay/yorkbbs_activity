/**
 * Created by jack on 6/7/17.
 */
import {Log} from '../log.js';

Meteor.publish('admin_loglist', function (params) {
    check(params,{
        usr:String,
        btime:String,
        etime:String,
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

    if(btime || etime) {
        query.$and = [];
        if (btime) {
            let b = {'meta.dt': {$gte: new Date(moment(btime).format("YYYY-MM-DD"))}}
            query.$and.push(b);
        }

        if (etime) {
            let e = {'meta.dt': {$lte: new Date(moment(etime).format("YYYY-MM-DD"))}}
            query.$and.push(e);
        }
    }

    return Log.find(query,{limit:limit,sort:{'meta.dt':-1}});
});