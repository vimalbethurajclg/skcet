const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
        image: "paris.jpg",
        background: "url('paris.jpg')"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        image: "mars.jpg",
        background: "url('mars.jpg')"
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
        image: "pacific.jpg",
        background: "url('pacific.jpg')"
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Charles Dickens", "Jane Austen", "Mark Twain", "William Shakespeare"],
        answer: "William Shakespeare",
        image: "shakespeare.jpg",
        background: "url('shakespeare.jpg')"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const quizElement = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const feedbackButton = document.getElementById('feedback-btn');
const feedbackContainer = document.getElementById('feedback-container');
const submitFeedbackButton = document.getElementById('submit-feedback-btn');
const confettiContainer = document.getElementById('confetti-container');
const meter = document.getElementById('meter');
const needle = document.getElementById('needle');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizElement.classList.remove('hidden');
    resultsElement.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.classList.add('choice-btn');
        choiceButton.addEventListener('click', () => selectChoice(choice, choiceButton));
        const listItem = document.createElement('li');
        listItem.appendChild(choiceButton);
        choicesElement.appendChild(listItem);
    });

    // Set the background for the current question
    document.body.style.backgroundImage = currentQuestion.background;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    // Animate the question and choices
    anime({
        targets: '#question',
        translateY: [-20, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 500
    });

    anime({
        targets: '.choice-btn',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
        duration: 500
    });
}

function selectChoice(choice, choiceButton) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.answer) {
        score++;
        choiceButton.style.backgroundColor = 'green';
        showConfetti();
    } else {
        choiceButton.style.backgroundColor = 'red';
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizElement.classList.add('hidden');
    resultsElement.classList.remove('hidden');
    scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
    showMeter();
}

function showMeter() {
    const scorePercentage = (score / questions.length) * 100;
    const angle = (scorePercentage / 100) * 180 - 90;
    needle.style.transform = `rotate(${angle}deg)`;

    // Animate the meter
    anime({
        targets: '#needle',
        rotate: [0, angle],
        easing: 'easeOutQuad',
        duration: 500
    });
}

function showFeedback() {
    resultsElement.classList.add('hidden');
    feedbackContainer.classList.remove('hidden');
}

function submitFeedback() {
    const feedback = document.getElementById('feedback').value;
    console.log('Feedback:', feedback);
    alert('Thank you for your feedback!');
    startQuiz();
}

function showConfetti() {
    const colors = ['#ff0', '#0f0', '#00f', '#f00', '#ff0', '#f0f'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiContainer.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }

    // Animate the confetti
    anime({
        targets: '.confetti',
        translateY: [-50, 100],
        opacity: [1, 0],
        rotate: {
            value: 360,
            duration: 2000,
            easing: 'easeInOutSine'
        },
        duration: 2000,
        easing: 'easeInOutQuad',
        delay: anime.stagger(10)
    });
}

restartButton.addEventListener('click', startQuiz);
feedbackButton.addEventListener('click', showFeedback);
submitFeedbackButton.addEventListener('click', submitFeedback);

startQuiz();

// Add ScrollReveal animations
ScrollReveal().reveal('#header', { delay: 200, distance: '50px', origin: 'top', easing: 'ease-in-out' });
ScrollReveal().reveal('#quiz-container', { delay: 400, distance: '50px', origin: 'bottom', easing: 'ease-in-out' });
