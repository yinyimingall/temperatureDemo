var path = require("path");
var express = require("express");
var ForecastIo = require("forecastio");

var app = express();
var weather = new ForecastIo("6860d0e9ce27911a33de132242ca0870");
app.set("view engine", "xtpl");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/search", function(req, res, next){
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  console.log('纬度' + latitude + ',经度' + longitude);
  weather.forecast(latitude, longitude).then(function(data) {
    console.log(JSON.stringify(data, null, 2));
  });

  weather.forecast(latitude, longitude, function(err, data){
    if(err){
      next();
      return;
    }
    console.log(data);
    res.json({
      temperature: parseInt((data.currently.temperature - 32) / 1.8)
    });
  });

});

app.use(function(req, res){
  res.status(404).render("404");
});

app.listen(3000);
