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
        review:String
    });
    const {key,btime, etime,limit,review} = params;

    var query={};

    query.st={$ne:"del"};
    query.isshow=true;
    if(key){
        let regex = new RegExp( key, 'i' );
        query={
            ct:regex
        }
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

Meteor.publish('admin_commentslist', function (params) {
    check(params,{
        key:String,
        btime:String,
        etime:String,
        limit:Number,
        isshow:String,
        review:String
    });
    const {key,btime, etime,limit,isshow,review} = params;

    var query={};
    query.st={$ne:"del"};

    if(key){
        let regex = new RegExp( key, 'i' );
        query={
            ct:regex
        }
    }
    if(btime){
        query['meta.dt']={$gte:new Date(moment(btime).format("YYYY-MM-DD"))}
    }

    if(etime){
        query['meta.dt']={$lte:new Date(moment(etime).format("YYYY-MM-DD"))}
    }
    if(isshow){
        if(isshow =="true"){
            query.isshow=true;
        }else{
            query.isshow=false;
        }
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

Meteor.publish('commentfindbyid', function (id) {
    check(id,String);

    var query={_id:id};
    return Comment.find(query);
});