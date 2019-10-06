let socket = io();
let restaurantArr = [];

socket.on("success", success)
function success(d) {
    if (d == "success") {
        document.getElementById("success").innerHTML = "Ravintola lisätty tietokantaan onnistuneesti!";
    } else {
        document.getElementById("success").innerHTML = "Ravintola ei lisätty!";
    }
}

fetch("/restaurants")
    .then(r => r.json())
    .then(function (d) {
        handleRestaurants(d);
    });

function handleRestaurants(d) {
    console.log(d);

    restaurants = [];
    for(let i = 0; i < 4; i++) {
        restaurants[i] = d[i];
    }

    for (let i = 1; i < 5; i++) {
        document.getElementById(i + "_name").innerHTML = d[i-1].restaurant_name;
        document.getElementById(i + "_desc").innerHTML = d[i-1].restaurant_desc;
        document.getElementById(i + "_stars").innerHTML = d[i-1].zipcode;
        document.getElementById(i + "_open").innerHTML = d[i-1].restaurant_address;
        document.getElementById(i + "_hiddenid").innerHTML = d[i-1].id;
    }

    var classname = document.getElementsByClassName("restaurant_listing");
    
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function(e) {
            location.href = "/restaurant?id="+this.getElementsByClassName("hidden")[0].textContent;
            console.log(this.getElementsByClassName("hidden")[0].textContent);
            
        });
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

