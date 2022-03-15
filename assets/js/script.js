// Creating an array that contains all the cards plus the double
var arr = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];


// Let's shuffle the cards to start the game
arr.sort(function (a, b) { return 0.5 - Math.random() });

// Let's hide all the cards with the House Stark Crest
var a;

for (a = 0; a < arr.length; a++) {
    document.getElementsByClassName("pic")[a].src = "assets/images/got-card.jpg";
}