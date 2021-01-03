//DOM element variables
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
var fiveMinutes = 2 * 1; //*****CHANGE!!! 1 to 5 for 5 minutes  & 30 to 60
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

var start;
// Start Countdown function at click event
function startCountDown() {
    start = setTimeout(function (){
        display = document.querySelector('#time'),
        setTimer(fiveMinutes, display);
    })
};
startEl.addEventListener("click", startCountDown);

//Stop Timer
function stopCountDown() {
    clearTimeout(start);
    showScore;
}

// Quiz Start
function startQuiz() {
    startEl.style.display = "none"; //hide start button
    renderQuestion();
    quiz.style.display = "block";
}

//If Answer is Correct or Incorrect
function checkAnswer(answer) {
    if (answer === questions[currentArrQuestion].correct) {
        alert("Correct!");
        // increase score
        score++;
    } else {
        alert("Incorrect!");
        // decrease time by 30 seconds
        //fiveMinutes -= 30;
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

