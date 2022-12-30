var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions")
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startBtn");
var startQuizDiv = document.getElementById("startPage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("name");
var highscoreDisplayName = document.getElementById("highscore-name");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score")
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz Questions
var quizQuestions = [{
    question: "Who is the only actor to receive an Oscar Nomination for acting in a 'Lord of the Rings' movie?",
    choiceA: "Elijah Wood",
    choiceB: "Orlando Bloom",
    choiceC: "Viggo Mortensen",
    choiceD: "Ian McKellen",
    correctAnswer: "d" },
{
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "" },
    {
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "" },
    {
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctAnswer: "" },
]

// Additional Variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 180;
var timerInterval;
var score = 0;
var correct;

// Function to Generate the Quiz
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz Function
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    // Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time Left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
console.log(highscoreInputName)

// Show Score Function
function showScore() {
    quizBody.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// Submit Button
submitScoreBtn.addEventListener("click", function highscore() {
    if(highscoreInputName.value === "") {
        alert("Name cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

// Generate High Scores Function
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Show High Score Function
function showHighscore() {
    startQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";

    generateHighscores();
}

//Check Answer Function
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    } else {
        showScore();
    }
}

// This button will start the quiz
startQuizButton.addEventListener("click", startQuiz);
