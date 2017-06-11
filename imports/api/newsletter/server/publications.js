import {Newsletter} from '../newsletter.js'

Meteor.publish('newsletterlist', function (params) {
    check(params,{
        btime:String,
        etime:String,
        limit:Number
    });
    const {btime, etime,limit} = params;

    var query={};

    query.st={$ne:"del"};

    if(btime){
        query.dt={$gte:new Date(moment(btime).format("YYYY-MM-DD"))}
    }

    if(etime){
        query.dt={$lte:new Date(moment(etime).format("YYYY-MM-DD"))}
    }

    return Newsletter.find(query,{limit:limit,sort:{dt:-1}});
});