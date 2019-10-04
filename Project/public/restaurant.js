console.log("helloo");

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
}