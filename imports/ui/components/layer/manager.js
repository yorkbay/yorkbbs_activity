/**
 * Created by jack on 5/23/17.
 */
import './manager.html';

import {insert} from '../../../api/manager/methods';

Template.admin_manager_layer.events({
    "click .layer-yes":function (event,instance) {
        var manager={
            "uname":$("#uname").val(),
            "pwd":$("#pwd").val(),
            "st":"normal"
        }
        return insert.call(manager);
    }
});