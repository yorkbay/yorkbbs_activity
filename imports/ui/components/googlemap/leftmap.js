/**
 * Created by shunxiangchen on 5/12/17.
 */
import './leftmap.html';

Template.leftmap.onCreated(function() {

    /*
    GoogleMaps.ready('leftmap', function(map) {
        console.log(map.options.items.fetch());
        map.options.items.forEach(function (item) {
            //console.log(item.isonline+"----"+item.lat+"-----"+item.lng);
            if(!item.isonline && item.lat && item.lng) {
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(item.lat, item.lng),
                    map: map.instance
                });
            }
        });

    });
    */
});

Template.leftmap.helpers({
    "display_markers":function (items) {
        //console.log(items.fetch());
        /*
        GoogleMaps.ready('leftmap', function(map) {
            items.forEach(function (item) {
                if(!item.isonline) {
                    let marker = new google.maps.Marker({
                        setMap: map,
                        position: new google.maps.LatLng(item.lat, item.lng),
                    });

                    let c='<div class="map-info-content">'+
                        '<div style="float: left; width: 100px; margin-right: 10px;">'+
                        '<img style="max-width: 100%" src="'+item.logo+'" alt="">'+
                        '</div>'+
                        '<div style="overflow: hidden;">'+item.ti+'</div>'+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: c
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                }
            });

        });
        */

        if(GoogleMaps.maps.leftmap){
            const map=GoogleMaps.maps.leftmap.instance;

            items.forEach(function (item) {
                if(!item.isonline) {
                    let marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(item.lat, item.lng),
                    });

                    let c='<div class="map-info-content">'+
                        '<div style="float: left; width: 100px; margin-right: 10px;">'+
                        '<img style="max-width: 100%" src="'+item.logo+'" alt="">'+
                        '</div>'+
                        '<div style="overflow: hidden;">'+item.ti+'</div>'+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: c
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                }
            });
        }

    },
    mapOptions: function(items) {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(43.7182197, -79.4482687),
                zoom: 8,
                items:items
            };

        }
    }

});

Template.leftmap.onRendered(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyD0uzSeEzo4VtiYz9nIxFsRN2AWLa6s-vA', libraries: 'geometry,places' });
});

