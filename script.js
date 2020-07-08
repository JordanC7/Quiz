const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.classList.add('hide')


nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()

})

function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    resetScore();

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
    }
    if (correct) {
        addPoints(1);
    } else {
        addPoints("");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Adding our questions here 
const questions = [{
        question: 'What is JavaScript?',
        answers: [
            { text: 'The same thing as Java.', correct: false },
            { text: 'A programming language that allows you to make web pages interactive.', correct: true, },
            { text: 'A type of coffee with a pen dipped into it.', correct: false },
            { text: 'Hyper Text Markup Language.', correct: false }

        ]
    },
    {
        question: 'Who invented JavaScript?',
        answers: [
            { text: 'Harley Quinn', correct: false },
            { text: 'Maxwell Nelson', correct: false },
            { text: 'Tim Berners-Lee', correct: false },
            { text: 'Brendan Eich', correct: true }
        ]
    },
    {
        question: 'What is one kind of DATA TYPE a variable can hold?',
        answers: [
            { text: 'Drink', correct: false },
            { text: 'Calendar', correct: false },
            { text: 'Excel spreadsheet', correct: false },
            { text: 'Array', correct: true }
        ]
    },
    {
        question: 'How can you make a comment in JavaScript?',
        answers: [
            { text: '<!--This is my comment--!>', correct: false },
            { text: '(This is my comment)', correct: false },
            { text: 'THIS IS MY COMMENT', correct: false },
            { text: '// This is my comment', correct: true }
        ]
    },
    {
        question: 'How can you include a pop-up window to warn the user of something?',
        answers: [
            { text: 'prompt("Danger!")', correct: false },
            { text: 'alert("Danger!")', correct: true },
            { text: 'confirm("Is this dangerous?")', correct: false },
            { text: 'function()', correct: false }
        ]
    },
]



// Countdown timer here
const startingMinutes = 10;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    // taking all seconds & divide by 60 to get the minutes
    // math.floor to get lowest number without the seconds 
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;

    // clear the time when time's up 
    if (time < 0) {
        clearInterval(updateCountdown);
        document.getElementById("countdown").innerHTML = "Time's up.";
    }
    1000;
}

// Scorekeeper
let score = 0;

function addPoints(pointsValue) {
    score = score + pointsValue;
    scoreElement.innerText = "Score: " + score;
    console.log("score: " + score);
}

function resetScore() {
    score = 0;
    scoreElement.innerText = "Score: " + score;
}