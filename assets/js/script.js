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
    question: "How many comedy movies did Adam Sandler either act in or produce between the years 2000 and 2010?",
    choiceA: "38",
    choiceB: "34",
    choiceC: "30",
    choiceD: "26",
    correctAnswer: "b" },
    {
    question: "How many actors have portrayed James Bond in film?",
    choiceA: "6",
    choiceB: "7",
    choiceC: "9",
    choiceD: "10",
    correctAnswer: "b" },
    {
    question: "What National Monument does Cary Grant climb in the heart-pounding final moments of 'North by Northwest'",
    choiceA: "Statue of Liberty",
    choiceB: "Grand Canyon",
    choiceC: "Mount Rushmore",
    choiceD: "Mount St. Helens",
    correctAnswer: "c" },
    {
    question: "Three of Jim Carrey's biggest blockbusters - 'The Mask', 'Dumb and Dumber', and 'Ace Ventura: Pet Detective' - were all released in what year?",
    choiceA: "1991",
    choiceB: "1993",
    choiceC: "1994",
    choiceD: "1996",
    correctAnswer: "c" },
    {
    question: "What Martin Scorsese movie holds the all-time record for F-bombs?",
    choiceA: "Goodfellas",
    choiceB: "Casino",
    choiceC: "The Departed",
    choiceD: "The Wolf of Wall Street",
    correctAnswer: "d" },
    {
    question: "Which movie star is killed off in the opening scene of Scream?",
    choiceA: "Drew Barrymore",
    choiceB: "Reese Witherspoon",
    choiceC: "Anna Farris",
    choiceD: "Carmen Electra",
    correctAnswer: "a" },
    {
    question: "In the 1997 Film 'Boogie Nights', Filmmaker Jack Horner is played by what actor?",
    choiceA: "Harrison Ford",
    choiceB: "Burt Reynolds",
    choiceC: "Marlon Brando",
    choiceD: "Al Pacino",
    correctAnswer: "b" },
    {
    question: "In 1980's 'The Blues Brothers', Jake orders ____ fried chickens and a coke.",
    choiceA: "3",
    choiceB: "4",
    choiceC: "5",
    choiceD: "6",
    correctAnswer: "b" },
    {
    question: "In 'Toy Story 3', we see a grown up version of Sid.  What is his occupation?",
    choiceA: "Gas Station Clerk",
    choiceB: "Mailman",
    choiceC: "Dishwasher",
    choiceD: "Garbageman",
    correctAnswer: "d" },
    {
    question: "Upon coming back from the First World War, Indiana Jones was an understudy to Abner Ravenwood. Which university was he studying in?",
    choiceA: "Princeton University",
    choiceB: "Harvard University",
    choiceC: "University of Chicago",
    choiceD: "University of Cairo",
    correctAnswer: "c" },
    {
    question: "In 'Back to the Future', what year does Marty McFly travel back in time to?",
    choiceA: "1945",
    choiceB: "1950",
    choiceC: "1955",
    choiceD: "1960",
    correctAnswer: "c" },
    {
    question: "In 'E.T.: The Extra-Terrestrial' what candy does Elliott use to lure E.T.?",
    choiceA: "Reese's Pieces",
    choiceB: "M&M",
    choiceC: "Hershey's Kiss",
    choiceD: "Twix",
    correctAnswer: "a" },
    {
    question: "How many Oscar wins did the movie 'The Shawshank Redemption' get?",
    choiceA: "7",
    choiceB: "5",
    choiceC: "3",
    choiceD: "0",
    correctAnswer: "d" },
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
function showHighScore() {
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
