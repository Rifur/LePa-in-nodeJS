var	fs = require("fs"),
	path = require('path'),
	util = require('util'),
	lex = require('./lex.js')
	;

eval(fs.readFileSync('linklist.js', 'utf8')); 
LLToken = new linklist();

module.exports = {
	input : function(s) {
		syntax = require(s);
	},

	parse : function() {
		start();
	}
};

function error_msg(msg) {
	if(msg == undefined) {
		console.log("line " + lex.linenum + " : syntax error");
	} else {
		console.log("line " + lex.linenum + " : " + msg);
	}
	process.exit();
}

function expect(symbol) {
	if(symbol()) {
		lex.nextToken();
		return true;
	} else {
		error_msg("Unrecongnized token");
		return false;
	}
}

function accept(symbol) {
	if(symbol()) {
		lex.nextToken();
		return true;
	} else {
		return false;	
	}
}

/*	TOKEN	*/	// TODO
function testToken() {

	var str = '<start>';
	var ary = LLToken.toArray();
	for(var i in ary) {
		var h = str.match(new RegExp('^' + ary[i].key[1]));
		if(h != null) {
			console.log(str + ' MATCH! ' + ary[i].key[0]);
			break;
		}
	}
}

/*	SYNTEX	*/
function start() {
	token_region();
	bnf_region();

	LLToken.travel();
	testToken();
	
}

function token_region() {
	var d = lex.lookahead();
	switch(lex.pattern) {
		case 'TOKEN_REGION':

			console.log("TOKEN_REGION");
			lex.nextToken();

			expect(LBRACE);

			do {
				token_expression();

			} while(!accept(RBRACE));

		break;
		default:
			// empty string
	}
}

function token_expression() {
	var d = lex.lookahead();
	var tokenName, tokenReg;
	switch(lex.pattern) {
		case 'IDENTIFIER':
			do {
				tokenName = token_name();
				expect(COLON);
				tokenReg = token_regular();

				LLToken.append(new llNode(ATOM_TYPE, new Array(tokenName, tokenReg)));

			} while(accept(COMMA));
		break;
		default:
			error_msg("using> IDENTIFIER: /regular expression/");
	}
	
}

function token_name() {
	var d = lex.lookahead();

	switch(lex.pattern) {
		case 'IDENTIFIER':
			console.log("TOKEN_NAME: " + d);
			lex.nextToken();
			
			return d;

		break;
		default:
			error_msg("\tHere need a token name.\n\t\tusing> IDENTIFIER: /regular expression/");
	}
}

function token_regular() {
	var d = lex.lookahead();
	switch(lex.pattern) {
		case 'TOKEN_REGULAR':
			d = d.substring(1, d.length-1);
			console.log("TOKEN_REGULAR: " + d);
			lex.nextToken();
			
			return d;

		break;
		default:
			error_msg("\tHere need a regular expression.\n\t\tusing> IDENTIFIER: /regular expression/");
	}
}

function bnf_region() {
	var d = lex.lookahead();
	switch(lex.pattern) {
		case 'GRAMMAR_REGION':
			console.log(d);
			lex.nextToken();
			
			expect(LBRACE);
			
			do {
				bnf_expression();
			} while(!accept(RBRACE));
			
		break;
		default:
			// empty string
	}
}

function bnf_expression() {
	var d = lex.lookahead();
	switch(lex.pattern) {
		case 'NONTERMINAL' : 
			console.log("symbol: " + d);
			lex.nextToken();
			
			expect(COLON);
			bnf_rule();
			//expect(SEMICOLON);
	
		break;
		default:
			error_msg("\tHere need a BNF.\n\t\tusing> <symbol> : BNF-expression ;");
		
	}
}

function bnf_rule() {
	var d = lex.lookahead();

	switch(lex.pattern) {
		case 'NONTERMINAL':
		case 'IDENTIFIER' :
		case 'TERMINAL':
		case 'EPSILON':
		case 'ALTER':
			
			do {
				bnf_element();
				bnf_zeorOrMore();
			} while(!accept(SEMICOLON));

		break;

		default:
			error_msg("\tHere need a BNF.\n\t\tusing> <symbol> : BNF-expression ;");
	}
}

function bnf_element() {
	var d = lex.lookahead();
	switch(lex.pattern) {
		case 'NONTERMINAL':
			console.log("nonterminal: " + d);
			lex.nextToken();
		break;
		case 'IDENTIFIER':
			console.log("defined terminal: " + d);
			lex.nextToken();
		break;
		case 'TERMINAL' :
			console.log("terminal: " + d);

			d = d.substring(1, d.length-1);
			if(!LLToken.search(new Array(d, d))) {
				LLToken.append(new llNode(ATOM_TYPE, new Array(d, d)));
			}
			
			lex.nextToken();
		break;
		case 'ALTER':
			console.log("alter: |");
			lex.nextToken();
		break;
		case 'EPSILON':
			console.log("ε-move: " + d);
			lex.nextToken();
		break;
		default:
			error_msg("\tHere need a BNF.\n\t\tusing> <symbol> : BNF-expression ;");
	}
}

function bnf_zeorOrMore() {
	var d = lex.lookahead();
	switch(lex.pattern) {
		case 'LBRACKET':
			console.log("LBRACKET");
			lex.nextToken();

			do {
				bnf_element();
			} while(!accept(RBRACKET));

		break;
		default:
			// empty string
		
	}
}

/*	TOKENS	*/
function ASSIGN() {
	var d = lex.lookahead();
	if(lex.pattern == 'ASSIGN') {
		console.log('ASSIGN ' + d);
		//lex.nextToken();
		return true;
	}

	return false;
}

function IDENTIFIER() {
	var d = lex.lookahead();
	if(lex.pattern == 'IDENTIFIER') {
		console.log('ID : ' + d);
		//lex.nextToken();
		return true;
	}

	return false;
}

function SEMICOLON() {
	var d = lex.lookahead();
	if(lex.pattern == 'SEMICOLON') {
		console.log('SEMICOLON');
		//lex.nextToken();
		return true;
	}

	return false;
}

function COMMA() {
	var d = lex.lookahead(); 
	if(lex.pattern == 'COMMA') {
		console.log('COMMA');
		//lex.nextToken();
		return true;
	}

	return false;	
}

function COLON() {
	var d = lex.lookahead(); 
	if(lex.pattern == 'COLON') {
		console.log('COLON');
		//lex.nextToken();
		return true;
	}

	return false;	
}

function LBRACE() {
	var d = lex.lookahead();
	if(lex.pattern == 'LBRACE') {
		console.log('LBRACE');
		//lex.nextToken();
		return true;
	}

	return false;	
}

function RBRACE() {
	var d = lex.lookahead();
	if(lex.pattern == 'RBRACE') {
		console.log('RBRACE');
		//lex.nextToken();
		return true;
	}

	return false;	
}

function LBRACKET() {
	var d = lex.lookahead();
	if(lex.pattern == 'LBRACKET') {
		console.log('LBRACKET');
		//lex.nextToken();
		return true;
	}

	return false;	
}

function RBRACKET() {
	var d = lex.lookahead();
	if(lex.pattern == 'RBRACKET') {
		console.log('RBRACKET');
		//lex.nextToken();
		return true;
	}

	return false;	
}