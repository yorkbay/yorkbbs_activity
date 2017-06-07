/**
 * Created by shunxiangchen on 5/12/17.
 */
import './search.html';
import {Tag} from '../../../api/tag/tag.js';
import { tagnum } from '../../../api/activity/methods.js';

Template.search_left.onCreated(function(){
    const instance = this;

    //https://themeteorchef.com/tutorials/simple-search
    instance.autorun(function () {
        //instance.subscribe('activitiestags');
        instance.subscribe('tagslist');
    });


});

Template.search_left.helpers({
    'tags':function () {
        return Tag.find({});
    }
});