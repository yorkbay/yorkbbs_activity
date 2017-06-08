/**
 * Created by shunxiangchen on 5/12/17.
 */
import './leftmap.html';

Template.leftmap.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
});

Template.leftmap.helpers({
    "display_geo":function (items) {
        let geos=[];
        items.forEach(function (item) {
            var markList={
                position: {lat: item.lat, lng: item.lng},
                playingImg: item.logo,
                playingName: item.ti
            }
            geos.push(item);
        });
        $("#hdngeo").val(geos);
    },
    exampleMapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(31, 41),
                zoom: 4
            };
        }
    }

});

