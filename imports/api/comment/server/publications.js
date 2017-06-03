/**
 * Created by jack on 5/26/17.
 */

import {Comment} from '../comment.js'

Meteor.publish('commentslist', function (params) {
    check(params,{
        key:String,
        btime:Date,
        etime:Date,
        limit:Number,
        st:String,
        review:String
    });
    const {key,btime, etime,limit,st,review} = params;

    var query={};
    //query.$or = [];
    query.st={$ne:"del"};
    if(key){

        let regex = new RegExp( key, 'i' );
        query={
            ct:regex
        }

    }
    if(st){
        query.st=st;
    }
    if(review){
        if(review =="true"){
            query.review=true;
        }else{
            query.review=false;
        }
    }

    return Comment.find(query,{limit:limit,sort:{'meta.dt':-1}});
});