import {Tag} from './tag.js';


export const tagInsert = new ValidatedMethod({
    name: 'tagInsert',
    validate: Tag.simpleSchema().pick(['type','st','uid','uname',"dt"]).validator({ clean: true, filter: false }),
    run(obj) {
        return Tag.insert(obj);
    }
});