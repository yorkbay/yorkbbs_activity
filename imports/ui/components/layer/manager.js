/**
 * Created by jack on 5/23/17.
 */
import './manager.html';

import {insert} from '../../../api/manager/methods';

Template.admin_manager_layer.events({
    "click .layer-yes":function (event,instance) {
       let uname=$("#uname").val();
        let pwd=$("#pwd").val();
        if(!uname || !pwd)return;
        var manager={
            "uname":$("#uname").val(),
            "pwd":$("#pwd").val(),
            "st":"normal",
            "dt":new Date()
        }
        insert.call(manager,function (err,result) {
            if(result){
                $('.J-authority-pop').hide();
            }
        });

    },
    'click .layer-close':function (event,instance) {
        $('.J-authority-pop').hide();
    }
});