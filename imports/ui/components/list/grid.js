/**
 * Created by shunxiangchen on 5/12/17.
 */
import './grid.html';

import './grid_item.js';
import {usrCenterInsert} from '../../../api/usrcenter/methods.js'



Template.grid.onCreated(function(){
    const instance = this;

    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {

    });


});

Template.grid.onRendered(function gridOnRendered() {
    var mySwiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        centeredSlides: false,
        updateOnImagesReady:true,
        autoResize:true,
        observer:true,
        resizeReInit:true,
        paginationClickable: true,
        spaceBetween: 30,
    });

});


Template.grid.events({
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
        Bert.alert( '收藏成功', 'success',"growl-top-right");
    },
});