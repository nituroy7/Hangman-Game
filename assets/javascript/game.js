var chosenWord; 
var dashes;
var error;
var guesscount;
var winscounter = 0;
var lettersguessed = [];
var matchcount;

function initialize()
{
   var WordList = [
  ["U","S","A"],
  ["T", "R", "E", "E", "H", "O", "U", "S", "E"],
  ["J","A","V","A","S","C","R","I","P","T"],
  ["W","E","B","D","E","S","I","G","N"],
  ["E","D","U","C","A","T","I","O","N"],
  ["C","H","O","C","O","L","A","T","E"]
]
    var random = Math.floor((Math.random()*(WordList.length-1))); 
    chosenWord = WordList[random];
    dashes = new Array(chosenWord.length); 
    for (var i = 0; i < dashes.length; i++){
        dashes[i] = "_ ";
    }
    lettersguessed = [];
    error = 0;
    guesscount = 0;
    matchcount = 0;
}

// prints wins count
function printwins(){
  var winsfield = document.getElementById("wins");
  document.querySelector("#wins").innerHTML = "WINS: " + winscounter;
}
// reset the dashes
function dashreset(){
  var dashfield = document.getElementById("dashfield");
  dashfield.innerHTML=""; 
}
// prints the guessfield
function printdashes(){
    for (var i = 0; i < dashes.length; i++){
      var dashfield = document.getElementById("dashfield");
      var dash = document.createTextNode(dashes[i]);
      dashfield.appendChild(dash);
    }
}
// prints guess remaining
function printguessesremains(){
  var guessremainfield = document.getElementById("guessremains");    
  var value = dashes.length - guesscount; 
  document.querySelector("#guessremains").innerHTML = "NUMBER OF GUESSES REMAINING: " + value;
}
// prints letters already guessed
function printguessedletters(){
  var guessedletterfield = document.getElementById("lettersguessed");     
    guessedletterfield.innerHTML = "LETTERS ALREADY GUESSED: "+lettersguessed;
}

function init(){
    initialize();
    printdashes();
    printguessesremains();
    printwins();
    printguessedletters();
}

function letsplay(userGuess) {
    var guessletter = userGuess.toUpperCase();
    guesscount++;
    
    for (var i = 0; i < chosenWord.length; i++){
        if(chosenWord[i] === guessletter){
            dashes[i] = guessletter + " ";
            var letterMatched = true;
            matchcount++
        }
      }
      
    if(!letterMatched){        
        if(lettersguessed.indexOf(guessletter) === -1)
        {
            lettersguessed.push(guessletter);    
        }            
        error++;        
    }

    //checks if all letters have been found
    var finished = true;
    for (var i = 0; i < dashes.length; i++){
        if(dashes[i] === "_ "){
            finished = false;
        }
    }
    if(finished){
        winscounter++;
    }        
  dashreset();
  printdashes();
    
    if(!letterMatched){
        printguessedletters();     
    }
  
  printguessesremains();
  printwins();
}

document.onkeyup = function() {
    // Determine which key was pressed    
    var userGuess = "" + event.keyCode;
    var allowedletters = /^[65-90]+|[97-99]|1[00-22]+$/; 

    
    if(userGuess.match(allowedletters)){
        if(winscounter > 0 && matchcount === chosenWord.length){
            initialize();
        }
       letsplay(String.fromCharCode(userGuess));
    }
}
window.onload = init;