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


function initGame() {
    gBoard = buildBoard(4);
    placeMineInRanLoc();
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}

function buildBoard(SIZE) {
    var board = createMat(SIZE);

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
    for (var i = 0; i < 2; i++) {
        var loc = getMineRanLocation();
        // console.log(loc);
        gBoard[loc.i][loc.j].isMine = true;
    }
}

function getMineRanLocation() {
    var loc = { i: getRandomInt(0, 3), j: getRandomInt(0, 3) };
    while (gBoard[loc.i], [loc.j].isMine) loc = { i: getRandomInt(0, 3), j: getRandomInt(0, 3) };
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
            var currCell = board[i][j];
            var tdId = `cell-${i}-${j}`;
            strHTML += `\t<td id="${tdId}" class="cell" onclick="cellClicked(${i},${j},this)" 
            oncontextmenu="cellMarked(event,this,${i},${j})" >\n`;
            // if (currCell.isMine) strHTML += `\t\t\t` + MINE
            strHTML += `\t</td>\n`;
        }
        strHTML += `</tr>\n`;
    }

    console.log('strHTML is:');

    console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    // console.table(board);
}

function cellClicked(i, j, elCell) {
    var cell = gBoard[i][j];
    if (cell.isShown) return;
    if (cell.isMarked) return; 
        
    if (!(cell.isMine)) {
        elCell.innerHTML += cell.minesAroundCount;
        cell.isShown = true;
        gGame.shownCount++;
    }
    else {
        elCell.innerHTML += MINE;
        cell.isShown = true;
    }
}

function cellMarked(ev, elCell, i, j) {
    ev.preventDefault();
    var cell = gBoard[i][j];
    if (cell.isShown) return;
    if(cell.isMarked){
        elCell.innerHTML='';
        cell.isMarked=false;
        gGame.markedCount--;
    } else{
        elCell.innerHTML = FLAG;
        cell.isMarked=true;
        gGame.markedCount++;
    }
}

function checkGameOver() {
    if (gGame.markedCount===2&&gGame.shownCount===14) return true;
    return false;
}