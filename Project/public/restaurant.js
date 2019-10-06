
let restaurant;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName('id');
getRestaurant(dynamicContent);


function getRestaurant(d) {
    var url = '/restaurant/' + d;
    console.log(url);

    fetch(url)
        .then(r => r.json())
        .then(function (data) {
            fillRestaurantInfo(data);
        });
}

function fillRestaurantInfo(d) {
    document.getElementById("restaurantName").innerHTML = d[0].restaurant_name;
    restaurant = d[0];
    loadMap(restaurant)
}

function loadMap(restaurant) {
    mapboxgl.accessToken = "pk.eyJ1IjoiaWRha2lsIiwiYSI6ImNrMGY1bzY4ZzBmdnEzZ21wYTNobzhyZTMifQ._VUUN_v2-EQlsPAwsaQUOA";
    let nameURI = encodeURI(restaurant.restaurant_address)
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + nameURI + ".json?access_token=" + mapboxgl.accessToken + "&cachebuster=1570368776986&autocomplete=true&country=fi")
        .then(r => r.json())
        .then(function (res) {
            res.features.forEach(element => {
                console.log(element.context[0].text)
                if (element.context[0].text === restaurant.zipcode) {
                    showMap(element.center)
                }
            });
        });
}

function showMap(coord){
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coord, // starting position
        zoom: 15 // starting zoom
    });

    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    let myLatlng = new mapboxgl.LngLat(coord[0], coord[1]);
    let marker = new mapboxgl.Marker()
    .setLngLat(myLatlng)
    .addTo(map);
}

