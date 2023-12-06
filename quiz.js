    var questions = [
        {
            question: "An easy one. What Videogame is this Audio from?",
            audio:"music/Mario.mp3",
            options: ["Super Mario Bros.", "Kirby", "Legends of Zelda", "Sonic the Hedgehog"],
            correctAnswer: 0,
        },
        {
            question: "You should know this one too. A classic.",
            audio:"music/Pokemon.mp3",
            options: ["Metroid Prime", "Mariokart", "Pokémon", "Super Smash Bros"],
            correctAnswer: 2,
        },
        {
            question: "What about this one?",
            audio:"music/KH.mp3",
            options: ["Kingdom Hearts", "Final Fantasy", "World of Warcraft", "DOOM"],
            correctAnswer: 0,
        },
        {
            question: "Now this is a personal favourite!",
            audio:"music/Skyrim.mp3",
            options: ["Kingdom Come: Deliverance", "The Witcher 3: Wild Hunt", "Fallout 4", "The Elder Scrolls V: Skyrim"],
            correctAnswer: 3,
        },
        {
            question: "You are a nerd if you know this one.",
            audio:"music/Halo.mp3",
            options: ["Starcraft", "Halo", "Mass Effect", "Starfield"],
            correctAnswer: 1,
        },
        {
            question: "No shame if you have to guess. You should try out this game tho.",
            audio:"music/Hunt.mp3",
            options: ["Red Dead Redemption", "Red Dead Revolver", "Desperados Series", "Hunt Showdown"],
            correctAnswer: 3,
        },
        {
            question: "Oh the memories...",
            audio:"music/GTA.mp3",
            options: ["GTA Vice City", "GTA San Andreas", "GTA IV", "GTA V"],
            correctAnswer: 1,
        },
        {
            question: "Last one!",
            audio:"music/Nate.mp3",
            options: ["Borderland 3", "Uncharted", "The Last of Us 2", "Assassin's Creed Valhalla"],
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

        /*const audioElement = document.getElementById("question-container");
        let musicPLayer = `
                          <div> ${question.question} </div>
                          <audio controls>
                            <source src=${question.audio} type="audio/mpeg">
                          Your browser does not support the audio element.
                          </audio>
                          `
        audioElement.innerHTML = musicPLayer;*/

    document.getElementById("question-text").textContent = question.question;

    // Set the audio source dynamically
    const audioElement = document.getElementById("question-audio");
    audioElement.src = question.audio;
    audioElement.load();


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
