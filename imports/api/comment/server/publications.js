/**
 * Created by jack on 5/26/17.
 */

import {Comment} from '../comment.js'

Meteor.publish('commentslistbyid', function (params) {
    check(params,{
        id:String
    });
    const {id} = params;

    return Comment.find({refid: id,st:"normal",isshow:true}, {sort: {'meta.dt': -1}})

    //return Comment.find(query,{limit:limit,sort:{'meta.dt':-1}});
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