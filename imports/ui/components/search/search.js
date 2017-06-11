/**
 * Created by shunxiangchen on 5/12/17.
 */
import './search.html';
import {Tag} from '../../../api/tag/tag.js';



Template.search_left.onCreated(function(){
    const instance = this;

    instance.autorun(function () {

    });




});

Template.search_left.helpers({
    "display_num":function (tg,facets) {
        let count=0;
        if(facets) {
            facets.forEach(function (t) {
                let tag = t._id;
                if (tg === tag) {
                    count = t.count;
                }
            });
        }
        return count;
    }

});