/**
 * Created by shunxiangchen on 5/12/17.
 */
import './comment.html';
import { Session } from 'meteor/session';
import {LogInsert} from '../../../api/log/methods.js';
import {Comment} from '../../../api/comment/comment.js';



Template.comment.helpers({
    "showavatar":function (avatar) {
        return avatar.replace("/media","/media/c3");
    }
});