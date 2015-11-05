var fs = require('fs');
var http = require('http');
var url = require('url');
var readline = require('readline');
var ROOT_DIR = "html/";
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    //console.log("URL path " + urlObj.pathname);
    //console.log("URL search " + urlObj.search);
    //console.log("URL query " + urlObj.query.q);
    // If this is our REST service
    if (urlObj.pathname.indexOf("getcity") !== -1) {
        var myRe = new RegExp("^" + urlObj.query.q);
        //console.log(myRe);
        //console.log("query is ", urlObj.query.q);
        var jsonresult = [];
        // Now look the query up in the file
        fs.readFile('cities.dat.txt', function (err, data) {
            if (err) {
                throw err;
            }
            cities = data.toString().split("\n");
            for (var i = 0; i < cities.length; i++) {
                var result = cities[i].search(myRe);
                if (result != -1) {
                    jsonresult.push({city:cities[i]});
                }
            }
            //console.log(jsonresult);
            console.log(JSON.stringify(jsonresult));
            res.writeHead(200);
            res.end(JSON.stringify(jsonresult));
        });
  } else {
    // Normal static file
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(80);



var options = {
    hostname: 'localhost',
    port: '80',
    path: '/weather.html'
  };
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
    //console.log(serverData);
  });
}
http.request(options, function(response){
  handleResponse(response);
}).end();