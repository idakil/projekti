let express = require('express');
let app = express();

let server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

app.use(express.static('public'));
let io = require('socket.io')(server);
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password",
    database: "db"
});

var restaurantArr = [];
con.connect(function (err) {
    if (err) throw err;
    let query = "select * from restaurants"
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        if (result.length) {
            for (var i = 0; i < result.length; i++) {
                restaurantArr.push(result[i]);
            }
        }
    })
});