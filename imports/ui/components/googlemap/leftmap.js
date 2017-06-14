/**
 * Created by shunxiangchen on 5/12/17.
 */
import './leftmap.html';
let markers=[];

Template.leftmap.onCreated(function() {

    /*
    GoogleMaps.ready('leftmap', function(map) {

        //clearMarkers();

        $("[name='hdnlatlng']").each(function(){
            let item=$(this).val();
            let i=item.split('|');
            let lat=i[0],lng=i[1],logo=i[2].replace("../",""),ti=i[3];
            //console.log(lat+"----"+lng+"----"+logo+"---"+ti);

            let marker = new google.maps.Marker({
                setMap: map,
                position: new google.maps.LatLng(lat, lng),
            });

            let c='<div class="map-info-content">'+
                '<div style="float: left; width: 100px; margin-right: 10px;">'+
                '<img style="max-width: 100%" src="'+logo+'" alt="">'+
                '</div>'+
                '<div style="overflow: hidden;">'+ti+'</div>'+
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: c
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
            markers.push(marker)
        });

    });
    */
});

Template.leftmap.helpers({
    "display_markers":function (items) {
        if(GoogleMaps.maps.leftmap){
            const map=GoogleMaps.maps.leftmap.instance;

            clearMarkers();
            items.forEach(function (item) {
                if(!item.isonline) {
                    let marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(item.lat, item.lng),
                    });

                    let c='<div class="map-info-content"><a href="/activity/'+item._id+'">'+
                        '<div style="float: left; width: 100px; margin-right: 10px;">'+
                        '<img style="max-width: 100%" src="'+item.logo+'" alt="">'+
                        '</div>'+
                        '<div style="overflow: hidden;">'+item.ti+'</div></a>'+
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
                zoom: 11,
                items:items
            };

        }
    }

});

Template.leftmap.onRendered(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyD0uzSeEzo4VtiYz9nIxFsRN2AWLa6s-vA', libraries: 'geometry,places' });
});


function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}