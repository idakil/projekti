let socket = io();
let restaurantArr = [];






fetch("/restaurants")
    .then(r => r.json())
    .then(function (d) {
        handleRestaurants(d);
    });

function handleRestaurants(d) {
    console.log(d);
}

/*fetch("/ratings")
    .then(r => r.json())
    .then(function (d) {
        handleReviews(d);
    });



socket.on("openPlease", handle)
function handle(d) {
    console.log("aaaaa")
    console.log(d)
}*/

function handleReviews(d) {
    //console.log(d);
}

