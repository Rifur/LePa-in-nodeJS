var fs = require("fs"),
	lex = require('./lex.js'),
	parser = require('./parser.js'),
	path = require('path'),

	print = console.log,

	srcCodeNum = -2,	// first two arguments are nodejs and main.js
	srcCode = new Array();


function readSourceCode(filename) {
	return fs.readFileSync(filename, "utf8");
}

process.argv.forEach(function (val, index, array) {	
	if(srcCodeNum >= 0) {
		var filename = path.basename(val);
		srcCode[srcCodeNum] = readSourceCode(filename);
	}

	srcCodeNum += 1;
});

if(srcCodeNum == 0) {
	print("Usage: lex <src1 src2...>");
	process.exit();
}


var str = srcCode[0];
lex.input(str);
parser.parse(str);