
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
port = process.env.PORT || 3000;

const path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router();
const mysql = require('mysql');
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'restaurant_db',
  //port: '3308'

}); 
let counter = 0

mc.connect();

let server = app.listen(port);
app.use(express.static('public'));
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('A user connected');
  counter++;
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

app.get('/restaurants', sendRestaurants);

app.get('/restaurant',function(req,res){
  res.sendFile(path.join(__dirname+'/restaurant.html'));
});

app.use('/js', express.static(__dirname + 'restaurant.js'));


app.post('/addRestaurant', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
    id: null,
     restaurant_name:req.body.name,
     restaurant_address: req.body.address,
     zipcode: req.body.zip,
     city: req.body.city,
     link: req.body.site,
     restaurant_desc: req.body.desc,
     rating: null,
     monday: req.body.mon,
     tuesday: req.body.tue,
     wednesday: req.body.wed,
     thursday: req.body.thur,
     friday: req.body.fri,
     saturday: req.body.sat,
     sunday: req.body.sun
  };

  let q = "select restaurant_name, restaurant_address from restaurants where restaurant_name='" + response.restaurant_name + "' AND  restaurant_address= '" + response.restaurant_address +"'" ;
  mc.query(q, function (err, result) {
    if (err) throw err;
    if(result.length == 0){
      let sql = "INSERT INTO restaurants set ?";
      mc.query(sql, response, function (err, result) {
        if (err) throw err;
        if(result.affectedRows > 0){
          io.emit("success", "success")
        }
      });
    }else{
      io.emit("success", "no success")
    }
  })

})


function sendRestaurants(req, res) {
  let query = "select * from restaurants"
  mc.query(query, function (err, result) {
    if (err) {
      console.log("error ", err);
    }
    else {
      res.send(result)
    }
  })
}

app.delete("/restaurant/:id", function(req,res){
  let query = "delete from restaurants where id=" + req.params.id;
  mc.query(query, function (err, result) {
    if (err) {
      //console.log("error ", err);
    }
    else {
      console.log(result);
      res.send(result);
    }
  })
})

app.get("/restaurant/:id", function (req, res) {
  console.log(req.params.id);
  let query = "select * from restaurants where id=" + req.params.id;
  mc.query(query, function (err, result) {
    if (err) {
      //console.log("error ", err);
    }
    else {
      console.log(result);
      res.send(result);
    }
  })
})

app.get('/info', (req, res) => {
  let query = "select * from restaurants"
  mc.query(query, function (err, result) {
    if (err) {
      console.log("error ", err);
    }
    else {
      const info = {
        content: 'Restaurant has information for '+result.length+ ' restaurants',
        date: new Date(),
      }
      res.send(info.content +'<br>'+ info.date)
    }
  })

})

app.get('/ratings', sendRatings);

function sendRatings(req, res) {
  let query = "select stars,restaurant_id from reviews"
  mc.query(query, function (err, result) {
    if (err) {
      console.log("error ", err);
    }
    else {
      let objs = [];
      console.log(result[0].stars);
      console.log(result);
      let ratings = [];
      for (let i = 0; i < result.length; i++) {
        objs.push({ id: result[i].restaurant_id, rating: result[i].stars });
      }
      console.log(objs);

    }
  })
}