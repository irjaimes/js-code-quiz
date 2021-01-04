//DOM element variables
let introEl = document.getElementById("quick-intro");
let startEl = document.getElementById("start");
let quiz = document.getElementById("quiz");
let questionEl = document.getElementById("question");
let choiceAel = document.getElementById("A");
let choiceBel = document.getElementById("B");
let choiceCel = document.getElementById("C");
let choiceDel = document.getElementById("D")
let counterEl = document.getElementById("counter");;
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
var fiveMinutes = 60 * 5; //*****CHANGE!!! to test
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
    startEl.style.display = "none"; //hide start button
    introEl.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
}

// Start Countdown function at click event
var start;
function startCountDown() {
    start = setTimeout(function (){
        display = document.querySelector('#time'),
        setTimer(fiveMinutes, display);
    })
};
startEl.addEventListener("click", startCountDown);

//Check if Answers Correct or Incorrect
function checkAnswer(answer) {
    if (answer === questions[currentArrQuestion].correct) {
        alert("Correct!");
        // increase score
        score++;
    } else {
        alert("Incorrect!");
        // decrease time by 30 seconds
        fiveMinutes -= 30;
    }
    // check questions left and time
    if (currentArrQuestion < lastArrQuestion) {
        currentArrQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(timer);
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
    const scorePerCent = Math.round(100 * score / questions.length);
    //display score percentage
    yourScore.innerText = scorePerCent + "/100";
}

//CREATE Form and child elements 
var form = document.createElement("form"); 
form.setAttribute("id", "form");  
// CREATE an <p> element for user instructions
var userInstruct = document.createElement("p"); 
userInstruct.innerText = ("Enter your initials: "); 
userInstruct.setAttribute("id", "userInstruct"); 
// CREATE an input element for user initials
var initials = document.createElement("input"); 
initials.setAttribute("type", "text"); 
initials.setAttribute("name", "initials"); 
initials.setAttribute("id", "userInitials")
initials.setAttribute("placeholder", "Your Initials"); 
// CREATE a SAVE button 
var saveBtn = document.createElement("button"); 
saveBtn.setAttribute("id", "saveScoreBtn")
saveBtn.setAttribute("class", "btn")
saveBtn.setAttribute("type", "submit"); 
saveBtn.setAttribute("onsubmit", "saveHighScore(event)");
saveBtn.setAttribute("value", "Save");
saveBtn.textContent = "Save";  
// CREATE a Retake button 
var retakeBtn = document.createElement("button"); 
retakeBtn.setAttribute("id", "saveScoreBtn")
retakeBtn.setAttribute("class", "btn")
retakeBtn.setAttribute("type", "submit"); 
retakeBtn.setAttribute("onClick", "location.href='index.html'");
retakeBtn.setAttribute("value", "Retake");
retakeBtn.textContent = "Retake"; 
// APPENDING child elements to parent elements 
form.appendChild(userInstruct);   
form.appendChild(initials);  
form.appendChild(saveBtn); 
form.appendChild(retakeBtn); 
scoreEl.append(form);  

