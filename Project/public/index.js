let socket = io();
let restaurantArr = [];

socket.on("loginCheck", loginCheck);
function loginCheck(data) {
    if (data.username != null) {
        document.getElementById("myForm").style.display = "none";
        let button = document.getElementById("open-button");
        button.innerHTML = data.username;
        button.disabled = true;
    } else {
        document.getElementById("loginFailed").innerHTML = "Kirjautuminen epäonnistui"
    }
}

socket.on("success", success)
function success(d) {
    if (d == "success") {
        document.getElementById("success").innerHTML = "Ravintola lisätty tietokantaan onnistuneesti!";
    } else {
        document.getElementById("success").innerHTML = "Ravintola ei lisätty!";
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


let search = document.getElementById('searchfield');
search.addEventListener('keyup', handleSearch);

fetch("/restaurants")
    .then(r => r.json())
    .then(function (d) {
        handleRestaurants(d);
    });



function handleRestaurants(d) {
    restaurantArr = d;
    let rowDivArr = [];
    let rowDiv;
    for (let i = 0; i < d.length; i++) {

        let div = document.createElement('div')

        div.className = "restaurant_listing"
        let name = document.createElement('div')
        name.className = "restaurant_listing_name"
        let desc = document.createElement('div')
        desc.className = "restaurant_listing_desc"
        let zip = document.createElement('div')
        let address = document.createElement('div')
        let id = document.createElement('div');
        let opening_hours = document.createElement('div');
        let image = document.createElement('img');
        image.className = "restaurant_image";

        opening_hours.id = d[i].id + "_hours"
        opening_hours.innerHTML = 'elo pl'
        name.innerHTML = d[i].restaurant_name;
        desc.innerHTML = d[i].restaurant_desc;
        zip.innerHTML = d[i].zipcode;
        address.innerHTML = d[i].restaurant_address;
        id.innerHTML = d[i].id;
        id.className = "hidden";
        id.id = i + "_hiddenid";
        div.append(image, name, desc, address, id, opening_hours);

        if (i % 4 == 0 || i == 0) {
            console.log(i + "creating");
            rowDiv = document.createElement('div');
            document.getElementById('frontpage_listings').appendChild(rowDiv);
            rowDivArr[Math.floor(i / 4)] = rowDiv;

        }
        rowDiv.appendChild(div);
        //document.getElementById('frontpage_listings').appendChild(div);
    }
    let images = document.getElementsByClassName('restaurant_image');

    for (let i = 0; i < images.length; i++) {
        images[i].src = "https://picsum.photos/280/140?random=" + i;
    }


    for (let i = 0; i < rowDivArr.length; i++) {
        document.getElementById('frontpage_listings').appendChild(rowDivArr[i]);
        rowDivArr[i].className = 'restaurant_listing_row';
    }

    var classname = document.getElementsByClassName("restaurant_listing");

    for (var i = 0; i < d.length; i++) {
        document.getElementById(d[i].id + "_hours").innerHTML = checkIfOpen(d[i]);
        classname[i].addEventListener('click', function (e) {
            location.href = "/restaurant?id=" + this.getElementsByClassName("hidden")[0].textContent;
        });
    }

}


function handleSearch() {
    let str = document.getElementById('searchfield').value;
    let datalist = document.getElementById("results");

    let results = [];
    while (datalist.firstChild) {
        datalist.removeChild(datalist.firstChild)
    }
    for (let i = 0; i < restaurantArr.length; i++) {
        if (_isContains(restaurantArr[i], str)) {
            results.push(restaurantArr[i]);

        }
    }
    for (let j = 0; j < results.length; j++) {
        console.log(results)
        let r = results[j].restaurant_name + ", " + results[j].restaurant_address;
        let o = document.createElement("option");
        o.setAttribute("value", r)
        datalist.appendChild(o);
    }


}

function _isContains(json, value) {
    //console.log(json);
    let contains = false;
    //let obj = JSON.parse(json);
    let values = Object.values(json);
    for (let i = 0; i < values.length; i++) {
        if (typeof values[i] == 'string') {
            let str = values[i].toLowerCase();
            values[i] = str;

            if (values[i].includes(value)) {
                return true;
            }
        }
    }
    return false;
}


function checkIfOpen(restaurant) {
    let weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let date = new Date();
    let weekDay = date.getDay();
    elementString = restaurant.id + "_hours";

    let element = document.getElementById(elementString);
    let str = restaurant[weekDays[weekDay]].split("-");

    //if (str.length < 3) {

    if (str[1] == (date.getHours() - 1) * 100) {
        element.style.color = 'yellow';
        return 'sulkeutuu pian';
    } else if (str[1] >= date.getHours() * 100 && str[0] <= date.getHours() * 100) {
        element.style.color = 'green';
        return 'auki';
    } else {
        element.style.color = 'red';
        return 'kiinni';
    }
    //}
}

socket.on("updateSigninStatus", updateSigninStatus);
function updateSigninStatus(isSignedIn) {
    console.log("updatesigninstatus")
    console.log(isSignedIn)
    if (isSignedIn) {
        let firstLetter = isSignedIn.profile.given_name.charAt(0);
        console.log(isSignedIn.profile)
        document.getElementById("loggedUser").innerHTML = firstLetter;
        document.getElementById("login").innerHTML = "Sign out";
    } else {
        document.getElementById("login").innerHTML = "Sign in";
    }
}

let authDiv = document.getElementById("authDiv");
function showAuth(){
    let person = window.prompt("AA")

}
