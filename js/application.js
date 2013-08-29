$(document).ready(function(){

            var map;
            var geocoder;
            var markers = [];
            var myPosition = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

            $('#find-trees-address').click(function(){
              $('.input-append').toggle();
            })

            function initialize() {
                //enabling the geocoding of address

                geocoder = new google.maps.Geocoder();

                /* Setting up Options for the map */
              
                var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(38.898748,-77.037684),
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              /* Creating a variable to put the map in the map-canvas ID, with the options declared above */

              map = new google.maps.Map(document.getElementById("map-canvas"),
                  mapOptions);

               /* Creating new map layer for the Fusion Table data */

               var layer = new google.maps.FusionTablesLayer({
                  query: {
                     select: '\'geometry\'',
                    from: '1pjvEKEy9c7OaQ7L7oSRz3nkHNiMCXY0k89GSAus'
                  },
                  styleId: 2,
                  templateId: 2,
                  map: map
                });

              /* Placing the layer on the map */

              layer.setMap(map);

            }

           // Try HTML5 geolocation
              if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  pos = new google.maps.LatLng(position.coords.latitude,
                                                   position.coords.longitude);

                  function addMarker(){
                    var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title:"My location",
                    });
                    markers.push(marker);
                  map.setCenter(pos);
                  map.setZoom(18);
                  }

                  // Sets the map on all markers in the array.
                  function setAllMap(map) {
                    for (var i = 0; i < markers.length; i++) {
                      markers[i].setMap(map);
                    }
                  }

                // Checks to see if any markers are on the map. If they are, it clears them out of the array.
                if (markers.length !== 0) {
                    setAllMap(null);
                    markers =[];
                };
                  return addMarker();
            
                }, function() {
                  handleNoGeolocation(true);
                });

              } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
              };

              function handleNoGeolocation(errorFlag) {
              if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
              } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
              }

              var options = {
                map: map,
                position: new google.maps.LatLng(38.8900, -77.0300),
                content: content
              };

              var infowindow = new google.maps.InfoWindow(options);
              map.setCenter(options.position);
            }

         // Geocoding address

         function geoCode() {

          var address = document.getElementById('address').value;
          geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
           map.setCenter(results[0].geometry.location);
           map.setZoom(18);
      

          if (!marker) {
                    var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title:"My location",
                    });
                  }

                  else {
                
                  marker = google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title:"My location",
                 });
                }; //end marker conditional

            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });

        };




     /* Once the page has loaded, run the function to put a map on the page */

            google.maps.event.addDomListener(window, 'load', initialize);


      }); //end ready