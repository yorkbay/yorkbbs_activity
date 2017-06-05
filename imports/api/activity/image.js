import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ActivityImageSpec} from './specs.js';

class ImagesCollection extends Mongo.Collection {
}

export const ActivityImages = new ImagesCollection('activity.images');



// Deny all client-side updates since we will be using methods to manage this collection
ActivityImages.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

ActivityImages.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    mime: {
        type: String,
        label: "MIME"
    },
    _spec:{
        type:String,
        label: "spec"
    }
});

ActivityImages.helpers({
    spec() {
        return ActivityImageSpec.findOne({_id: this._spec});
    },
});

ActivityImages.attachSchema(ActivityImages.schema);