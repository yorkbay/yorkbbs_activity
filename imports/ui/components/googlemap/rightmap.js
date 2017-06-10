/**
 * Created by shunxiangchen on 5/12/17.
 */
import './rightmap.html';

Template.rightmap.onCreated(function() {

    GoogleMaps.ready('rightmap', function(map) {
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});

Template.rightmap.helpers({
    mapOptions: function(item) {
        if (GoogleMaps.loaded() && item) {
            return {
                center: new google.maps.LatLng(parseFloat(item.lat),parseFloat(item.lng)),
                zoom: 17,
            };
        }
    }

});

Template.rightmap.onRendered(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyD0uzSeEzo4VtiYz9nIxFsRN2AWLa6s-vA', libraries: 'geometry,places' });
});
