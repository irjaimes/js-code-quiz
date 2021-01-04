//DOM element variables
let highScoresEl = document.getElementById("high-scores");
let introEl = document.getElementById("quick-intro");
let startEl = document.getElementById("start");
let quiz = document.getElementById("quiz");
let questionEl = document.getElementById("question");
let choiceAel = document.getElementById("A");
let choiceBel = document.getElementById("B");
let choiceCel = document.getElementById("C");
let choiceDel = document.getElementById("D")
let counterEl = document.getElementById("counter");
let rightWrongEl = document.getElementById("right-wrong");
let scoreEl = document.getElementById("scoreContainer");

//QUESTIONS ARRAY
var questions = [
    //question, answer choices, correct answer
    {
        question: "What other programming language is Javascript typically paired with?", //key-left  value-right
        choiceA: "A. HTML",
        choiceB: "B. CSS",
        choiceC: "C. Neither A or B",
        choiceD: "D. Both A & B",
        correct: "D" //exact text here
    },
    {
        question: "Which of the following are variable keywords in Javascript?",
        choiceA: "A. var, let, const",
        choiceB: "B. num, noms",
        choiceC: "C. for, per",
        choiceD: "D. one, two, three",
        correct: "A"
    },
    {
        question: "Arrays need to be enclosed in which of the following?",
        choiceA: "A. curly braces {}",
        choiceB: "B. square brackets []",
        choiceC: "C. parentheses ()",
        choiceD: "D. asterisks **",
        correct: "B"
    },
    {
        question: "What can Javascript Do?",
        choiceA: "A. Javascript can change HTML content, attribute values, and styles",
        choiceB: "B. Javascript can hide and show HTML Elements",
        choiceC: "C. Both A & B",
        choiceD: "D. Neither A or B",
        correct: "C"
    },
    {
        question: "What does DOM stand for?",
        choiceA: "A. Document Object Model",
        choiceB: "B. Document Object Module",
        choiceC: "C. Dominant Obsticle Model",
        choiceD: "D. Dominant Obsticle Module",
        correct: "A"
    },
]

// global variables
var lastArrQuestion = questions.length - 1;
var currentArrQuestion = 0;
var score = 0;
var fiveMinutes = 60 * 5; 
var Timer;


// Display Current Question & Answer Choices
function renderQuestion() {
    var q = questions[currentArrQuestion]; //set variable to accesss the current question in array

    questionEl.innerHTML = "<p>" + q.question + "</p>";

    choiceAel.innerHTML = q.choiceA;
    choiceBel.innerHTML = q.choiceB;
    choiceCel.innerHTML = q.choiceC;
    choiceDel.innerHTML = q.choiceD;
}
startEl.addEventListener("click", startQuiz);


////////    TIMER    ///////

//  Set Timer function to set counter to 00:00 format
function setTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//Stop Timer
function stopCountDown() {
    clearTimeout(start);
    showScore;
}


////////    QUIZ SCREEN    ///////

// Quiz Start
function startQuiz() {
    score = 0;
    startEl.style.display = "none"; //hide start button
    introEl.style.display = "none";
    quiz.style.display = "block";

    renderQuestion();
}

// Start Countdown function at click event
var start;
function startCountDown() {
    start = setTimeout(function () {
        display = document.querySelector('#time'),
            setTimer(fiveMinutes, display);
    })
};
startEl.addEventListener("click", startCountDown);

//Check if Answers Correct or Incorrect
function checkAnswer(selectedAnswer) {
    var clickedChoice = "right!";
    if (selectedAnswer === questions[currentArrQuestion].correct) {
        // increase score
        score++;
        localStorage.setItem("recentScore", score); 
    } else {
        clickedChoice = "wrong!";
        // ADD time decrease by 30 seconds below
        fiveMinutes -= 30;   
    } 
    rightWrongEl.innerText = clickedChoice;
   
    // Check question left, to go to next question
    if (currentArrQuestion < lastArrQuestion) {
        setTimeout(() => {
            currentArrQuestion++;
            renderQuestion();
            rightWrongEl.innerText = "";
        }, 1000);
    } else if (lastArrQuestion) {
        setTimeout(() => {
            //got to score screen
            showScore();
            //ADD time stop function 
        }, 1000);
    }
    else {
        // end the quiz and show score
        //clearInterval(timer);
        showScore();
    }
}


