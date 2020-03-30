
// Var with array and object for questions 
var questions = [
    {
        title: "What does CSS stand for?",
        choices: ["Creative Style Screens", "Crazy Sand Sharks", "Cascading Style Shirts", "Cascading Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        title: "What is the correct HTML for referring to an external style sheet?",
        choices: ["<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">", "<link rel=\"styles\" type=\"text/css\" href=\"mystyle.css\">", "<link rel=\"text/css\" type=\"text/css\" href=\"mystyle.css\">", "<link rel=\"mystyle.css\" type=\"text/css\" href=\"style.css\">"],
        answer: "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
    },
    {
        title: "Which represents the id in the line of code: var element = document.querySelector(\"#main\")?",
        choices: ["element", "query", "Selector", "main"],
        answer: "main",
    },
    {
        title: "String values can contain _________________.",
        choices: ["only letters", "both letter and numbers ", "only special characters", "All of the above"],
        answer: "All of the above",
    },
    {
        title: "Which is FALSE when using the following method: \"document.getElementById(\"demo\")",
        choices: ["The getElementById() method returns the element that has the ID attribute with the specified value", "This method is one of the most common methods in the HTML DOM", "Returns null if no elements with the specified ID exists", "the ID attribute is \"demo\""],
        answer: "the ID attribute is document"
    }];
// VARIABLES
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper"); 

// TIME PARAMETERS
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

// TIMER AND USER DISPLAY
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// RENDERS QUESTIONS
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// COMPARE CHOICES WITH ANSWERS
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        }
        else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Sorry, the correct answer is: " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "You have completed part 1 of 43... JUST KIDDING!!! You finished the quiz with " + score + " out of " + questions.length + " correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
    function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./HighScores.html");
        }
    });

}


