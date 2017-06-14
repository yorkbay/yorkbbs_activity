/**
 * Created by shunxiangchen on 5/12/17.
 */
import './recommend_item.html'
import {usrCenterInsert} from '../../../api/usrcenter/methods.js'


Template.recommend_item.events({
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
        usrCenterInsert.call(doc,function (err,result) {
            if(result=="1"){
                Bert.alert( '收藏成功', 'success',"growl-top-right");
            }else{
                Bert.alert( '取消收藏', 'success',"growl-top-right");
            }

        });
    },
});