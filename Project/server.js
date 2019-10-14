
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  auth = require('./auth');
port = process.env.PORT || 3000;
var session = require('express-session');
const cookieSession = require('cookie-session')
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

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = "KFODSDJjdijsij3jI98WRU83893"
const iv = crypto.randomBytes(16);

let server = app.listen(port);
app.use(express.static('public'));
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({
  name:'session',
  keys: ['key1', 'key2']
}))



auth(passport);
app.use(passport.initialize());


let io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('A user connected');
  socket.emit("updateSigninStatus", session.user)
  counter++;
  socket.on('review', reviewToDatabase)
  socket.on("deleteRestaurant", deleteRestaurant);
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

app.get('/restaurants', sendRestaurants);

app.get('/restaurant', function (req, res) {
  res.sendFile(path.join(__dirname + '/restaurant.html'));
});

app.use('/js', express.static(__dirname + 'restaurant.js'));

function calculateAverage(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].stars;
  }
  return sum / arr.length;
}

function updateRating(id, rating) {
  let data = [rating, id];
  let sql = "update restaurants set rating = ? where id = ?";
  mc.query(sql, data, function (err, result) {
    if (err) throw err;
    else {
      io.emit("reviewSuccess", "success")
    }
  })
}

function reviewToDatabase(data) {
  console.log(data)
  let sql = "INSERT INTO reviews set ?";
  mc.query(sql, data, function (err, result) {
    if (err) throw err;
    else {
      let sql = "select stars from reviews where restaurant_id = ?";
      mc.query(sql, data.restaurant_id, function (err, result) {
        if (err) throw err;
        else {
          let average = calculateAverage(JSON.parse(JSON.stringify(result)));
          updateRating(data.restaurant_id, average)
        }
      });
    }
  });
}

app.post('/addRestaurant', urlencodedParser, function (req, res) {

  response = {
    id: null,
    restaurant_name: req.body.name,
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

  let q = "select restaurant_name, restaurant_address from restaurants where restaurant_name='" + response.restaurant_name + "' AND  restaurant_address= '" + response.restaurant_address + "'";
  mc.query(q, function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      let sql = "INSERT INTO restaurants set ?";
      mc.query(sql, response, function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
          io.emit("success", "success")
        }
      });
    } else {
      io.emit("success", "no success")
    }
    res.send(response);
  })
})

app.put("/api/restaurant/:id", function (req, res) {
  response = {
    id: null,
    restaurant_name: req.body.name,
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

  let q = "update restaurants set ? where id = '" + req.params.id + "'";
  mc.query(q, response, function (err, result) {
    if (err) throw err;
    res.send(response)
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

app.delete("/api/restaurant/:id", function (req, res) {
  let s = deleteRestaurant(req.params, res);
  console.log(s)
  res.send(req.params.id + " poistettu")
})

function deleteRestaurant(req, res) {
  let query = "delete from restaurants where id=" + req.id;
  let success = true;
  mc.query(query, function (err, result) {
    if (err) {
      console.log(err)
      success = false;
    }
  })
  return success;
}



app.get("/restaurant/:id", function (req, res) {
  let query = "select * from restaurants where id=" + req.params.id;
  mc.query(query, function (err, result) {
    if (err) {
      //console.log("error ", err);
    }
    else {
      //console.log(result);
      res.send(result)
    }
  })
})

app.get("/api/restaurants/search/:searchBy/:param", function (req, res) {
  let query = "select * from restaurants where ?=?";
  let d = [req.params.searchBy, req.params.param];
  let q = "select * from restaurants where " + req.params.searchBy + " = '" + req.params.param + "'";

  mc.query(q, function (err, result) {
    if (err) throw err;
    else {
      res.send(result);
    }
  })
})

app.get("/info", function (req, res) {
  console.log('kutsuttu')
  let query = "select * from restaurants"
  mc.query(query, function (err, result) {
    if (err) {
      console.log("error ", err);
    }
    else {
      const info = {
        content: 'API has information for ' + result.length + ' restaurants',
        date: new Date(),
      }
      res.send(info.content + "<br>" + info.date + "<br>" + "API visitors since server start: " + counter)
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

/*
app.get("/api/reviews/all", function (req, res) {
  let query = "select * from reviews"
  mc.query(query, function (err, result) {
    if (err) throw err;
    res.send(result)
  });
})
*/

app.get("/api/reviews/search/:searchBy/:param", function (req, res) {
  let query = "select * from reviews where " + req.params.searchBy + " = '" + req.params.param + "'";
  mc.query(query, function (err, result) {
    if (err) throw err;
    res.send(result)
  });
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get("/api/reviews/all/token=:token", isUserAuthenticated,
  function (req, res) {
    let query = "select * from reviews"
    mc.query(query, function (err, result) {
      if (err) throw err;
      res.send(result)
    });
})

function isUserAuthenticated (req,res,next){
  let query = "select * from accounts where token = ?"
    mc.query(query, req.params.token, function (err, result) {
      if (err) throw err;
      if(result.length > 0){
        next();
      }else{
        res.send("Authentication failed")
      }
    });
}

app.get('/auth/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/'
  }),
  (req, res) => {
    session.user = req.session.passport.user;
    checkIfUserExists(res);
  }
);

function checkIfUserExists(res){
  let googleId = session.user.profile.id;
  let query = "select * from accounts where emailId = ?";
  mc.query(query, googleId, function (err, result) {
    if (err) throw err;
    if(result.length == 0){
      let token = session.user.token;
      console.log(token)
      let q = "insert into accounts values(?,?,?)"
      mc.query(q, [null, googleId, token], function (err, result) {
      if (err) throw err;
      });
    }else{
      session.user.token = result[0].token;
    }
  });
  res.redirect('/');
}





