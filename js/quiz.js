// 1. The questions: an array of objects.
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlinks and Text Markup Logic",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<head>", "<h6>", "<h1>", "<heading>"],
    correct: 2
  },
  {
    question: "Which CSS property changes the text colour of an element?",
    options: ["font-color", "color", "text-style", "foreground"],
    correct: 1
  },
  {
    question: "Which CSS layout system is built for two-dimensional grids of rows and columns?",
    options: ["Float", "Inline-block", "CSS Grid", "Table-layout"],
    correct: 2
  },
  {
    question: "Which symbol starts a single-line comment in JavaScript?",
    options: ["//", "<!--", "#", "**"],
    correct: 0
  },
  {
    question: "Which keyword declares a variable whose value cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    correct: 2
  },
  {
    question: "What does console.log(typeof 42) print?",
    options: ['"string"', '"number"', '"integer"', '"object"'],
    correct: 1
  },
  {
    question: "Which array method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "append()"],
    correct: 0
  },
  {
    question: "Which HTML attribute makes a form field compulsory?",
    options: ["mandatory", "needed", "required", "validate"],
    correct: 2
  },
  {
    question: "What does the === operator check in JavaScript?",
    options: [
      "Only that the values look similar",
      "That the value and the type are both equal",
      "That the variable names match",
      "That the value is greater than or equal"
    ],
    correct: 1
  }
];

// 2. Grab the page elements to update.
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const questionCount = document.getElementById("question-count");
const scoreDisplay = document.getElementById("score-display");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const finalScore = document.getElementById("final-score");
const totalQuestions = document.getElementById("total-questions");
const resultMessage = document.getElementById("result-message");

// 3. The quiz state.
let currentIndex = 0;
let score = 0;
let answered = false;

// 4. Show the current question and build its option buttons with a loop.
function showQuestion() {
  const current = questions[currentIndex];
  answered = false;

  questionCount.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;
  questionText.textContent = current.question;

  // Clear the old options and feedback.
  optionsBox.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.disabled = true;

  // The next button says "See result" on the final question.
  if (currentIndex === questions.length - 1) {
    nextBtn.textContent = "See result";
  } else {
    nextBtn.textContent = "Next question";
  }

  // Loop through the options and create one button for each.
  for (let i = 0; i < current.options.length; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = current.options[i];
    button.dataset.index = i;
    button.addEventListener("click", () => selectAnswer(i));
    optionsBox.appendChild(button);
  }
}

// 5. Check the chosen answer, colour the buttons and update the score.
function selectAnswer(chosenIndex) {
  if (answered) return; // ignore extra clicks after answering
  answered = true;

  const correctIndex = questions[currentIndex].correct;
  const optionButtons = optionsBox.querySelectorAll(".option");

  // Loop through every button: lock it, then colour it.
  optionButtons.forEach((button, i) => {
    button.disabled = true;

    if (i === correctIndex) {
      button.classList.add("correct");
    } else if (i === chosenIndex) {
      button.classList.add("wrong");
    }
  });

  if (chosenIndex === correctIndex) {
    score++;
    feedback.textContent = "Correct!";
    feedback.classList.add("good");
  } else {
    feedback.textContent = "Not quite. The correct answer is highlighted in green.";
    feedback.classList.add("bad");
  }

  scoreDisplay.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
  nextBtn.focus();
}

// 6. Move to the next question, or finish the quiz.
function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 7. Show the final score with a message that depends on how well they did.
function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = score;
  totalQuestions.textContent = questions.length;

  const percent = (score / questions.length) * 100;
  let message;

  if (percent === 100) {
    message = "Perfect score! You really know your web basics.";
  } else if (percent >= 80) {
    message = "Great job! You're nearly there.";
  } else if (percent >= 50) {
    message = "Good effort. A little more practice and you'll ace it.";
  } else {
    message = "Keep going! Review the basics and try again.";
  }

  resultMessage.textContent = message;
}

// 8. Restart: reset the state and show the first question again.
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
}

// 9. Wire up the buttons and start.
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

showQuestion();
