'use strict'

const MINE = '*';
const FLAG = '$';

var gBoard;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gLevel = {
    size: 4,
    mines: 2
};

var gIsFirstClick=true;
var gSecsPassedInterval;


function initGame() {
    gBoard = buildBoard(gLevel.size);
    console.log(gLevel.mines);
    placeMineInRanLoc();
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}

function buildBoard(size) {
    var board = createMat(size);

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    }
    return board;
}


function placeMineInRanLoc() {
    for (var i = 0; i < gLevel.mines; i++) {
        var loc = getMineRanLocation();
        // console.log(loc);
        gBoard[loc.i][loc.j].isMine = true;
        console.log('heyy:', i);
    }
}

function getMineRanLocation() {
    var loc = { i: getRandomInt(0, gLevel.size - 1), j: getRandomInt(0, gLevel.size - 1) };
    while (gBoard[loc.i][loc.j].isMine) loc = { i: getRandomInt(0, gLevel.size - 1), j: getRandomInt(0, gLevel.size - 1) };
    return loc;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (!board[i][j].isMine) board[i][j].minesAroundCount = MineNegsCount(i, j, board);
        }
    }
}

function MineNegsCount(cellI, cellJ, board) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine) neighborsSum++;
        }
    }
    return neighborsSum;
}

function renderBoard(board) {

    var strHTML = ``;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < board[0].length; j++) {
            // var currCell = board[i][j];
            var tdId = `cell-${i}-${j}`;
            strHTML += `\t<td id="${tdId}" class="cell" onclick="cellClicked(${i},${j},this)" 
            oncontextmenu="cellMarked(event,this,${i},${j})" >\n`;
            strHTML += `\t</td>\n`;
        }
        strHTML += `</tr>\n`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    // console.table(board);
}

function cellClicked(i, j, elCell) {
    var cell = gBoard[i][j];
    if (cell.isShown) return;
    if (cell.isMarked) return;

    if (!(cell.isMine)) {
        if (gIsFirstClick) {
            secsPassedCount();
            gIsFirstClick=false;
        }
        if (cell.minesAroundCount === 0) {
            expandShown(elCell, i, j);
        } else {
            elCell.innerHTML += cell.minesAroundCount;
            elCell.classList.add('clicked-cell');
            cell.isShown = true;
            gGame.shownCount++;
        }
    }
    else {
        elCell.innerHTML += MINE;

    }
}

function cellMarked(ev, elCell, i, j) {
    ev.preventDefault();

    var cell = gBoard[i][j];
    if (cell.isShown) return;
    
    if (cell.isMarked) {
        elCell.innerHTML = '';
        cell.isMarked = false;
        gGame.markedCount--;
    } else {
        if (gIsFirstClick) {
            secsPassedCount();
            gIsFirstClick=false;
        }
        elCell.innerHTML = FLAG;
        cell.isMarked = true;
        gGame.markedCount++;
    }
}

function checkGameOver() {
    if (gGame.markedCount === 2 && gGame.shownCount === 14) return true;
    return false;
}

function expandShown(elCell, i, j) {
    elCell.innerHTML = '';
    for (var idxI = i - 1; idxI <= i + 1; idxI++) {
        if (idxI < 0 || idxI >= gBoard.length) continue;
        for (var idxJ = j - 1; idxJ <= j + 1; idxJ++) {
            // if (idxI === i && idxJ === j) continue;
            if (idxJ < 0 || idxJ >= gBoard[idxI].length) continue;
            // console.log(getSelector(idxI,idxJ));
            var elNegCell = document.querySelector(getSelector(idxI, idxJ));
            elNegCell.classList.add('clicked-cell');
            elNegCell.innerHTML = gBoard[idxI][idxJ].minesAroundCount;
            gBoard[idxI][idxJ].isShown = true;
            gGame.shownCount++;
        }
    }
}

function setLevel(strLevel) {
    console.log(strLevel);

    switch (strLevel) {
        case 'beginner':
            gLevel.size = 4;
            gLevel.mines = 2;
            closeModalLevels();
            initGame();
            break;
        case 'medium':
            gLevel.size = 8;
            gLevel.mines = 12;
            closeModalLevels();
            initGame();
            break;
        case 'expert':
            gLevel.size = 12;
            gLevel.mines = 30;
            closeModalLevels();
            initGame();
            break;

        default:
            break;
    }
}

function secsPassedCount(){
    gSecsPassedInterval=setInterval(function(){
        gGame.secsPassed++;
        var elTime=document.querySelector('.time');
        elTime.innerText=''+gGame.secsPassed;
    },1000)
}

function gameOver() {
    
}










