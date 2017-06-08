/**
 * Created by shunxiangchen on 5/12/17.
 */
import './grid.html';

import './grid_item.js';



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
        resizeReInit:true,
        paginationClickable: true,
        spaceBetween: 30,
    });


});