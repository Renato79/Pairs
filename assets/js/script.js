/****************************
 PAIRS, MEMORY GAME
*****************************/


// Creating an array with the pictures path
var GOT = [
    'assets/images/Arya.jpg',
    'assets/images/Tyrion.jpg',
    'assets/images/Cersei.jpg',
    'assets/images/Daenerys.jpg',
    'assets/images/Drogo.jpg',
    'assets/images/Jaime.jpg',
    'assets/images/Joffrey.jpg',
    'assets/images/Jon.jpg'
];

// Creating an array that contains all the cards plus the double
var arr = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

// Let's shuffle the cards to start the game
arr.sort(function (a, b) {
    return 0.5 - Math.random()
});

// Let's hide all the cards
var a;

for (a = 0; a < arr.length; a++) {
    document.getElementsByClassName("pic")[a].src = "assets/images/got-card.jpg";
}

var match = 0; // Counter to have only two cards a time
var ct = 0; // Counter to know when we have completed the game
var check = []; // Array to gather the values of the two pics and compare them
var idGet = []; // Save the ID of the img for comparison 
var clicks = 0; // We can click only on two cards in a row
var start = 0; // Counter to start the timer on the first click
var seconds = 1; // Well... seconds! Setting to 1 to avoid infinity
var totSec = 0; // Timeframe between a match and the previous one
var tempSec = 0; // Keep seconds value at each match
var score = 0; // Current score
var pic_id = "id";
var game = "ongoing";

// Main function that we call when we click on a card
function guess(getID) {
    if (game == "ongoing") {

        start++; // Timer started!

        if (start == 1) {
            var x = setInterval(function () {
                seconds++;
            }, 1000);
        }

        // Let's verify if we clicked on three cards in a row, in that case we return false
        clicks++;

        if (clicks > 2) return false;


        // Let's save the img ID value so that we can compare it with the next card we click on
        idGet[match] = getID;

        // Let's verify if we click on the same img two times, it's cheating!
        if (match == 1 && idGet[0] == getID) {
            clicks = 1;
            return false;
        }

        // Function to compare the two cards
        function compare(current) {
            if (match == 1) { // if we have two cards turned
                if (check[0] == current) { // if they match
                    totSec = seconds - tempSec;
                    tempSec = seconds; // let's save the current 'seconds' value
                    score = Math.round(score + (20000 / totSec)); // let's calculate how many points we scored
                    let conv = score.toString().length; // we also want to add zeros before the score
                    let zero = 7 - conv;
                    let zeroN = "0";
                    for (let zn = 1; zn < zero; zn++) {
                        zeroN = zeroN.concat("0");
                    }
                    document.getElementById("cScore").innerHTML = zeroN + score;
                    setTimeout(function () { // let's remove the cards from the table
                        document.getElementById(getID).style.visibility = "hidden";
                        document.getElementById(idGet[0]).style.visibility = "hidden";
                        clicks = 0;
                    }, 1300);

                    match = 0;
                    ct++;

                    if (ct == 8) { // This in case we have found the last two cards
                        setTimeout(function () {
                            document.getElementById('welldone').style.display = "block";
                            document.getElementById('center').style.display = "none";
                            document.getElementById("finalScore").innerHTML = "<span style='color:#f4c318;'>Final Score: </span>" + score;
                        }, 1000);
                    }

                } else { // In case the two cards do not match, we turn them back again
                    match = 0;

                    setTimeout(function () {
                        document.getElementById(getID).src = "assets/images/got-card.jpg";
                        document.getElementById(idGet[0]).src = "assets/images/got-card.jpg";
                        document.getElementById(getID).className = "pic";
                        document.getElementById(idGet[0]).className = "pic";
                        clicks = 0;
                    }, 1300);
                }

            } else { // In case we clicked on the first card we save that value to compare it afterwards
                check[0] = current;
                if (match < 1) match++;
            }

        }

        // Call the function compare() to see if there is a match
        for (let sly = 0; sly < 16; sly++) {
            pic_id = "id";
            pic_id = pic_id.concat(sly);

            if (getID == pic_id) {
                document.getElementById(pic_id).src = GOT[arr[sly]];
                document.getElementById(pic_id).className = "pics";
                compare(arr[sly]);
                break;
            }
        }
    }
}

// When we click on the link Solution, we uncover all the cards left on the table 
function solution() {
    if(game == "finished") {
        window.location.href = "index.html";
    }

    // This in case the user clicks on Solution from the How to play page
    document.getElementById("instructions").style.display = "none";
    document.getElementById("game-center").style.display = "block";

    for (let sly = 0; sly < 16; sly++) {
        pic_id = "id";
        pic_id = pic_id.concat(sly);
        if (document.getElementById(pic_id).style.visibility != "hidden") {
            document.getElementById(pic_id).src = GOT[arr[sly]];
            document.getElementById(pic_id).className = "pics";
        }           
    }
    game = "finished";    
}

// Click on New Game
function reload() {
    window.location.href = "index.html";
}

// How to play
function howtoplay() {
    document.getElementById("welldone").style.display = "none";
    document.getElementById("game-center").style.display = "none";
    document.getElementById("instructions").style.display = "block";
}

function backtogame() {
    document.getElementById("welldone").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("game-center").style.display = "block";
}