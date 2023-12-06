    var questions = [
        {
            question: "What is the capital of France?",
            audio:"music/Hunt.mp3",
            options: ["Paris", "Berlin", "London", "Madrid"],
            correctAnswer: 0,
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correctAnswer: 1,
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            correctAnswer: 1,
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const startContainer = document.getElementById("start-container");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const summaryContainer = document.getElementById("summary");

    function startQuiz() {
        startContainer.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    }

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.textContent = question.question;

        const audioElement = document.getElementById("question-container");
        let musicPLayer = `
                          <audio controls autoplay>
                            <source src=${question.audio} type="audio/mpeg">
                          Your browser does not support the audio element.
                          </audio>
                          `
        audioElement.innerHTML = musicPLayer;


        optionsContainer.innerHTML = "";
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  const options = optionsContainer.children;

  if (selectedIndex === question.correctAnswer) {
      options[selectedIndex].classList.add("correct");
      score++;
  } else {
      options[selectedIndex].classList.add("incorrect");
      options[question.correctAnswer].classList.add("correct");
  }

  // Disable further clicks on options
  for (let i = 0; i < options.length; i++) {
      options[i].disabled = true;
  }
}
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      resetOptions();
      loadQuestion();
  } else {
      showSummary();
  }
}

function resetOptions() {
  const options = optionsContainer.children;
  for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("correct", "incorrect");
      options[i].disabled = false;
  }
}

function showSummary() {
  quizContainer.style.display = "none";
  summaryContainer.style.display = "block";
  summaryContainer.textContent = `You scored ${score} out of ${questions.length} questions correctly!`;
}
