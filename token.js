var show = function (x) { console.log(x + " Here!"); };

module.exports = {
	tokens : {


		'VAR' : "var", 
		'ASSIGN' : "=", 
		'PL' : "\\(", 
		'PR' : "\\)", 

		'LBRACE' : "{",
		'RBRACE' : "}",
		
		'NULL' : 'NULL',

		'SEMICOLON' : ';',
		'COMMA' : ',',
		'COLON' : ':',
		'PERIOD' : '\\.',
		
		'NUMBER' : '\\d+',
		'IDENTIFIER' : "\\w+",

		'GRAMMAR_REGION' : "%grammar",
		'NONTERMINAL' : "<\\w+>",
		'TERMINAL' : '"\\w+"',
		

		'TOKEN_REGION' : "%token",
		'TOKEN_REGULAR' : '/[^/]*/'


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
