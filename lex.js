var	path = require('path'),
	util = require('util'),
	token = require('./token.js');

function error_msg() {
	console.log("Bad character");
	process.exit();
}

var text = '';
//var pattern;

module.exports = {

	pattern : {	},
	linenum : { },

	input : function (src) {
		var self = this;
		self.linenum = 1;
		text = src;
	},


	lex : function () {
		var self = this;
		var d = '';
		
		self._ignore();

		if(text == '') {
			return;	// end of text
		}

		d = self._scan();

		if(d != '') {
			eval("token." + self.pattern + "(d)");
			self._next(d);
			process.nextTick(function () { self.lex(); });

		} else {
			error_msg();
		}
	},


	_next : function (d) {
		text = text.substr(d.length);
	},


	_scan : function () {
		var self = this;
		var d = '';

		self._ignore();

		if(text == '') {
			return;	// end of text
		}

		for(self.pattern in token.tokens) {
			d = String(text.match("^" + token.tokens[self.pattern]));

			if(d != 'null') {
				return d;	// match
			}
		}

		error_msg();
	},


	_ignore : function () {
		var self = this;
		var d = '';

		for(var ig in token.ignore) {
			d = String(text.match("^" + token.ignore[ig]));
			if(d == 'null') {
				return;
			}
			if(d == '\n') {
				self.linenum += 1;
			}
			self._next(d);
		}

		process.nextTick(function () { self._ignore(); });
	},

	_getPattern : function () {
		return self.pattern;
	}
};
