/**
 * Created by jack on 5/17/17.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import './release.html';

import '../../components/release/mobile_menu.js';
import {Activity} from '../../../api/activity/activity.js'



Template.release.events({
    "click #sub":()=>{
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        var doc={
                "ti":$("#ti").val()
            }
        // Insert a task into the collection
        Activity.insert(doc,{validate: false});

        FlowRouter.go('/');
    }
});