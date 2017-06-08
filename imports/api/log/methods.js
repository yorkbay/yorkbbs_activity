/**
 * Created by jack on 6/7/17.
 */
import { Meteor } from 'meteor/meteor';
import {Log} from './log.js';

export const LogInsert = new ValidatedMethod({
    name: 'LogInsert',
    validate: Log.simpleSchema().pick(['ty','action','ip','from','refid','ti','meta.uid','meta.usr','meta.dt']).validator({ clean: true, filter: false }),
    run(obj) {
        return Log.insert(obj);
    }
});
