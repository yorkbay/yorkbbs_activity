/**
 * Created by jack on 6/4/17.
 */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import fs from 'fs';
import Fiber from 'fibers';
import { Activity } from '../../api/activity/activity.js';
import {ActivityImages} from '../../api/activity/image.js';
import {ActivityImageSpec} from '../../api/activity/specs.js';

import {ActivityImageSpecInsert,ActivityImageInsert} from '../../api/activity/methods.js';


Meteor.startup(() => {
    //https://github.com/devonbarrett/meteor-dropzone
    //https://github.com/tomitrescak/meteor-uploads

    UploadServer.init({
        tmpDir: '/tmp/.uploads/tmp',
        uploadDir:'/tmp/.uploads/',
        checkCreateDirectories: true,
        uploadUrl: '/upload/',
        getFileName: function(file, formData) {
            return new Date().getTime() + '-' + Math.floor((Math.random() * 10000) + 1) + '-' + file.name;
        },
        finished: function(fileInfo, formFields) {

            const imageId=Random.id();

            fileInfo.path="/images/activity/"+imageId;

            const filepath= '/tmp/.uploads/'+fileInfo.name;

            const fsCreateAsync=Meteor.wrapAsync(fs.readFile);

            const result=fsCreateAsync(filepath);

            const imagespec={
                ri:result
            }
            const _spec=ActivityImageSpecInsert.call(imagespec);

            const img={
                _id:imageId,
                mime:fileInfo.type,
                _spec
            }

            ActivityImageInsert.call(img);


        },
    });

});
