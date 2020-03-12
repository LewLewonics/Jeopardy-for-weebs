const question_time = 30;
const transition_time = 2;
let time = 0;
let temp = 0;

let timer = document.getElementById('timer');
let answer_box = document.getElementById('answer-box');
let submit_answer = document.getElementById('submit-question');
let screen = document.getElementById('screen');

let currentTime = setInterval(time_tick, 1000);

function time_tick() {
    if (time == 0) {
        if (temp == 0) return;
        document.getElementById('game-board').style.visibility = 'visible';
        timer.style.visibility = 'hidden';
        answer_box.style.visibility = 'hidden';
        submit_answer.style.visibility = 'hidden';
        if (temp == question_time || temp == transition_time) {
            screen.innerText = 'CHOOSE YOUR NEXT QUESTION';
        }
        if (mistakes_left == 0) {
            gameover();
        }
        temp = 0;
        return;
    }
    temp++;
    time--;
    timer.innerHTML = time;
}

function reset_timer(seconds) {
    time = seconds;
    timer.innerHTML = time;
    timer.style.visibility = 'visible';
    answer_box.style.visibility = 'visible';
    submit_answer.style.visibility = 'visible';
}

