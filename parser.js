var	fs = require("fs"),
	path = require('path'),
	util = require('util'),
	lex = require('./lex.js'),
	syntax;


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
	}
	error_msg();
	return false;
}

function error_msg() {
	console.log("line " + lex.linenum + " : syntax error");
	//process.exit();
}

function start() {
	token_region();
	/*declare();*/
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
			} while(COMMA());
			
			expect(RBRACE);

			

			console.log("XD");
		break;
	}
}

function token_name() {
	var d = lex._scan();

	switch(lex.pattern) {
		case 'TOKEN_NAME':
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

function declare() {
	var d = lex._scan();
	console.log(d);
	switch(lex.pattern) {
		case 'VAR':
			VAR(); assign_form(); SEMICOLON();
			declare();
		break;

		default:
			return;
		break;
	}
}

function assign_form() {
	var d = lex._scan();
	switch(lex.pattern) {
		case 'IDENTIFIER':
			IDENTIFIER();
			
			lex._scan();
			if(lex.pattern == 'ASSIGN') {
					ASSIGN(); type();
			}

			assign_list();
		break;

		default:
			error_msg();
		break;
	}
}

function assign_list() {
	var d = lex._scan();
	switch(lex.pattern) {
		case 'COMMA':
			COMMA();
			assign_form();
		break;

		default:
			return;
		break;
	}
}


function type() {
	var d = lex._scan();
	switch(lex.pattern) {
		case 'IDENTIFIER':
			IDENTIFIER();
		break;

		case 'NUMBER':
			NUMBER();
		break;

		case 'NULL':
			NULL();
		break;

		default:
			error_msg();
		break;
	}
}

function VAR(t) {
	var d = lex._scan();

	if(lex.pattern == 'VAR') {
		console.log('VAR ' + d);
		lex._next(d);
		return;
	}

	error_msg();
}

function ASSIGN(t) {
	var d = lex._scan();
	if(lex.pattern == 'ASSIGN') {
		console.log('ASSIGN ' + "=");
		lex._next(d);
		return;
	}

	error_msg();
}

function IDENTIFIER(t) {
	var d = lex._scan();
	if(lex.pattern == 'IDENTIFIER') {
		console.log('ID : ' + d);
		lex._next(d);
		return;
	}

	error_msg();
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
		return;
	}

	error_msg();
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
