/**
 * Created by jack on 6/4/17.
 */
import {Feedback} from '../feedback.js'

Meteor.publish('feedbackslist', function (params) {
    check(params,{
        key:String,
        ty:String,
        ismanage:String,
        limit:Number,
        btime:String,
        etime:String
    });
    const {key,ty,ismanage,limit,btime,etime} = params;

    var query={};
    query.st={$ne:"del"};

    if(key){
        let regex = new RegExp( key, 'i' );
        query.ct=regex
    }
    if(ty){
        query.ty={$in:[ty]}
    }
    if(btime){
        query.fddt={$gte:new Date(moment(btime).format("YYYY-MM-DD"))}
    }

    if(etime){
        query.fddt={$lte:new Date(moment(etime).format("YYYY-MM-DD"))}
    }

    if(ismanage){
        if(ismanage =="true"){
            query.ismanage=true;
        }else{
            query.ismanage=false;
        }
    }
    return Feedback.find(query,{limit:limit,sort:{fddt:-1}});
});