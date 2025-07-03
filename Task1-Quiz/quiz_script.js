const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HighText Machine Language", "None of these"],
    answer: 1
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "2005", "2010"],
    answer: 0
  },
  {
    question: "Which one is a JavaScript framework?",
    options: ["Django", "Flask", "React", "Laravel"],
    answer: 2
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const questionBox = document.getElementById("question-box");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(button);
  });

  // Update button text based on question index
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "Finish";
  } else {
    nextBtn.textContent = "Next Question";
  }

  nextBtn.classList.add("hide");
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === currentQuestion.answer) {
      btn.classList.add("correct");
    } else if (idx === selectedIndex) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedIndex === currentQuestion.answer) {
    score++;
  }

  nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionBox.classList.add("hide");
  nextBtn.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.add("hide");
  questionBox.classList.remove("hide");
  showQuestion();
});

// Start quiz
showQuestion();
