/**
 * Created by shunxiangchen on 5/27/17.
 */
import './imgupload.html';

Template.imgupload.events({
    'dropped #dropzoneDiv': function(e,template){
        e.preventDefault();
        console.log("hurra");
        console.log(e.originalEvent.dataTransfer.files); // this will contain the list of files that were dropped
    }
});