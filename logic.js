//array with all guessing words

var gameWords = ['basketball', 'tennis', 'boxing', 'swimming', 'speed-skating', 'skiing', 'hockey', 'football', 'figure-skating', 'baseball', 'rugby', 'soccer', 'cycling'];




// function to grab words

  function randomWord(gameWordsArray) {
    return gameWordsArray[Math.floor(Math.random()*gameWordsArray.length)];
};



// checking if guessed letter is correct 

// function isCorrectGuess(Word, letter) {
//     if(Word.indexOf(letter)!== -1) {
//         return true;
//     }
//     return false;
// }
// return new RegExp(letter, "gi").test(word)

function isCorrectGuess(word, letter){
    return !!word.match(letter);
    // if (word.match(letter)){
    //     return true
    // }return false
};


//function for blanks of the word

function getBlanks(word) {
    var blankWord = [];
    for ( var i=0 ; i < word.length ; i+=1)  {
        blankWord.push('_');
    }
    return blankWord;
};


//funtion to fill in the blank with the guessed letter

function fillBlanks(randomWord, currentPuzzleState, letter) {
    
    for ( var i=0; i < randomWord.length; i+=1) {
        if (randomWord[i] === letter) {
            currentPuzzleState[i] = letter;
        }
    }
    return currentPuzzleState;
};


// creating the game round object.

function setupRound(theWord) {
    var roundObject = {
        word:theWord,
        guessesLeft:9,
        wrongGuesses:[],
        puzzleState:getBlanks(theWord),
    }
    return roundObject;
};

//updating the game base on correct guessed

function updateRound(round,letter) {
    if (isCorrectGuess(round.word,letter)) {
        round.puzzleState = fillBlanks(round.word,round.puzzleState,letter);

    }
    else {
        round.guessesLeft -=1;
        round.wrongGuesses.push(letter);
    }
};

//check to see if user has won the round or not 

function hasWon(puzzleState) {
    // setupRound.puzzleState=puzzleState;
    if (puzzleState.toString().match('_')) {
        return false }
        else {
            return true
        }
    };

function hasLost(guessesLeft) {
    // setupRound.guessesLeft=guessesLeft
    if (guessesLeft!== 0 ) {
        return false
    }
    else {
        return true
    }
};

//letting me know if i should start a new round 

function isEndOfRound(round) {
    var won=hasWon(round.puzzleState);
    var lost=hasLost(round.guessesLeft);
    if (won||lost){
        return true;
    }
    else{
        return false;
    }
    
};


//track higher-level information


function setupGame(gameArr,numWin,numLost) {
    var gameObj = {
        words:gameArr,
        wins:numWin,
        losses:numLost,
        round:setupRound(randomWord(gameArr)),

    }
    return gameObj;
};

//start a new round on the game

function startNewRound(theRound) {
    var won=hasWon(theRound.round.puzzleState);
    var lost=hasLost(theRound.round.guessesLeft);
    if (won) {
        theRound.wins+=1;
        alert('Excellent you won!!\uD83D\uDE00 the word is '+theRound.round.word);
    }
    else if(lost) {
        theRound.losses+=1;
        alert(theRound.round.word);
    }

    };


//updates the game when user interacts with it. 

var myGame = setupGame(gameWords,0,0);






//Adding my logic to my html pages

document.getElementById('puzzle-state').innerHTML= (myGame.round.puzzleState.join(' '));
document.getElementById('wrong-guesses').innerHTML ="Wrong Guesses: " + myGame.round.wrongGuesses;
document.getElementById('guesses-left').innerHTML ="Guesses Left: " + myGame.round.guessesLeft; 
document.getElementById('winning-label').innerHTML = "Wins: " + myGame.wins;
document.getElementById('losses-label').innerHTML ="Losses: " + myGame.losses;




// adding the game logic 

document.onkeyup = function(event) {
    // playAudio();
    var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
    if (isEndOfRound(myGame.round) === false) {
        updateRound(myGame.round, keyPressed);
        document.getElementById("puzzle-state").innerHTML = myGame.round.puzzleState.join(' ');
        document.getElementById("wrong-guesses").innerHTML = "Wrong Guesses: " + myGame.round.wrongGuesses;
        document.getElementById("guesses-left").innerHTML = "Guesses Left: " + myGame.round.guessesLeft;
    } else {
         startNewRound(myGame); 
         document.getElementById("win-counter").innerHTML = "Wins: " + myGame.wins;
         document.getElementById("loss-counter").innerHTML = "Losses: " + myGame.losses;
        //  reset();
    }
}




