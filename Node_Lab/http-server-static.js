var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html";
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    fs.readFile('cities.dat.txt', function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
    }
    var myRe = new RegExp("^"+urlObj.query["q"]);
    console.log(myRe);
    cities = data.toString().split("\n");
    for(var i = 0; i < cities.length; i++) {
        var result = cities[i].search(myRe);
        if(result != -1) {
            console.log(cities[i]);
        }
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);



var options = {
    hostname: 'localhost',
    port: '8080',
    path: '/hello.html'
  };