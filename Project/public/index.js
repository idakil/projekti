let socket = io();

let restaurantArr = [];


fetch("/restaurants")
    .then(r => r.json())
    .then(function(d) {
        handleRestaurants(d);
    });

function handleRestaurants(d) {
    console.log(d);
    for (let i = 0; i < d.length; i++) {
        restaurantArr.push(new Object());
        restaurantArr[i].name = d[i].restaurant_name;
    }
    console.log(restaurantArr);
}

fetch("/ratings")
    .then(r=>r.json())
    .then(function(d) {
        handleReviews(d);
    });


function handleReviews(d) {
    //console.log(d);
}

