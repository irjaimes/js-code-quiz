//DOM Element variables
var questEl = document.getElementsByClassName("question")
var startEl = document.getElementById("start");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
//var qImg = document.getElementById("qImg");
var choiceAel = document.getElementById("A");
var choiceBel = document.getElementById("B");
var choiceCel = document.getElementById("C");
var choiceDel = document.getElementById("D");
var counterEl = document.getElementById("counter");
//var timeGaugeEl = document.getElementById("timeGauge");
//var progressEl = document.getElementById("progress");
var scoreEl = document.getElementById("scoreContainer");
var highScoresEl = document.getElementById("high-scores")

//QUESTIONS ARRAY
var questions = [
    //question, answer choices, correct answer
    {
        question: "What is Javascript?", //key-left  value-right
        choiceA: "A. Javascript is the programming language for the web.",
        choiceB: "B. Javascript can update and change both HTML and CSS",
        choiceC: "C. Javascript can calculate, manipulate, and validate data.",
        choiceD: "D. All the above.",
        correct: "D. All the above." //exact text here
    },
    {
        question: "What are variables in Javascript?",
        choiceA: "A. a key and value set",
        choiceB: "B. numbers",
        choiceC: "C. containers that store data values",
        choiceD: "D. a combination of numbers and symbols",
        correct: "C. containers that store data values"
    },
    {
        question: "What is the difference between a variable and an object?",
        choiceA: "A. a variable can contain more than one value",
        choiceB: "B. an object is a varible that can contain more than one value",
        choiceC: "C. they are the same thing",
        choiceD: "D. objects don't hold values",
        correct: "B. an object is a varible that can contain more than one value"
    },
    {
        question: "What can Javascript Do?",
        choiceA: "A. Javascript can change HTML content, attribute values, and styles",
        choiceB: "B. Javascript can hide and show HTML Elements",
        choiceC: "C. Both A & B",
        choiceD: "D. Neither A or B",
        correct: "C. Both A & B"
    },
    {
        question: "What does DOM stand for?",
        choiceA: "A. Document Object Model",
        choiceB: "B. Document Objects Module",
        choiceC: "C. Dominant Object Model",
        choiceD: "D. Dominant Obsticle Module",
        correct: "A. Document Object Model"
    },
]

// Global Variables
var lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 60000 * 10; //10 minutes
//var gaugeWidth = 150; // 150px
//var gaugeUnit = gaugeWidth / questionTime;
let Timer;
let score = 0;

// Function to Display Question & Answer Choices
function renderQuestion() {
    var q = questions[currentQuestion];

    questionEl.innerHTML = "<p>" + q.question + "</p>";
    choiceAel.innerHTML = q.choiceA;
    choiceBel.innerHTML = q.choiceB;
    choiceCel.innerHTML = q.choiceC;
    choiceDel.innerHTML = q.choiceD;
}

startEl.addEventListener("click", startQuiz);

// render progress
function renderProgress() {

    for (var questIndex = 0; questIndex <= lastQuestion; questIndex++) {

        progress.innerHTML += "<div class='prog' id=" + questIndex + "></div>";

    }

}

// start quiz
function startQuiz() {
    startEl.style.display = "none";// remove start button
    renderQuestion(); //show question
    quizEl.style.display = "block";
    renderCounter(); //show counter

    //start timer & counter
    Timer = setInterval(renderCounter, 1000); // 1000ms = 1sec
}

/* render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}*/

// Counter Function
function renderCounter() {
    if (count <= questionTime) {
        counterEl.innerHTML = count;
        //timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (currentQuestion < lastQuestion) {

            currentQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(Timer);
            scoreRender();
        }
    }
}

// If Ansswer is Correct or Incorrect
function checkAnswer(answer) {
    if (answer == questions[currentQuestion].correct) {
        // answer is correct
        scoreEl++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(Timer);
        scoreRender();
    }
}

/*// Correct Answer Style
function answerIsCorrect(){
    document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
}

// Wrong Answer Style
function answerIsWrong(){
    document.getElementById(currentQuestion).style.backgroundColor = "#f00";

}*/

// Score calculate Function
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
                (scorePerCent >= 20) ? "img/2.png" :
                    "img/1.png";

    scoreEl.innerHTML = "<img src=" + img + ">";
    scoreEl.innerHTML += "<p>" + scorePerCent + "%</p>";
}



//previous scores
//var previousScores = document.createElement("p");
//previousScores.innerHTML("Check High Scores");
