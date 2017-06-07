/**
 * Created by jack on 5/23/17.
 */
import './managerstate.html';
import {managerModifyst} from '../../../api/manager/methods.js';


Template.admin_manager_state_layer.helpers({
    "display_st_true":function (st) {
        return st==="normal"?"checked":"";
    },
    "display_st_false":function (st) {
        return st==="forbidden"?"checked":"";
    }
});

Template.admin_manager_state_layer.events({
    "click .layer-yes":function (event,instance) {

        var manager={
            "_id":$("#managerid").val(),
            "st":$("[name='st']:checked").val()=="normal"?"normal":"forbidden"
        }
        managerModifyst.call(manager,function (err,result) {
            if(result){
                $('.J-authority-pop').hide();
            }
        });

    },
    'click .layer-close':function (event,instance) {
        $('.J-authority-pop').hide();
    }
});