import {Newsletter}  from './newsletter.js';

export const newsletterInsert = new ValidatedMethod({
    name: 'newsletterInsert',
    validate: Newsletter.simpleSchema().pick(['email','st','issend','uid','uname']).validator({ clean: true, filter: false }),
    run(obj) {
        return Newsletter.insert(obj);
    }
});


export const newslettermodifyst = new ValidatedMethod({
    name: 'Newsletter.newslettermodifyst',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Newsletter.update(_id, {
            $set:{st:st}
        });
    }
});


export const newslettermodifystbyid = new ValidatedMethod({
    name: 'Newsletter.newslettermodifystbyid',
    validate: new SimpleSchema({
        _id: {
            type: [String],
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        console.log(_id);
        return Newsletter.update(
            {_id:{$in:_id}},
            {$set:{st:st}},
            {multi: true}
        );
    }
});