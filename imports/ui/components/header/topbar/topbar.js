/**
 * Created by shunxiangchen on 5/12/17.
 */
import './topbar.html';
import {userLogin} from '../../../../api/usrcenter/methods.js';

Template.topbar.events({
    "click #usrlogin"(event, instance) {

        var doc= {
            "uname":$("#uname").val(),
            "pwd":$("#pwd").val()
        };
        userLogin.call(doc,function (err,result) {
            if(err){
                Bert.alert( '用户名或密码错误。', 'danger',"growl-top-right");
                return;
            }
            console.log(result);
            if(result && result.Authenticated){
                Session.setPersistent("usr",result);

                var cookie={
                    userid:result.id,
                    password:result.Pwd,
                    t:1,
                    tpp:0,
                    ppp:0
                }
                Cookie.set('dnt', cookie, {
                    domain: 'yorkbbs.ca',
                    path: '/',
                    expires: 30
                });
            }else{
                Bert.alert( '用户名或密码错误。', 'danger',"growl-top-right");
                return;
            }
        });
    },
    "click #loginout":function (event,instance) {
        Session.setPersistent("usr",null);
        //window.location.href='http://passport.yorkbbs.ca/logout.aspx';
    }
});

Template.topbar.helpers({
    "user":function () {
        var user=Session.get("usr");
        if(user){
            return user;
        }
    },
    "checkuser":function () {
        var user=Session.get("usr");
        if(user && user.Authenticated){
            return true;
        }else {
            return false;
        }
    }

});