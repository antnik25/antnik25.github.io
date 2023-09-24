const dom = {
    title: document.getElementById('title'),
    progress: {
        progressFill: document.getElementById('progress-fill'),
        questionNumber: document.getElementById('question-number'),
        totalQuestions: document.getElementById('total-questions'),
    },
    questionWrap: document.getElementById('question-wrap'),
    step: {
        question: document.getElementById('question'),
        questionPosition: document.getElementById('question-position'),
    },
    answers: document.getElementById('answers'),
    next: document.getElementById('next'),
    result: {
        resultBlock: document.getElementById('result'),
        validAnswers: document.getElementById('valid-answers'),
        questionsCount: document.getElementById('result-total-questions'),
    }
}
console.log(dom.result)
let totalSteps = data.questions.length
let step = 0
let result = 0
let validAnswersCount = 0
dom.title.innerHTML = data.title

dom.next.onclick = () => {
    step = step < totalSteps ? step + 1 : step
    renderQuiz(totalSteps, step)
    isDisableAnswers(false)
}

function renderQuiz(total, step) {
    renderProgress(total, step)
    if(step < total){
        const answers = data.questions[step].answers
        const answersHTML = buildAnswers(answers)
        renderQuestion(total, step)
        renderAnswers(answersHTML)
        isDisableButton(true)
        isDisableAnswers(false)
    } else if(step === total) {
        renderResults()
    }
    if(step + 1 === total) {
        changeButtonOnResult()
    }
}
renderQuiz(totalSteps, step)

function renderProgress(total, step) {
    const progressPersent = 100 / total * step
    dom.progress.questionNumber.innerHTML = step
    dom.progress.totalQuestions.innerHTML = total
    dom.progress.progressFill.style.width = `${progressPersent}%`
}

function renderQuestion(total, step) {
    const _step = step + 1 <= total ? step + 1 : step
    dom.step.questionPosition.innerHTML = `${_step}.`
    dom.step.question.innerHTML = data.questions[_step - 1].question
}

function buildAnswers(answers){
    const answersHTML = []
    answers.forEach((answer, idx) => {
        const html = `<div class="quiz__anwser" data-id="${idx+1}">${answer}</div>`
        answersHTML.push(html)
    })
    return answersHTML.join(' ')
}
const answersHTML = buildAnswers(data.questions[0].answers)

function renderAnswers(htmlString) {
    dom.answers.innerHTML = htmlString
}
dom.answers.onclick = (event) => {
    const target = event.target
    
    if(target.classList.contains('quiz__anwser')) {
        const answerNumber = target.dataset.id
        const isValid = checkAnswer(step, answerNumber)
        const answerClass = isValid ? 'quiz__anwser_valid' : 'quiz__anwser_invalid'
        target.classList.add(answerClass)
        isDisableButton(false)
        isDisableAnswers(true)
        validAnswersCount = isValid ? validAnswersCount + 1 : validAnswersCount 
    }
}
function checkAnswer (step, answer) {
    const validAnswer = data.questions[step].validAnswer
    return validAnswer == answer
}

function changeButtonOnResult() {
        dom.next.innerText = 'Посмотреть результат'
        dom.next.dataset.result = 'result'
}

function isDisableButton(isDisable) {
    if(isDisable) {
    dom.next.classList.add('quiz__btn_disable')
} else {
    dom.next.classList.remove('quiz__btn_disable')
}
}
function isDisableAnswers(isDis) {
    if(isDis) {
    dom.answers.classList.add('quiz__answers_disable')
} else {
    dom.answers.classList.remove('quiz__answers_disable')
}
}

function renderResults() {
    dom.answers.style.display = 'none'
    dom.next.style.display = 'none'
    dom.questionWrap.style.display = 'none'

    dom.result.resultBlock.style.display = 'flex'
    dom.result.validAnswers.innerHTML = validAnswersCount
    dom.result.questionsCount.innerHTML = totalSteps
}