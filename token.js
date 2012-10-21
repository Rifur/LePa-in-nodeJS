var show = function (x) { console.log(x + " Here!"); };

module.exports = {
	tokens : {

		'LPARENTHESES' : "\\(", 
		'RPARENTHESES' : "\\)", 

		'LBRACE' : "{",
		'RBRACE' : "}",

		'LBRACKET' : "\\[",
		'RBRACKET' : "\\]",

		'SEMICOLON' : ';',
		'COMMA' : ',',
		'COLON' : ':',
		'PERIOD' : '\\.',
		'ALTER' : '\\|',
		
		'ASSIGN' : "=",
		'NULL' : 'NULL',

		'NUMBER' : '\\d+',
		'IDENTIFIER' : "\\w+",

		'GRAMMAR_REGION' : "%grammar",
		'NONTERMINAL' : "<\\w+>",
		'TERMINAL' : '"\\S+"',

		'TOKEN_REGION' : "%token",
		'TOKEN_REGULAR' : '/.*/',

		'EPSILON' : 'ε'


	},

	ignore : {
		'IGNORE' : '\\s+'
	},
};
