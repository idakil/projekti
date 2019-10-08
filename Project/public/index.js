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
    for(let i = 0; i < d.length; i++) {
        restaurants[i] = d[i];
        
    }
    for (let i = 0; i < d.length; i++) {
        var div = document.createElement('div')
        div.className="restaurant_listing"
        var name = document.createElement('div')
        name.className = "restaurant_listing_name"
        var desc = document.createElement('div')
        desc.className = "restaurant.listing.desc"
        var zip = document.createElement('div')
        var address = document.createElement('div')
        var id = document.createElement('div')
        name.innerHTML = d[i].restaurant_name;
        desc.innerHTML = d[i].restaurant_desc;
        zip.innerHTML = d[i].zipcode;
        address.innerHTML = d[i].restaurant_address;
        id.innerHTML = d[i].id;
        id.className="hidden";
        id.id = i+"_hiddenid";
        div.append(name, desc, address, id)
        document.body.appendChild(div)
    }

    var classname = document.getElementsByClassName("restaurant_listing");
    
    for (var i = 0; i < d.length; i++) {
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



/*
<div class="restaurant_listing">
                <div class="restaurant_listing_name" id="1_name">MCDONALDS</div>
                <div class="restaurant_listing_desc" id="1_desc">HEALTHY FOOD</div>
                <div class="restaurant_listing_stars" id="1_stars">5 THÄTEÄ</div>
                <div class="restaurant_listing_open" id="1_open">AUKI</div>
                <div class="hidden" id="1_hiddenid"></div>
            </div>
            <div class="restaurant_listing">
                <div class="restaurant_listing_name" id="2_name">MCDONALDS</div>
                <div class="restaurant_listing_desc" id="2_desc">HEALTHY FOOD</div>
                <div class="restaurant_listing_stars" id="2_stars">5 THÄTEÄ</div>
                <div class="restaurant_listing_open" id="2_open">AUKI</div>
                <div class="hidden" id="2_hiddenid"></div>
            </div>
            <div class="restaurant_listing">
                <div class="restaurant_listing_name" id="3_name">MCDONALDS</div>
                <div class="restaurant_listing_desc" id="3_desc">HEALTHY FOOD</div>
                <div class="restaurant_listing_stars" id="3_stars">5 THÄTEÄ</div>
                <div class="restaurant_listing_open" id="3_open">AUKI</div>
                <div class="hidden" id="3_hiddenid"></div>
            </div>
            <div class="restaurant_listing">
                <div class="restaurant_listing_name" id="4_name">MCDONALDS</div>
                <div class="restaurant_listing_desc" id="4_desc">HEALTHY FOOD</div>
                <div class="restaurant_listing_stars" id="4_stars">5 THÄTEÄ</div>
                <div class="restaurant_listing_open" id="4_open">AUKI</div>
                <div class="hidden" id="4_hiddenid"></div>
            </div>
            */