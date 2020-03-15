let player_name = 'Lulu';
let earnings = 0;
let mistakes_left = 3;

let current_question_index = 0;
let current_question_value = 0;
// GAME FUNCTIONS
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function grabQuestion(category, value) {
    shuffle(questions); // To pick a different one at random
    let question = "";
    for (let i=0; i<questions.length; i++) {
        if (questions[i].includes(category) && questions[i].includes(value)) {
            console.log('question found');
            current_question_index = i;
            current_question_value = +value.slice(1);
            question = questions[i][2];
            break;
        }
    }
    return question;
}

function checkAnswer(question, user_answer) {
    console.log(user_answer);
    user_answer = user_answer.toLowerCase();
    let correct_answer = false;
    question.forEach(answer => { if (answer == user_answer) correct_answer = true;})
    if (correct_answer) {
        screen.innerHTML = 'Correct';
        earnings += current_question_value;
    }
    else {
        screen.innerHTML = 'incorrect';
        mistakes_left--;
    }
    updateUserStats();
}

function updateUserStats() {
    document.getElementById('earnings').innerHTML = earnings;
    document.getElementById('mistakes').innerHTML = mistakes_left;
}

function gameover() {
    document.getElementById('player_name').innerHTML = player_name;
    document.getElementById('final_earnings').innerHTML = earnings;
    document.getElementById('gameover').style.visibility = "visible";
}

//EVENT LISTENERS

//GAME START
document.getElementById('submit-name').addEventListener('click', () =>
{
    player_name = document.getElementById('name-input').value;
    document.getElementById('greeting-screen').style = 'display: none !important';
    timer.style.visibility = 'hidden';
    answer_box.style.visibility = 'hidden';
    submit_answer.style.visibility = 'hidden';
});

//SUBMITTING ANSWER
document.getElementById('submit-question').addEventListener('click', (e) =>
{
    let user_answer = document.getElementById('answer-box').value;
    checkAnswer(questions[current_question_index], user_answer);
    document.getElementById('answer-box').value = "";
    document.getElementById('game-board').style.visibility = 'visible';
    answer_box.style.visibility = 'hidden';
    submit_answer.style.visibility = 'hidden';
    time = transition_time;
    temp = 0;
});

let values = document.querySelectorAll('.value');
//When a value is clicked, make it turn into darker blue and make categorys in dom disappear
values.forEach(value => {
    value.addEventListener('click', (e) => {
        if (!e.target.classList.contains('used')) {
            e.target.classList.add('used');
            document.getElementById('game-board').style.visibility = 'hidden';
            console.log(e.path[1].id, e.target.innerHTML);
            reset_timer(question_time);
            screen.innerHTML = grabQuestion(e.path[1].id, e.target.innerHTML);
        } 
    }) 
});
