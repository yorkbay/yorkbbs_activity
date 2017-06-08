/**
 * Created by shunxiangchen on 5/12/17.
 */
import './list.html';

import './list_item.js';


Template.list.events({
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