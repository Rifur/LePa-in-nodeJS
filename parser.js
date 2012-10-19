var	fs = require("fs"),
	path = require('path'),
	util = require('util'),
	lex = require('./lex.js')
	;


module.exports = {
	input : function(s) {
		syntax = require(s);
	},

	parse : function() {
		start();
	}
};

function expect(symbol) {
	if(symbol()) {
		return true;
	} else {
		error_msg();
		return false;
	}
}

function accept(symbol) {
	if(symbol()) {
		return true;
	} else {
		return false;	
	}
}

function error_msg() {
	console.log("line " + lex.linenum + " : syntax error");
	process.exit();
}

function start() {
	token_region();
	bnf_region();
}

function bnf_region() {
	var d = lex._scan();
	switch(lex.pattern) {
		case 'GRAMMAR_REGION':
			console.log("symbol" + d);
			lex._next(d);
			
			expect(LBRACE);
			
			do {
				bnf_expression();

			} while(!accept(RBRACE));
			
		break;
	}
}

function bnf_expression() {
	var d = lex._scan();console.log(lex.pattern);
	switch(lex.pattern) {
		case 'NONTERMINAL' : 
			console.log("symbol: " + d);
			lex._next(d);
			
			expect(COLON);
			
			do {
				bnf_rule();
			} while(!accept(SEMICOLON));
			
		break;
	}
}

function bnf_rule() {
	var d = lex._scan();
	switch(lex.pattern) {
		case 'NONTERMINAL':
			console.log("nonterminal" + d);
			lex._next(d);
		break;
		case 'TERMINAL' :
			console.log("terminal" + d);
			lex._next(d);
		break;
	
	}
}

function token_region() {
	var d = lex._scan();
	switch(lex.pattern) {
		case 'TOKEN_REGION':
			console.log("TOKEN_REGION");
			lex._next(d);

			expect(LBRACE);

			do {
				token_name();
				expect(COLON);
				token_regular();
			} while(accept(COMMA));
			
			expect(RBRACE);

		break;
	}
}

function token_name() {
	var d = lex._scan();

	switch(lex.pattern) {
		case 'IDENTIFIER':
			console.log("TOKEN_NAME");
			lex._next(d);
		break;
	}

	return true;
}

function token_regular() {
	var d = lex._scan();
	switch(lex.pattern) {
		case 'TOKEN_REGULAR':console.log(d);
			console.log("TOKEN_REGULAR");
			lex._next(d);
		break;
	}

	return true;
}


function ASSIGN() {
	var d = lex._scan();
	if(lex.pattern == 'ASSIGN') {
		console.log('ASSIGN ' + "=");
		lex._next(d);
		return true;
	}

	return false;
}

function IDENTIFIER() {
	var d = lex._scan();
	if(lex.pattern == 'IDENTIFIER') {
		console.log('ID : ' + d);
		lex._next(d);
		return true;
	}

	return false;
}

function NUMBER(t) {
	var d = lex._scan();
	if(lex.pattern == 'NUMBER') {
		console.log('NUM : ' + d);
		lex._next(d);
		return;
	}

	error_msg();
}

function NULL(t) {
	var d = lex._scan();
	if(lex.pattern == 'NULL') {
		console.log('NULL');
		lex._next(d);
		return true;
	}

	return false;
}

function SEMICOLON() {
	var d = lex._scan();
	if(lex.pattern == 'SEMICOLON') {
		console.log('SEMICOLON');
		lex._next(d);
		return true;
	}

	return false;
}

function COMMA() {
	var d = lex._scan(); 
	if(lex.pattern == 'COMMA') {
		console.log('COMMA');
		lex._next(d);
		return true;
	}

	return false;	
}

function COLON() {
	var d = lex._scan(); 
	if(lex.pattern == 'COLON') {
		console.log('COLON');
		lex._next(d);
		return true;
	}

	return false;	
}

function LBRACE() {
	var d = lex._scan();
	if(lex.pattern == 'LBRACE') {
		console.log('LBRACE');
		lex._next(d);
		return true;
	}

	return false;	
}

function RBRACE() {
	var d = lex._scan();
	if(lex.pattern == 'RBRACE') {
		console.log('RBRACE');
		lex._next(d);
		return true;
	}

	return false;	
}