////////    SCORES SCREEN    ///////


//Create Score Container child elements
var resultsHeader = document.createElement("h1");
resultsHeader.setAttribute("id", "results-title");
resultsHeader.innerText = "Your Results:";
var yourScore = document.createElement("h3");
yourScore.setAttribute("id", "your-score");
resultsHeader.appendChild(yourScore);
scoreEl.appendChild(resultsHeader);

//Show score 


function showScore() {
    quiz.style.display = "none";
    scoreEl.style.display = "block";
    //calculate score
    var scorePerCent = Math.round(100 * score / questions.length);
    //display score percentage
    yourScore.innerText = scorePerCent + "/100";
}

//CREATE Form and child elements 
var formEl = document.createElement("formEl");
formEl.setAttribute("id", "formEl");
// CREATE an <p> element for user instructions
var userInstructEl = document.createElement("p");
userInstructEl.innerText = ("Enter your initialsEl: ");
userInstructEl.setAttribute("id", "userInstructEl");
// CREATE an input element for user initials
var initialsEl = document.createElement("input");
initialsEl.setAttribute("type", "text");
initialsEl.setAttribute("name", "initialsEl");
initialsEl.setAttribute("id", "userInitials")
initialsEl.setAttribute("placeholder", "your initialsEl");
// CREATE a SAVE button 
var saveBtnEl = document.createElement("button");
saveBtnEl.setAttribute("id", "saveScoreBtn")
saveBtnEl.setAttribute("class", "btn")
saveBtnEl.setAttribute("type", "submit");
saveBtnEl.setAttribute("onclick", "saveHighScore(event)");
saveBtnEl.setAttribute("value", "Save");
saveBtnEl.setAttribute("disabled", "true");
saveBtnEl.textContent = "Save";
// CREATE a Retake button 
var retakeBtnEl = document.createElement("button");
retakeBtnEl.setAttribute("id", "retakeBtn")
retakeBtnEl.setAttribute("class", "btn")
retakeBtnEl.setAttribute("type", "submit");
retakeBtnEl.setAttribute("onClick", "location.href='index.html'");
retakeBtnEl.setAttribute("value", "Retake");
retakeBtnEl.textContent = "Retake";
// APPENDING child elements to parent elements 
formEl.appendChild(userInstructEl);
formEl.appendChild(initialsEl);
formEl.appendChild(saveBtnEl);
formEl.appendChild(retakeBtnEl);
scoreEl.append(formEl);

// Save Score Variables
var saveScoreBtn = saveBtnEl;
var userName = initialsEl;
var finalScore = yourScore.innerText;////
var recentScore = localStorage.getItem("recentScore");
finalScore.innerText = recentScore;

//need to conver string to interger and do math to ger score
function finalScoreConvert() {

}

//function to Disable Save Button until field is filled
userName.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !userName.value
});

//Save high scores onclick: saveHighScore(event)
saveHighScore = e => {
    console.log("clicked save button")
    e.preventDefautl();

    var savedResults = {
        user: initialsEl.value,
        score: userScore 
    };

console.log(savedResults);

};



//Retrive Scores List DOM variables
highScoresEl.setAttribute("onClick", "retriveScores(event)");
var scoreListEl = document.createElement("ul");
scoreListEl.setAttribute("id", "score-list");
var listItemEl = document.createElement("li");
listItemEl.setAttribute("id", "list-item");
scoreListEl.appendChild(listItemEl);
highScoresEl.appendChild(scoreListEl);


retriveScores = e =>{
    startEl.style.display = "none"; //hide start button
    introEl.style.display = "none";
    quiz.style.display = "none";
    scoreEl.style.display = "none";


    console.log("list of high scores");
    
}

