/**
 * Created by jack on 5/26/17.
 */
import {Manager} from './manager.js';
import {Meteor} from 'meteor/meteor'

export const insert = new ValidatedMethod({
    name: 'Manager.insert',
    validate: Manager.simpleSchema().pick(["uname","pwd","st"]).validator({ clean: true, filter: false }),
    run(obj) {
        var m = Manager.findOne({uname: obj.uname});
        if (!m || !m._id) {
            return Manager.insert(obj);
        }else{
            return m;
        }
    }
});

export const managerLogin = new ValidatedMethod({
    name: 'Manager.managerLogin',
    validate: Manager.simpleSchema().pick(["uname","pwd"]).validator({ clean: true, filter: false }),
    run(obj) {

        var result=true;
        //https://forums.meteor.com/t/solved-findone-executed-in-meteor-methods-dosent-works/28784/12
        /*
        const m = Manager.find({uname: obj.uname,st:"normal"}).fetch()[0];
        console.log(m.uname);
        if(m && obj.pwd===m.pwd){
            result=true;
            console.log("aaaaaaaaaaaaaaaaaaaa");
            Manager.update(m, {
                $set: { lm: new Date() },
           });
        }
        */
        return result;
    }
});
