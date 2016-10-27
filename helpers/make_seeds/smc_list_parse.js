var fs = require('fs');
var linesIn = fs.readFileSync('smc_list.txt').toString().split("\n");
var linesOut = "";
var line;
var fields;
var i = 0;
for(; i < linesIn.length; i++) {
  line = linesIn[i].trim();
  // The last 10 characters contain the map 
  fields = line.split("  ");
  if (fields.length !== 5) {
    console.log("Line", i+1, "wrong number of fields");
    break;
  }
  // SMC code, name, translation, height and map ref.
  linesOut += '"' + fields[4].replace(/ /g,'') + '"';
  linesOut += ',"' + fields[1] + '"';
  linesOut += ',"' + fields[3] + '"';
  linesOut += ',"' + fields[2] + '"';
  linesOut += ',"' + fields[0] + '"\n';
}

// console.log(linesOut)
fs.writeFileSync("smc_list.csv", linesOut);