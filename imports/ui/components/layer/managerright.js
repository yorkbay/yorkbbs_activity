/**
 * Created by jack on 5/23/17.
 */
import './managerright.html';
import {managerModifyrole} from '../../../api/manager/methods.js';

Template.admin_manager_right_layer.events({
    "click .layer-yes":function (event,instance) {
        var manager={
            "_id":$("#managerid").val(),
            "role":$("#hdnrole").val()
        }
        managerModifyrole.call(manager,function (err,result) {
            if(result){
                $('.J-authority-pop').hide();
            }
        });

    },
    'click .layer-close':function (event,instance) {
        $('.J-authority-pop').hide();
    },
    'change .role':function (event,instance) {
        let ischeck=event.target.checked;
        let roles=$("#hdnrole").val();
        let chooserole=event.target.value+",";
        if(ischeck){
            if(roles.indexOf(chooserole)<0){
                roles=roles+chooserole;
            }
        }else{
            roles=roles.replace(chooserole,"");
        }
        $("#hdnrole").val(roles);
    }
});

Template.admin_manager_right_layer.helpers({
    "display_role":function (role,roles) {
        if(!roles)return "";
        if(roles.indexOf(role)<0){
            return "";
        }else {
            return "checked";
        }
    }
});