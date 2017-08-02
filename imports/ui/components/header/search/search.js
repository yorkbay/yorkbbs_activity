/**
 * Created by shunxiangchen on 5/12/17.
 */
import "./search.html";


Template.search_top.events({
    "click #myrelease"(event, instance) {

        var user = Session.get("usr");
        if (user && user.Authenticated) {
            FlowRouter.go('/usr');
        } else {
            Bert.alert('请先登录。', 'danger', "growl-top-right");
            return;
        }
    },
    "click #reltopic": function (event, instance) {
        var user = Session.get("usr");
        if (user && user.Authenticated) {
            FlowRouter.go('/post');
        } else {
            Bert.alert('请先登录。', 'danger', "growl-top-right");
            return;
        }
    }
});