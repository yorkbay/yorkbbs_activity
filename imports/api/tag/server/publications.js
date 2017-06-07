/**
 * Created by jack on 5/26/17.
 */
import {Tag} from '../tag.js'

Meteor.publish('admin_tagslist', function (params) {
    check(params,{
        limit:Number
    });
    const {limit} = params;

    var query={};
    query.st={$ne:"del"};


    return Tag.find(query,{limit:limit,sort:{'dt':-1}});
});


Meteor.publish('tagfindbyid', function (id) {
    check(id,String);

    var query={_id:id};
    return Tag.find(query);
});


Meteor.publish('tagslist', function () {

    var query={};
    query.st={$ne:"del"};
    query.isshow=true;

    return Tag.find(query,{sort:{'dt':-1}});
});