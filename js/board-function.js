'use strict'

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
        gBoard[loc.i][loc.j].isMine = true;
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
            if (!(board[i][j].isMine)) 
            board[i][j].minesAroundCount = MineNegsCount(i, j, board);
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
            var tdId = `cell-${i}-${j}`;
            strHTML += `\t<td id="${tdId}" class="cell" onclick="cellClicked(${i},${j},this)" 
            oncontextmenu="cellMarked(event,this,${i},${j})" >\n`;
            strHTML += `\t</td>\n`;
        }
        strHTML += `</tr>\n`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}
