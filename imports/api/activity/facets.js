import {Mongo} from 'meteor/mongo';
import hash from 'object-hash'

class FacetsCollection extends Mongo.Collection {
}

// collection name defined in publication
export const Facets = new FacetsCollection('facets');

// Deny all client-side updates since we will be using methods to manage this collection
Facets.deny({
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


FacetsCollection.prototype.getToken = (params) => {
    return hash(params, { excludeValues: true });
};