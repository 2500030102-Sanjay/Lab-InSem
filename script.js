// Questions stored in a JavaScript array of objects

const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "JavaScript", "Java"],
        answer: "CSS"
    },

    {
        question: "Which language is used to make web pages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "float"],
        answer: "var"
    },

    {
        question: "Which method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "getById()"
        ],
        answer: "getElementById()"
    }
];


// Current question number
let currentQuestion = 0;

// Store user's answers
let userAnswers = new Array(questions.length).fill(null);


// Display highest score from Local Storage
let highScore = localStorage.getItem("highScore");

if (highScore === null) {
    highScore = 0;
}

document.getElementById("highScore").innerHTML =
    "Highest Score: " + highScore + " / " + questions.length;


// Display question
function displayQuestion() {

    let q = questions[currentQuestion];

    document.getElementById("question").innerHTML =
        q.question;

    let optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";


    // Dynamically create options
    q.options.forEach(function(option) {

        let button = document.createElement("button");

        button.innerHTML = option;

        button.classList.add("option");

        // Show previously selected answer
        if (userAnswers[currentQuestion] === option) {
            button.classList.add("selected");
        }

        // Select answer
        button.onclick = function() {

            userAnswers[currentQuestion] = option;

            // Remove selected class from all options
            let allOptions =
                document.querySelectorAll(".option");

            allOptions.forEach(function(btn) {
                btn.classList.remove("selected");
            });

            // Highlight selected option
            button.classList.add("selected");
        };

        optionsDiv.appendChild(button);
    });


    // Display question number

    document.getElementById("questionNumber").innerHTML =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    // Previous button

    if (currentQuestion === 0) {
        document.getElementById("prevBtn").disabled = true;
    } else {
        document.getElementById("prevBtn").disabled = false;
    }


    // Next button

    if (currentQuestion === questions.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
    } else {
        document.getElementById("nextBtn").style.display = "block";
    }
}


// Go to next question

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        displayQuestion();
    }
}


// Go to previous question

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        displayQuestion();
    }
}


// Submit quiz

function submitQuiz() {

    let score = 0;


    // Calculate score

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] === questions[i].answer) {

            score++;
        }
    }


    // Check highest score

    let oldHighScore =
        localStorage.getItem("highScore");

    if (oldHighScore === null) {
        oldHighScore = 0;
    }


    // Store new highest score

    if (score > Number(oldHighScore)) {

        localStorage.setItem("highScore", score);

        highScore = score;
    }


    // Display result

    document.getElementById("result").innerHTML =
        "Your Score: " +
        score +
        " / " +
        questions.length +
        "<br><br>" +
        "Highest Score: " +
        highScore +
        " / " +
        questions.length;


    // Hide quiz

    document.getElementById("quiz").style.display = "none";
}


// Start the quiz

displayQuestion();