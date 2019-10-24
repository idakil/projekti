let socket = io();

let restaurant;

socket.on("reviewSuccess", reviewSuccess)

function reviewSuccess (data) {
    if(data === "success"){
        document.getElementById("saveButton").innerHTML = "Success"
    }
}

var myRating = raterJs({
    element: document.querySelector("#rater"),
    max: 5,
    starSize: 25,
    rateCallback: function rateCallback(rating, done) {
        this.setRating(rating);
        done();
    }
});

let restaurantRating = raterJs({
    element: document.querySelector("#rater2"),
    max: 5,
    readOnly: true,
    starSize: 16,
})

function sendRating(){
    let starRating = myRating.getRating();
    let reviewText = document.getElementById("reviewField").value;
    let user = document.getElementById("userField").value;
    reviewObject = {
        id: null,
        restaurant_id: restaurant.id,
        stars: starRating,
        review: reviewText,
        userName: user
    }
    socket.emit("review", reviewObject)
    
}

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
getRatings(dynamicContent);

function getRestaurant(d) {
    var url = '/restaurant/' + d;
    fetch(url)
        .then(r => r.json())
        .then(function (data) {
            fillRestaurantInfo(data);
        });

    
}

function getRatings(d) {
    var url = '/api/reviews/restaurant_id=' + d;
    fetch(url)
        .then(r => r.json())
        .then(function (data) {
            console.log(data)
            fillRatings(data);
        });

}

function fillRatings(d) {
    let parent = document.getElementById("reviews");
    for (let i = 0; i < d.length; i++) {
        let review = document.createElement('div');
        review.className = "oneReview";
        let name = document.createElement('div');
        name.className = "username";
        name.innerHTML = d[i].userName;
        let text = document.createElement('div');
        let stars = document.createElement('div');
        stars.className = 'stars';
        let reviewRating = raterJs({
            element: stars,
            max: 5,
            readOnly: true,
            starSize: 16,
        })
        reviewRating.setRating(d[i].stars);

        

        text.className = 'text';
        text.innerHTML = d[i].review;
        review.append(name, text, stars);
        parent.append(review);
    }
}

function fillRestaurantInfo(d) {
    restaurant = d[0];
    document.getElementById("restaurantName").innerHTML = restaurant.restaurant_name;
    document.getElementById("desc").innerHTML = restaurant.restaurant_desc;
    document.getElementById("link").href = restaurant.link;
    document.getElementById("link").innerHTML = restaurant.link;

    addOpeningHours(restaurant)
    addContactInfo(restaurant)
    if (restaurant.rating != null) {

        restaurantRating.setRating(restaurant.rating);
    }
    loadMap(restaurant);
}

function addContactInfo(restaurant){
    document.getElementById("contactInfo").innerHTML = restaurant.restaurant_address;

}

function addOpeningHours(restaurant){
    let opening_hours  = document.getElementsByClassName("opening");
    opening_hours[0].innerHTML = restaurant.monday;
    opening_hours[1].innerHTML = restaurant.tuesday;
    opening_hours[2].innerHTML = restaurant.wednesday;
    opening_hours[3].innerHTML = restaurant.thursday;
    opening_hours[4].innerHTML = restaurant.friday;
    opening_hours[5].innerHTML = restaurant.saturday;
    opening_hours[6].innerHTML = restaurant.sunday;
    
    for (let i = 0; i < opening_hours.length; i++) {
        if(opening_hours[i].innerHTML == ""){
            opening_hours[i].innerHTML = "Suljettu"
        }
    }
}

function loadMap(restaurant) {
    mapboxgl.accessToken = "pk.eyJ1IjoiaWRha2lsIiwiYSI6ImNrMGY1bzY4ZzBmdnEzZ21wYTNobzhyZTMifQ._VUUN_v2-EQlsPAwsaQUOA"
    let nameURI = encodeURI(restaurant.restaurant_address)
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + nameURI + ".json?access_token=" + mapboxgl.accessToken + "&cachebuster=1570368776986&autocomplete=true&country=fi")
        .then(r => r.json())
        .then(function (res) {
            res.features.forEach(element => {
                if (element.context[0].text === restaurant.zipcode) {
                    showMap(element.center)
                }
            });
        });
}

function showMap(coord) {
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coord, // starting position
        zoom: 15,
        zoomControl: true
    });

    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    map.addControl(new mapboxgl.NavigationControl());

    let myLatlng = new mapboxgl.LngLat(coord[0], coord[1]);
    let marker = new mapboxgl.Marker()
        .setLngLat(myLatlng)
        .addTo(map);
}

function deleteRestaurant() {
    if (restaurant !== undefined) {
        var confirmation = confirm("Oletko varma?")
        if (confirmation === true) {
            socket.emit("deleteRestaurant", restaurant)
            alert("Ravintola poistettu tietokannasta")
        }  
    }
    else {
        console.log('tyhjä')
    }
}



function showReviews () {

}
