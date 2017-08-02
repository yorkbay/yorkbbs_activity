import {Meteor} from 'meteor/meteor';
import {UsrCenter} from './usrcenter.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import { HTTP } from 'meteor/http';


export const usrCenterInsert = new ValidatedMethod({
    name: 'UsrCenter.insert',
    validate: UsrCenter.simpleSchema().pick(["refid", 'st', 'ty', "meta.uid", "meta.usr"]).validator({
        clean: true,
        filter: false
    }),
    run(obj) {
        if (Meteor.isServer) {
            let result = "";
            var usrct = UsrCenter.findOne({refid: obj.refid, ty: obj.ty, "meta.uid": obj.meta.uid});
            if (!usrct || !usrct._id) {
                UsrCenter.insert(obj);
                result = "1";
            } else {
                UsrCenter.remove({_id: usrct._id});
                result = "0";
            }
            return result;
        }
    }
});


export const findbyuid = new ValidatedMethod({
    name: 'UsrCenter.findbyuid',
    validate: new SimpleSchema({
        uid: {type: String},
        ty: {type: String},
        limit: {type: Number}
    }).validator({clean: true, filter: false}),
    run({uid, ty, limit}) {
        return UsrCenter.find({"meta.uid": uid, ty: ty}, {limit: limit, sort: {'meta.dt': -1}});
    }
});


export const userLogin = new ValidatedMethod({
    name: 'UsrCenter.userLogin',
    validate: new SimpleSchema({
        uname: {type: String},
        pwd: {type: String}
    }).validator({clean: true, filter: false}),
    run({uname, pwd}) {
        if (Meteor.isServer) {

            var url = 'http://passport.yorkbbs.ca/passport.asmx?wsdl';

            /*
            var args = {
                orcCredential: {
                    ClientName: "activity",
                    ClientPassword: "A1234567$"
                },
                strUserName: "怡情楼",
                strPassword: "a82b19856a46661394e9593c2db45592"
            };
             */

            var password=CryptoJS.MD5(pwd).toString().toLocaleLowerCase();

            var args = {
                orcCredential: {
                    ClientName: "activity",
                    ClientPassword: "A1234567$"
                },
                strUserName: uname,
                strPassword: password
            };

            var r={};

            try {
                var client = Soap.createClient(url);
                var result = client.AuthenticateUserByName(args);
                if(result && result.AuthenticateUserByNameResult.Authenticated) {
                    r = {
                        Authenticated: result.AuthenticateUserByNameResult.Authenticated,
                        uname: result.AuthenticateUserByNameResult.UserName,
                        NickName: result.AuthenticateUserByNameResult.NickName,
                        id: result.AuthenticateUserByNameResult.UId,
                        UserGroupid: result.AuthenticateUserByNameResult.UserGroupid,
                        Pwd:"",
                        Avatar:""
                    };

                    args = {
                        orcCredential: {
                            ClientName: "activity",
                            ClientPassword: "A1234567$"
                        },
                        uid: result.AuthenticateUserByNameResult.UId,
                    };

                    var avatarurl="http://api.yorkbbs.ca/YorkBBSPassport.asmx?wsdl";
                    client = Soap.createClient(avatarurl);
                    result = client.UserAvatar(args);

                    r.Avatar=result.UserAvatarResult;

                    var cookieurl="http://www.99g.com/des/index.aspx?password="+password+"&encryptKey=X0B66J2H0T&type=Encode";
                    //var cookieurl="http://www.99g.com/des/index.aspx?password=a82b19856a46661394e9593c2db45592&encryptKey=X0B66J2H0T&type=Encode";


                    const cookiepwdCreateAsync=Meteor.wrapAsync(HTTP.get);

                    var cookiepwd=cookiepwdCreateAsync(cookieurl);
                    r.Pwd=cookiepwd.content;

                }
            }
            catch (err) {
                if (err.error === 'soap-creation') {
                    console.log('SOAP Client creation failed');
                }
                else if (err.error === 'soap-method') {
                    console.log('SOAP Method call failed');
                }
                r="";

            }
            return r;



        }
    }
});

