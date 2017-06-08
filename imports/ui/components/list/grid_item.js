/**
 * Created by shunxiangchen on 5/12/17.
 */
import './grid_item.html';
import {usrCenterInsert} from '../../../api/usrcenter/methods.js'


Template.grid_item.events({
    "click .fav"(event, instance) {
        console.log(doc);
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