/**
 * Created by jack on 5/17/17.
 */

import { Meteor } from 'meteor/meteor';
import { Activity } from './activity.js';


export const insert = new ValidatedMethod({
    name: 'Activity.insert',
    validate: Activity.simpleSchema().pick(['ti','st','isonline','location','city','address','code','btime.date','btime.time','etime.date','etime.time',"logo",'pic','pic.$','ct','pr','site','tel','tags','tags.$',"meta.uid","meta.usr","meta.dt"]).validator({ clean: true, filter: false }),
    run(obj) {

        return Activity.insert(obj);
    }
});


export const listbytag = new ValidatedMethod({
    name: 'Activity.listbytag',
    validate: new SimpleSchema({
        tag: {
            type: String,
        },
    }).validator(),
    run({tag}) {
        return Activity.find({tags:{ "$in": [tag] }},{limit:8,sort:{'meta.dt':-1}});
    }
});



export const tagnum = new ValidatedMethod({
    name: 'Activity.tagnum',
    validate: new SimpleSchema({}).validator(),
    run() {
        let query={
            $facet: {
                "categorizedByTags": [
                    {$unwind: "$tags"},
                    {$sortByCount: "$tags"}
                ]
            }
        };


        const results ="";//Activity.aggregate(query).shift() || {};

        // post processing facet values
        for (let facet in results) {
            results[facet] && results[facet].forEach(obj => {
                obj.id = obj._id;
                delete obj._id;
            });
        }
        return results;
    }
});


export const activitymodifyst = new ValidatedMethod({
    name: 'Activity.activitymodifyst',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Activity.update(_id, {
            $set:{st:st}
        });
    }
});

export const activitymodifystbyid = new ValidatedMethod({
    name: 'Activity.activitymodifystbyid',
    validate: new SimpleSchema({
        _id: {
            type: [String],
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Activity.update(
            {_id:{$in:_id}},
            {$set:{st:st}},
            {multi: true}
        );
    }
});