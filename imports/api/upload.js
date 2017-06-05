/**
 * Created by jack on 6/4/17.
 */
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    //https://github.com/devonbarrett/meteor-dropzone
    //https://github.com/tomitrescak/meteor-uploads
    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        checkCreateDirectories: true,
        uploadUrl: '/upload/',
        getFileName: function(file, formData) {
            return new Date().getTime() + '-' + Math.floor((Math.random() * 10000) + 1) + '-' + file.name;
        }
    });
});

