//DOM elements
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions")
const currentScore = document.getElementById("current-score");
const answersContainer = document.getElementById("answers-container");
const progressbar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const RestartButton = document.getElementById("restart-quiz");

//questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//set variable
let score = 0;
let currentQuestionindex = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length
maxScoreSpan.textContent = quizQuestions.length

startBtn.addEventListener("click",startquiz)

function startquiz(){

  //Restart Vars
    currentQuestionindex = 0;
    score = 0;
    currentScore.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showquestions()
}

function showquestions(){

    answersContainer.innerHTML = "";

    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionindex];
    questionText.innerText = currentQuestion.question;
    currentQuestionSpan.innerText = currentQuestionindex + 1;
    const progresspercent = (currentQuestionindex/quizQuestions.length)*100
    progressbar.style.width = progresspercent + "%"

    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct
        
        button.addEventListener("click",selectAnswer)
        answersContainer.appendChild(button)
    })
}

function selectAnswer(event){
  if(answersDisabled) return

  answersDisabled = true

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button)=>{
    if(button.dataset.correct==="true"){
      button.classList.add("correct")
    }else if(button === selectedButton){
      button.classList.add("incorrect")
    }
  });

  if(isCorrect){
    score++;
    currentScore.textContent = score
  };

  setTimeout(()=>{
    currentQuestionindex++;

    if(currentQuestionindex<quizQuestions.length){
      showquestions()
    }else{
      showresults()
    }
  },1000)
};

function showresults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.innerText = score;

  const percentage = (score/quizQuestions.length)*100
  if(percentage === 100){
    resultMessage.innerText = "Perfect! You're a genius!"
  }else if(percentage >= 80){
    resultMessage.innerText = "Keep it up"
  }else if(percentage>=60){
    resultMessage.innerText = "Good effort! Keep learning!"
  }else if(percentage>=40){
    resultMessage.innerText = "Not bad! Try again to improve"
  }else{
    resultMessage.textContent = "Keep studying! You'll get better!";
  }

  RestartButton.addEventListener("click",restartbutton)
};

function restartbutton(){
  resultScreen.classList.remove("active")
  startquiz()
}