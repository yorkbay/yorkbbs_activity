import {Newsletter} from '../newsletter.js'

Meteor.publish('newsletterlist', function (params) {
    check(params,{
        btime:Date,
        etime:Date,
        limit:Number
    });
    const {btime, etime,limit} = params;

    var query={};

    query.st={$ne:"del"};


    return Newsletter.find(query,{limit:limit,sort:{dt:-1}});
});