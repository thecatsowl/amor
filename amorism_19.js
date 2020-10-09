/********************************************************************************

	Programmer:	Robert Aguilar, or, Tortoise Shell

	Date:		10/08/20

	Filename:	amorism_19.js

	Links To:	index.html

	Purpose:	This script declares two JavaScript functions:
		 		One uses arguments sent to it to pop up an alert box with a message;
		 		the second one uses a return statement to send a value back to the
		 		script, and this returned value is used in an alert message to the
		 		viewer. 

	

	Cat:		Amor

	Owner:		Casandra Aguilar


********************************************************************************/

function amor_says(mycat, wisdom)
{
	window.alert(mycat + " here with your weekly " + wisdom + "!");
}

function amorism_19()
{
	var strng0= "Prrrfect Logic - Amorism #19 : ";
	var strng1= "Pet me, ";
	var strng2= "love me, ";
	var strng3= "spend time with me, ";
	var strng4= "and maybe ... ";
	var strng5= "I might like you.";
	var allStrngs= strng0 + strng1 + strng2 + strng3 + strng4 + strng5;
	return allStrngs;
}

amor_says("Amor", "Amorism");
var alerttext=amorism_19();
window.alert(alerttext);







