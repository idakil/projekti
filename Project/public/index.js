let socket = io();
let restaurantArr = [];






fetch("/restaurants")
    .then(r => r.json())
    .then(function (d) {
        handleRestaurants(d);
    });

function handleRestaurants(d) {
    console.log(d);

    for (let i = 1; i < 5; i++) {
        document.getElementById(i + "_name").innerHTML = d[i-1].restaurant_name;
        document.getElementById(i + "_desc").innerHTML = d[i-1].restaurant_desc;
        document.getElementById(i + "_stars").innerHTML = d[i-1].thursday;
        document.getElementById(i + "_open").innerHTML = d[i-1].monday;
    }
}


function checkIfOpen(restaurant) {

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

