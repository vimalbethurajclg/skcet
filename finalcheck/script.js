let q = [
    {
        numbe: 1,
        question: "What are the three main components of a bipolar junction transistor (BJT) and what is their function?",
        answer: "A) Collector, Emitter, Base – The Collector collects current, the Emitter emits current, and the Base controls the current flow between the Collector and Emitter.",
        options: [
            "A) Collector, Emitter, Base – The Collector collects current, the Emitter emits current, and the Base controls the current flow between the Collector and Emitter.",
            "B) Source, Gate, Drain – The Source provides current, the Gate controls the current flow, and the Drain collects the current.",
            "C) Anode, Cathode, Gate – The Anode emits current, the Cathode collects current, and the Gate controls the flow.",
            "D) Positive, Negative, Neutral – The Positive provides current, the Negative collects current, and the Neutral stabilizes the circuit."
        ]
    },
    {
        numbe: 2,
        question: "Which type of transistor is known for its high input impedance and low output impedance, making it ideal for amplification applications?",
        answer: "B) Field-Effect Transistor (FET)",
        options: [
            "A) Bipolar Junction Transistor (BJT)",
            "B) Field-Effect Transistor (FET)",
            "C) Darlington Transistor",
            "D) Insulated Gate Bipolar Transistor (IGBT)"
        ]
    },
    {
        numbe: 3,
        question: "In a NPN transistor, which terminal is typically connected to the positive voltage supply?",
        answer: "C) Collector",
        options: [
            "A) Emitter",
            "B) Base",
            "C) Collector",
            "D) Gate"
        ]
    },
    {
        numbe: 4,
        question: "What is the primary function of the base terminal in a Bipolar Junction Transistor (BJT)?",
        answer: "B) To control the current flow between the collector and emitter",
        options: [
            "A) To emit current",
            "B) To control the current flow between the collector and emitter",
            "C) To collect current",
            "D) To supply power to the transistor"
        ]
    },
    {
        numbe: 5,
        question: "What is the main purpose of a transistor in electronic circuits?",
        answer: "C) To amplify or switch electronic signals",
        options: [
            "A) To act as a power source",
            "B) To store electrical energy",
            "C) To amplify or switch electronic signals",
            "D) To convert analog signals to digital"
        ]
    }
];

const startbutton = document.querySelector('.startbut');
const rulepage = document.querySelector('.rulespage');
const exitbut = document.querySelector('.exitbutton');
const mains = document.querySelector('.main');
const contbtn = document.querySelector('.continuebutton');
const quizsec = document.querySelector('.quiz-sec');
const nb = document.querySelector('.nextq');
const resultPage = document.querySelector('.result-page');

let count = 0;
let numb = 1;
let userscore = 0;

startbutton.onclick = () => {
    rulepage.classList.add('active');
    mains.classList.add('active');
};

exitbut.onclick = () => {
    rulepage.classList.remove('active');
    mains.classList.remove('active');
};

contbtn.onclick = () => {
    quizsec.classList.add('active');
    rulepage.classList.remove('active');
    mains.classList.remove('active');
    showq(count);
    qcount(numb);
};

nb.onclick = () => {
    if (count < q.length - 1) {
        count++;
        numb++;
        showq(count);
        qcount(numb);
        nb.textContent = 'Next'; // Reset the button text
        nb.classList.remove('active');
    } else {
        // Show result page
        quizsec.classList.remove('active');
        resultPage.classList.add('active');
        showResult();
    }
};

function showq(index) {
    const ques1 = document.querySelector('.qtext');
    ques1.textContent = `${q[index].numbe}. ${q[index].question}`;

    let optiontag = q[index].options.map((option, i) => 
        `<div class="options"><span>${option}</span></div>`
    ).join('');

    document.querySelector('.optionlist').innerHTML = optiontag;

    const options = document.querySelectorAll('.options');
    options.forEach(option => {
        option.addEventListener('click', () => optionSelected(option));
    });
}

function optionSelected(answer) {
    nb.classList.add('active');
    let userans = answer.textContent;
    let corans = q[count].answer;
    let options = document.querySelectorAll('.options');

    options.forEach(option => option.classList.add('disable'));

    if (userans === corans) {
        userscore++;
        answer.classList.add('correct');
    } else {
        answer.classList.add('wrong');
        options.forEach(option => {
            if (option.textContent === corans) {
                option.classList.add('correct');
            }
        });
    }
    score();
}

function qcount(index) {
    const qtot = document.querySelector('.qtotal');
    qtot.textContent = `${index} of ${q.length} Questions`;
}

function score() {
    const score1 = document.querySelector('.topscore');
    score1.textContent = `Score : ${userscore} / ${q.length}`;
}

function showResult() {
    // Update result page content
    const resultText = document.querySelector('.result-page .text');
    resultText.innerHTML = `
        <h2>Quiz Results</h2>
        <p>You scored ${userscore} out of ${q.length}.</p>
        <button class="restart-button">Restart Quiz</button>
    `;

    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', () => {
        count = 0;
        numb = 1;
        userscore = 0;
        quizsec.classList.add('active');
        resultPage.classList.remove('active');
        showq(count);
        qcount(numb);
        score();
    });
}
