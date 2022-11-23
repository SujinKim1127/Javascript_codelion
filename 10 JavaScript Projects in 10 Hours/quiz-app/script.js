const quizData = [
    {
        question: 'How old is Florin?',
        a: "10",
        b: '17',
        c: "26",
        d: "110",
        correct: 'c'
    }, {
        question: 'What is the most used programming language in 2022',
        a: "java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: 'a'
    },{
        question: 'Who is he President of US?',
        a: 'Florin Pop',
        b: 'Donald Trump',
        c: 'Ivan Saldano',
        d: 'Mihai Andrei',
        correct: 'b'
    },{
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Jason Object Notation',
        d: 'Helicopters Terminals Motorboats Lamborginis',
        correct: 'a'
    },{
        question: 'What year was JavaSCript launched?',
        a: '1996',
        b: '1995',
        c: '1994',
        d: 'none of the above',
        correct: 'd'

    }
];
const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");

const questionEl = document.getElementById('question');
const a_text = document.getElementById("a_text");
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

// 답이 선택 되었는지 확인하는 함수
function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if(answerEl.checked) answer = answerEl.id;
    })
    return answer
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    })
}

submitBtn.addEventListener("click", () => {

    // check to see the answer
    const answer = getSelected();
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) score++;
        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        }
        else{
            // TODO: Show results
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions. </h2>
                <button onclick="location.reload()">Reload</button>`
        }
    }

    // loadQuiz();
})