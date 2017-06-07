import {Tag} from './tag.js';
import {Meteor} from 'meteor/meteor'

export const tagInsert = new ValidatedMethod({
    name: 'tagInsert',
    validate: Tag.simpleSchema().pick(['tg','isshow','st','uid','uname',"dt"]).validator({ clean: true, filter: false }),
    run(obj) {
        if(Meteor.isServer){
            const t = Tag.findOne({tg: obj.tg,st:"normal"});
            if(t && t.tg){
                return ""
            }else {
                return Tag.insert(obj);
            }
        }
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


export const tagmodifyisshow = new ValidatedMethod({
    name: 'tag.tagmodifyisshow',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        isshow:{
            type:Boolean
        }
    }).validator(),
    run({_id,isshow}) {
        return Tag.update(_id, {
            $set:{isshow:isshow}
        });
    }
});