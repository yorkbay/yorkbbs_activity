import {Picker} from 'meteor/meteorhacks:picker';
import {Mongo} from 'meteor/mongo';
import {ActivityImages} from '../../api/activity/image.js';


Picker.route('/images/activity/:_id', function (params, req, res, next) {

    const {collection, ctype, _id} = params;

    const size = "ri";

    const media = ActivityImages.findOne({_id});

    if (media) {
        // http://en.wikipedia.org/wiki/MIME#Content-Disposition
        // headers['Content-Disposition'] = 'attachment; filename=' + media.sg;
        // sent as binary data
        const spec = media.spec();
        const buffer = spec[size] ? spec[size] : spec.ri;

        const headers = {
            'Content-Length': buffer.length
        };

        // MIME type
        if (media.mime) {
            headers['Content-Type'] = media.mime;
        }

        // sent as binary data
        res.writeHead(200, headers);
        res.end(Buffer.from(buffer, 'binary'));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }

});

