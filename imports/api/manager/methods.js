/**
 * Created by jack on 5/26/17.
 */
import {Manager} from './manager.js';
import {Meteor} from 'meteor/meteor'

export const insert = new ValidatedMethod({
    name: 'Manager.insert',
    validate: Manager.simpleSchema().pick(["uname","pwd","st","dt"]).validator({ clean: true, filter: false }),
    run(obj) {
        if(Meteor.isServer) {
            var m = Manager.findOne({uname: obj.uname});
            if (!m || !m._id) {
                return Manager.insert(obj);
            } else {
                return "";
            }
        }
    }
});

export const managerLogin = new ValidatedMethod({
    name: 'Manager.managerLogin',
    validate: Manager.simpleSchema().pick(["uname","pwd"]).validator({ clean: true, filter: false }),
    run(obj) {

        if(Meteor.isServer){
            //https://forums.meteor.com/t/solved-findone-executed-in-meteor-methods-dosent-works/28784/12
             const m = Manager.find({uname: obj.uname,st:"normal"}).fetch()[0];
            if(m && obj.pwd===m.pwd){
                Manager.update(m, {
                    $set: { lm: new Date() },
               });
                return m;

            }else {
                return "";
            }
        }

    }
});


export const managerModifyst = new ValidatedMethod({
    name: 'Manager.managerModifyst',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        st:{
            type:String
        }
    }).validator(),
    run({_id,st}) {
        return Manager.update(_id,{
            $set:{st:st}
        });
    }
});

export const managerModifyrole = new ValidatedMethod({
    name: 'Manager.managerModifyrole',
    validate: new SimpleSchema({
        _id: {
            type: String,
        },
        role:{
            type:String
        }
    }).validator(),
    run({_id,role}) {
        return Manager.update(_id,{
            $set:{role:role}
        });
    }
});