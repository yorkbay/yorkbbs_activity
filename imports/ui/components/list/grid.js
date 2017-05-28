/**
 * Created by shunxiangchen on 5/12/17.
 */
import './grid.html';

import './grid_item.js';

Template.grid.onRendered(function gridOnRendered() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: 30
    });
});