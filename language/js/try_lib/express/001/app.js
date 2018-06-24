var express = require('express');
var app = express();

app.use('/', function (res, req, next) {
    console.log(1)
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    // next()
    console.log(5)
})

app.use('/', function (res, req, next) {
    console.log(2)
    // Object.setPrototypeOf(req, app.request)
    // Object.setPrototypeOf(res, app.response)
    // req.res = res
    // res.req = req
    // res.send('Hello World!');
    // next()
    console.log(4)
})

app.get('/', function (req, res) {
    console.log(3)
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});