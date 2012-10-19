%token 
{
	XDD: /XDD/, 
	NANI : /NANI/
}

%grammar
{

<start> : <expression> <haha>;
<expression> : <var> <nani>;

}

var a = NULL;
var b = 123, b = 321;
