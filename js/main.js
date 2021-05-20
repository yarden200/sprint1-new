'use strict'

const MINE = '💣';
const FLAG = '⛳';
const RESET = '😃';
const WIN = '😎';
const LOSE = '😔';

var gBoard;
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gLevel = {
    size: 4,
    mines: 2,
    shownToWin: 14,
};

var gLife;

function initGame() {
    resetStats();
    gBoard = buildBoard(gLevel.size);
    renderBoard(gBoard);
    changeSmiely('reset');
    upDateElTime(0);
    updateElLife(gLife)
}


function secsPassedCount() {
    gSecsPassedInterval = setInterval(function () {
        upDateSecPassed();
        console.log('secsPassed', gGame.secsPassed);
        upDateElTime(gGame.secsPassed);
    }, 1000)
}

function upDateElTime(secsPassed) {
    var elTime = document.querySelector('.time');
    elTime.innerText = 'time:' + secsPassed;
}

function setLevel(strLevel) {
    switch (strLevel) {
        case 'beginner':
            gLevel.size = 4;
            gLevel.mines = 2;
            gLevel.shownToWin = gLevel.size * gLevel.size - gLevel.mines;
            break;

        case 'medium':
            gLevel.size = 8;
            gLevel.mines = 12;
            gLevel.shownToWin = gLevel.size * gLevel.size - gLevel.mines;
            break;

        case 'expert':
            gLevel.size = 12;
            gLevel.mines = 30;
            gLevel.shownToWin = gLevel.size * gLevel.size - gLevel.mines;
            break;

        default:
            break;
    }
    closeModalLevels();
    initGame();
}

function upDateSecPassed() {
    gGame.secsPassed++;
}

function changeSmiely(str) {
    var elSmiley = document.querySelector('.smiely');
    switch (str) {
        case 'reset':
            elSmiley.innerText = RESET;
            break;
        case 'win':
            elSmiley.innerText = WIN;
            break;
        case 'lose':
            elSmiley.innerText = LOSE;
            break;
        default:
            break;
    }
}
function updateElLife(life) {
    var elLife = document.querySelector('.life');
    elLife.innerText = 'life:' + life
}
function checkGameOver() {
    if (gGame.markedCount === gLevel.mines && gGame.shownCount === gLevel.shownToWin) return true;
    return false;
}
function resetStats() {
    gGame.isOn = true;
    gIsFirstClick = true;
    gLife = 3;
    clearInterval(gSecsPassedInterval);
    gSecsPassedInterval = null;
    gGame.secsPassed = 0;
    gGame.markedCount = 0;
    gGame.shownCount = 0;
}