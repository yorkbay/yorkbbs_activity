/**
 * Created by jack on 5/17/17.
 */

import { Meteor } from 'meteor/meteor';
import { Activity } from './activity.js';


export const insert = new ValidatedMethod({
    name: 'Activity.insert',
    validate: Activity.simpleSchema().pick(['ti','st','isonline','location','city','address','code','btime.date','btime.time','etime.date','etime.time',"logo",'pic','pic.$','ct','pr','site','tel','tags','tags.$']).validator({ clean: true, filter: false }),
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