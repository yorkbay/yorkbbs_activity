import './body.html';

import '../../components/header/header.js';
import '../../components/footer/footer.js';

//xx月xx日
Template.registerHelper('formatDate_MD', function(date) {
    return moment(date).format("MM月DD日");
});

//xx月xx日
Template.registerHelper('formatDate_HS', function(date) {
    return moment(date).format("H:SS");
});