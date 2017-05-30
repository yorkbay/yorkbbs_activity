/**
 * Created by jack on 5/29/17.
 */
import './usr_list_item.html';

/**
import {Activity} from '../../../api/activity/activity.js';


Template.usr_list_item.onCreated(function(){
    const instance = this;


    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {

        var id=$(".itemid").val();
        console.log(id);

    });


});

Template.usr_list_item.helpers({
    item:function () {
        var id=$(".itemid").val();
        console.log(id);
        return Activity.findOne({_id: id});
    },

});
 **/

import {usrCenterInsert} from '../../../api/usrcenter/methods.js'


Template.usr_list_item.events({
    "click .fav"(event, instance) {
        const usr=Session.get("usr");
        var id=$(event.currentTarget).attr("itemid");
        var doc= {
            "ty":"fav",
            "refid":id,
            "st":"normal",
            "meta":{
                "uid":usr.id,
                "usr":usr.uname
            }
        };
        usrCenterInsert.call(doc);
    },
});