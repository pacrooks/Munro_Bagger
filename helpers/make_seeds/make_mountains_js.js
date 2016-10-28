var fs = require('fs');
var linesIn = fs.readFileSync('combined.csv').toString().split("\n");
var linesOut = "var mountains = [\n";
var line;
var fields;
var i = 0;
for(; i < linesIn.length; i++) {
  line = linesIn[i];
  if (line.length > 0) {
    fields = line.split(",");
    // "NN166712","Ben Nevis","1344","NN"","16675","71283","56.79684900","-5.0035250","Possibly from an old Gaelic word meaning venomous","M001","Loch Linnhe to Loch Ericht"
    linesOut += "  {\n    id: \""  + (i+1) + "\",\n    name: " + fields[1] +",\n    height: " +
    // linesOut += "  {\n    name: " + fields[2] +",\n    height: " +
      fields[2].substr(1, fields[2].length-2) + ",\n    gridRef: {\n      letters: " +
      fields[3] + ",\n      eastings: " + fields[4] + ",\n      northings: " +
      fields[5] + "\n    },\n    latLng: {\n" + "      lat: " +
      fields[6].substr(1, fields[6].length-2) + ",\n      lng: " +
      fields[7].substr(1, fields[7].length-2) + "\n    },\n    meaning: " + fields[8] + ",\n" +
      "    smcId: " + fields[9] + ",\n    weatherId: undefined,\n    region: " + fields[10] + "\n  },\n";
  }
}
linesOut = linesOut.slice(0, -2);
linesOut += "\n];\n"
linesOut += "\nmodule.exports = mountains;"
// console.log(linesOut)
fs.writeFileSync("mountain_list.js", linesOut);