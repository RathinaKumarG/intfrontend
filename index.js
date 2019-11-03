var express = require('express');
var Request = require("request");
var os=require('os')
var app = express();
var requestIp = require('request-ip');
var bodyParser = require('body-parser')
app.use(requestIp.mw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', function (req, res) {
    Request.get("http://localhost/project/", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    var address=os.networkInterfaces();
    console.dir(JSON.parse(body));
    let json = JSON.parse(body);
    var ip=address.Ethernet[1].address;
    json["nodeip"]=ip;
    res.send(json);
      
    console.log(ip);
   // res.send(ip);
   // res.end(ip + '\n');
});
  
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});