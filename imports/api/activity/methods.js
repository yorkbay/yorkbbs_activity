/**
 * Created by jack on 5/17/17.
 */

import { Meteor } from 'meteor/meteor';
import { Activity } from './activity.js';
import {ActivityImages} from './image.js';
import {ActivityImageSpec} from './specs.js';


export const insert = new ValidatedMethod({
    name: 'Activity.insert',
    validate: Activity.simpleSchema().pick(['ti','st','isonline','location','city','address','code','btime.date','btime.time','etime.date','etime.time',"logo",'ct','pr','site','tel','tags','tags.$',"meta.uid","meta.usr","meta.dt"]).validator({ clean: true, filter: false }),
    run(obj) {
        if(Meteor.isServer) {
            if(!obj.isonline) {
                var geo = new GeoCoder();
                var result = geo.geocode(obj.address)[0];
                if(result) {
                    obj.lat = result.latitude;
                    obj.lng = result.longitude;
                }
            }
            return Activity.insert(obj);
        }

    }
});

export const modify = new ValidatedMethod({
    name: 'Activity.modify',
    validate: Activity.simpleSchema().pick(["_id",'ti','isonline','location','city','address','code','btime.date','btime.time','etime.date','etime.time',"logo",'ct','pr','site','tel','tags','tags.$']).validator({ clean: true, filter: false }),
    run(obj) {
        if(Meteor.isServer) {
            if(!obj.isonline) {
                var geo = new GeoCoder();
                var result = geo.geocode(obj.address)[0];
                if(result) {
                    obj.lat = result.latitude;
                    obj.lng = result.longitude;
                }
            }
            let _id=obj._id;
            delete obj._id;
            return Activity.update(_id,{
                $set:obj
            });
        }

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

export const ActivityImageInsert = new ValidatedMethod({
    name: 'Activity.image.insert',
    validate: ActivityImages.simpleSchema().validator({ clean: true, filter: false }),
    run(obj) {
        //console.log(obj);
        return ActivityImages.insert(obj);
    }
});

export const ActivityImageSpecInsert = new ValidatedMethod({
    name: 'Activity.image.spec.insert',
    validate: ActivityImageSpec.simpleSchema().pick(["ri"]).validator({ clean: true, filter: false }),
    run(obj) {
        return ActivityImageSpec.insert(obj);
    }
});

export const activityCheckModify=new ValidatedMethod({
    name:'Activity.check',
    validate: Activity.simpleSchema().pick(["_id","st","istop","toptime","iscmd","cmdtime","topsort","imgtagcl","imgtag"]).validator({ clean: true, filter: false }),
    run(obj) {
        let _id=obj._id;
        delete obj._id;

        return Activity.update(_id,{
            $set:obj
        });
    }
});