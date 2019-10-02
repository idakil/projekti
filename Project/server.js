let express = require('express');
let app = express();


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

app.use(express.static('public'));

let io = require('socket.io')(server);

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password",
    database: "db"
});