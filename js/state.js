var triggerSignatures = [
	["TOUCHES","SPRITE","SPRITE"],
	["KEY PRESSED","KEY"],
	["KEY HELD","KEY"],
	["KEY RELEASED","KEY"],
	["HAS TEXT","TEXTSPRITE","TEXT"],
	["HIT AGAINST","SPRITE","SPRITE"],
	["GREATER THAN","NUMBER","NUMBER"],
	["EQUALS","NUMBER","NUMBER"]
]

//number has
//VARIABLES
//NUMBER ENTRY
//TIME

//direction has
//RELATIVE
//ABSOLUTE


//position is
//SPRITE 
//COORDINATE

var eventSignatures = [
	["TURN","SPRITE","DIRECTION"],
	["TRAVEL TO","SPRITE","POSITION"],
	["CREATE","SPRITE","SPRITE"],
	["SET TEXT","TEXTSPRITE","TEXT"],
	["SET VARIABLE","VARIABLE","NUMBER"],
	["SET FLAG","FLAG"],
	["CLEAR FLAG","FLAG"],
]

var ee_scrollpos = 0;
var ee_contents = [
//	flag	flag	condition text		action text
	[ 1,  ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"],"X"],
	[ 0,  ["WANTS",2,1], ["DESTROY",2],"X"],
	[ 1,  ["LEAVES AREA",2,-2], ["DESTROY",2],"X"],
	[ 1,  ["WANTS LOVE",-2,2], ["DESTROY",2],"X"],
	[ 0,  ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"],"X"],
	[ 1,  ["WANTS",2,1], ["DESTROY",2],"X"],
];
