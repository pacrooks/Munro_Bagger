var Mountain = require('./mountain');
var mountainList = require('./mountain_list');
var fs = require('fs');

var jsonWeatherStations = fs.readFileSync('siteList.json');
var weatherStations = JSON.parse(jsonWeatherStations);

var mountains = [];
var mountain;

for (mtn of mountainList) {
  mountain = new Mountain(mtn);
  for (station of weatherStations.Locations.Location) {
    mountain.checkStation(station);
  }
  mountains.push(mountain);
}

var linesOut = "";
var m;

for (var i = 0; i < mountains.length; i++) {
  m = mountains[i]
  linesOut += (i+1) + ",\"" + m.name + "\"," + m.height + "," + m.weatherStation.id + ",\"" +
  	m.weatherStation.name + "\"," + m.weatherStation.latitude + "," + m.weatherStation.longitude + "," +
  	m.weatherStation.elevation + "," + m.wsDistance + "\n"
}
fs.writeFileSync("weather_stations.csv", linesOut);

linesOut = "var mountains = [\n";
for (var i = 0; i < mountains.length; i++) {
  m = mountains[i]
  if (m) {
    linesOut += "  {" +
      "\n    id: "  + m._id +
      ",\n    name: \"" + m.name +
      "\",\n    height: " + m.height +
      ",\n    gridRef: {" +
      "\n      letters: \"" + m._gridRef._letters +
      "\",\n      eastings: \"" + m._gridRef._eastings +
      "\",\n      northings: \"" + m._gridRef._northings +
      "\"\n    }," +
      "\n    latLng: {" +
      "\n      lat: " + m._latLng.lat +
      ",\n      lng: " + m._latLng.lng +
      "\n    }," +
      "\n    smcId: \"" + m._smcId +
      "\",\n    weatherId: \"" + m.weatherStation.id +
      "\",\n    region: \"" + m._region +
      "\",\n    meaning: \"" + m._meaning +
      "\"\n  },\n";
  }
}
linesOut = linesOut.slice(0, -2);
linesOut += "\n];\n"
linesOut += "\nmodule.exports = mountains;"
fs.writeFileSync("weather_stations.js", linesOut);
