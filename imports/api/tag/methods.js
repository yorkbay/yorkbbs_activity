import {Tag} from './tag.js';


export const tagInsert = new ValidatedMethod({
    name: 'tagInsert',
    validate: Tag.simpleSchema().pick(['tg','isshow','st','uid','uname',"dt"]).validator({ clean: true, filter: false }),
    run(obj) {
        return Tag.insert(obj);
    }
});

export const tagmodifyst = new ValidatedMethod({
    name: 'tag.tagmodifyst',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Tag.update(_id, {
            $set:{st:st}
        });
    }
});