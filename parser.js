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

function error_msg() {
	console.log("line " + lex.linenum + " : syntax error");
	process.exit();
}

function start() {
	declare();
}

function declare() {
	var d = lex._scan();
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

function SEMICOLON(t) {
	var d = lex._scan();
	if(lex.pattern == 'SEMICOLON') {
		console.log('SEMICOLON');
		lex._next(d);
		return;
	}

	error_msg();
}

function COMMA(t) {
	var d = lex._scan();
	if(lex.pattern == 'COMMA') {
		console.log('COMMA');
		lex._next(d);
		return;
	}

	error_msg();	
}
