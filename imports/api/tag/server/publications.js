/**
 * Created by jack on 5/26/17.
 */
import {Tag} from '../tag.js'

Meteor.publish('tagslist', function (params) {
    check(params,{
        limit:Number
    });
    const {limit} = params;

    var query={};
    query.st={$ne:"del"};


    return Comment.find(query,{limit:limit,sort:{'meta.dt':-1}});
});