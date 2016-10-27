
var Mountain = function(gridRef, name, height, csv) {
  this.gridRef = gridRef;
  this.name = name;
  this.height = height;
  this.csv = csv;
  this.partner = undefined;
  this.partnerBy = undefined;
}

Mountain.prototype.sameGridRef = function(another) {
  return (this.gridRef === another.gridRef);
}

Mountain.prototype.sameName = function(another) {
  return (this.name.toLowerCase() === another.name.toLowerCase());
}

Mountain.prototype.sameHeight = function(another) {
  return (Math.round(Number(this.height)) === Math.round(Number(another.height)));
}

Mountain.prototype.same = function(another) {
  return(this.sameGridRef(another) && this.sameName(another) && this.sameHeight(another))
}

var unQuote = function(str) {
  return str.substr(1, str.length-2);
}

var fs = require('fs');
var smcLinesIn = fs.readFileSync('smc_list.csv').toString().split("\n");
var smcMtns = [];
var munroLinesIn = fs.readFileSync('munros.csv').toString().split("\n");
var munros = [];
var linesOut = "";

var line;
var fields;
var i;

for(i = 0; i < smcLinesIn.length; i++) {
  line = smcLinesIn[i];
  fields = line.split(",");
  smcMtns.push(new Mountain(unQuote(fields[0]), unQuote(fields[1]), unQuote(fields[2]), fields))
}

for (i = 0; i < munroLinesIn.length; i++) {
  line = munroLinesIn[i];
  fields = line.split(",");
  munros.push(new Mountain(unQuote(fields[1]), unQuote(fields[2]), unQuote(fields[3]), fields))
}

var j;
for(i = 0; i < smcMtns.length; i++) {
  for(j = 0; j < munros.length; j++) {
    if (smcMtns[i].sameGridRef(munros[j])) {
      smcMtns[i].partner = munros[j];
      munros[j].partner = smcMtns[i];
      smcMtns[i].partnerBy = munros[j].partnerBy = "gridRef"
      break;
    }
  }
}

for(i = 0; i < smcMtns.length; i++) {
  if (!smcMtns[i].partner) {
    for(j = 0; j < munros.length; j++) {
      if (smcMtns[i].sameName(munros[j]) && smcMtns[i].sameHeight(munros[j])) {
        smcMtns[i].partner = munros[j];
        munros[j].partner = smcMtns[i];
        smcMtns[i].partnerBy = munros[j].partnerBy = "name & height"
        break;
      }
    }
  }
}

for(i = 0; i < smcMtns.length; i++) {
  linesOut += "\"" + smcMtns[i].gridRef + "\",\"" + smcMtns[i].name + "\",\"" + smcMtns[i].height + "\"," +
    smcMtns[i].partner.csv[4] + "," + smcMtns[i].partner.csv[5] + "," + smcMtns[i].partner.csv[6] +
    "," +  smcMtns[i].partner.csv[7] + "," + smcMtns[i].partner.csv[8] + "," + smcMtns[i].csv[3] +
    "," + smcMtns[i].csv[4] + "\n";
}

fs.writeFileSync("combined.csv", linesOut);
