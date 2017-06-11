import './home.html';

import '../../components/header/header.js';
import '../../components/footer/footer.js';
import '../../components/layer/login.js';
import '../../components/layer/share.js';




//xx月xx日
Template.registerHelper('formatDate_MD', function(date) {
    if(!date)return "";
    return moment(date).format("MM月DD日");
});

//xx月xx日
Template.registerHelper('formatDate_HS', function(date) {
    if(!date)return "";
    return moment(date).format("H:mm");
});

//xx月xx日
Template.registerHelper('formatDate_YMDHS', function(date) {
    if(!date)return "";
    return moment(date).format("YYYY-MM-DD HH:mm");
});

//xx月xx日
Template.registerHelper('formatDate_YMD', function(date) {
    if(!date)return "";
    return moment(date).format("YYYY-MM-DD");
});