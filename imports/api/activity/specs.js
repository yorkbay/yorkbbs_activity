import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

class SpecCollection extends Mongo.Collection {
}

export const ActivityImageSpec = new SpecCollection('activity.image.specs');

// Deny all client-side updates since we will be using methods to manage this collection
const deny = {
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
};

ActivityImageSpec.deny(deny);

// image spec
ActivityImageSpec.schema = new SimpleSchema({
    ri: {
        type: Uint8Array,
        label: "ri"
    }
});

ActivityImageSpec.attachSchema(ActivityImageSpec.schema);



