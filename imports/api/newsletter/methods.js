import {Newsletter}  from './newsletter.js';
import sg from 'sendgrid'
const api_key='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';
const sendgrid = sg(api_key);

export const newsletterInsert = new ValidatedMethod({
    name: 'newsletterInsert',
    validate: Newsletter.simpleSchema().pick(['email','st','issend','uid','uname','dt']).validator({ clean: true, filter: false }),
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
        return Newsletter.update(
            {_id:{$in:_id}},
            {$set:{st:st}},
            {multi: true}
        );
    }
});


export const newsletterissend = new ValidatedMethod({
    name: 'Newsletter.newsletterissend',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        issend:{
            type:Boolean
        }
    }).validator(),
    run({_id,issend}) {
        return Newsletter.update(_id, {
            $set:{issend:issend}
        });
    }
});

export const add_newsletter = new ValidatedMethod({
    name: 'Newsletter.add_newsletter',
    validate: new SimpleSchema({
        email: {
            type: String,
        }
    }).validator(),
    run({email}) {
        if(Meteor.isServer) {
            let result="1";
            var request = sendgrid.emptyRequest();
            request.body = [
                {
                    "email":email,
                    "first_name": "",
                    "last_name": ""
                }
            ];

            request.method = 'POST'
            request.path = '/v3/contactdb/recipients'
            sendgrid.API(request, function (error, response) {
                if(!error){
                    let result=response.body;
                    let recipientid=result.persisted_recipients[0];
         
                    request.body = [
                        recipientid
                    ];
                    request.method = 'POST'
                    request.path = '/v3/contactdb/lists/787986/recipients'
                    sendgrid.API(request, function (error, response) {
     
                        if(error){
                            result="0";
                        }else{
                            result="1";
                        }
                    })
                }else{
                    result="0";
                }
            });
            return result;


        }
    }
});