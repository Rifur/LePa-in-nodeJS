var show = function (x) { console.log(x + " Here!"); };

module.exports = {
	tokens : {
		'VAR' : "var", 
		'ASSIGN' : "=", 
		'PL' : "\\(", 
		'PR' : "\\)", 
		
		'NULL' : 'NULL',

		'SEMICOLON' : ';',
		'COMMA' : ',',
		
		'NUMBER' : '\\d+',
		'IDENTIFIER' : "\\w+"
	},

	ignore : {
		'IGNORE' : '\\s+'
	},

	VAR : function (val) {
		show('VAR : ' + val);
	},

	ASSIGN : function (val) {
		show('ASSIGN : ' + val);
	},

	PL : function (val) {
		show('PL : ' + val);
	},

	PR : function (val) {
		show('PR : ' + val);
	},

	NULL : function (val) {
		show('NULL : ' + val);
	},

	SEMICOLON : function (val) {
		show('SEMICOLON : ' + val);
	},

	IDENTIFIER : function (val) {
		show('IDENTIFIER : ' + val);
	},

	NUMBER : function (val) {
		show('NUMBER : ' + val);
	}
};