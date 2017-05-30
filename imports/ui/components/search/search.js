/**
 * Created by shunxiangchen on 5/12/17.
 */
import './search.html';

import { tagnum } from '../../../api/activity/methods.js';

Template.App_home.onCreated(function(){
    const instance = this;



    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        instance.subscribe('activitiestags');
    });


});

Template.search_left.helpers({
    tags:function () {
        return "";
    }
});