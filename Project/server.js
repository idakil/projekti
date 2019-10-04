
const express = require('express'),
app = express(),
bodyParser = require('body-parser');
port = process.env.PORT || 3000;


const mysql = require('mysql');
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'restaurant_db',
  //port: '3308'
}); 
mc.connect();

let server = app.listen(port);
app.use(express.static('public'));
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('A user connected');
  socket.on('disconnect', function () {
      console.log('A user disconnected');
  });
});


app.get('/restaurants', sendRestaurants);
function sendRestaurants (req, res) {
  let query = "select * from restaurants inner join opening_hours on restaurants.id=opening_hours.restaurant_id"
  mc.query(query, function (err, result) {
      if (err){
          console.log("error ", err);
      }
      else {
          res.send(result)
      }
  })
}


app.get('/ratings', sendRatings);

function sendRatings (req, res) {
  let query = "select stars,restaurant_id from reviews"
  mc.query(query, function (err, result) {
      if (err){
          console.log("error ", err);
      }
      else {
        let objs = [];
        console.log(result[0].stars);
        console.log(result);
        let ratings = [];
        for (let i = 0;i < result.length; i++) {
            objs.push({id: result[i].restaurant_id, rating: result[i].stars});
        }
        console.log(objs);

      }
  })
}


