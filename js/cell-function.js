'use strict'

var gIsFirstClick = true;
var gSecsPassedInterval;


function cellClicked(i, j, elCell) {
    if (!gGame.isOn) return;
    var cell = gBoard[i][j];
    if (cell.isShown || cell.isMarked) return;

    if (gIsFirstClick) {
        secsPassedCount();
        gIsFirstClick = false;
        placeMineInRanLoc();
        setMinesNegsCount(gBoard);
        openCell(i, j);
    }

    if (!(cell.isMine)) {
        if (cell.minesAroundCount === 0) expandShown(i, j);
        else openCell(i, j);

        if (checkGameOver()) {
            changeSmiely('win');
            gGame.isOn = false;
            clearInterval(gSecsPassedInterval);
            gSecsPassedInterval = null;
        }
    } else {
        elCell.innerText = MINE;
        cell.isMarked = true
        gGame.markedCount++;

        if (gLife === 1) {
            gLife--
            updateElLife(gLife);
            changeSmiely('lose');
            gGame.isOn = false;
            clearInterval(gSecsPassedInterval);
            gSecsPassedInterval = null;
        } else {
            gLife--;
            updateElLife(gLife);
        }
    }
}

function cellMarked(ev, elCell, i, j) {
    ev.preventDefault();
    if (!gGame.isOn || gIsFirstClick) return;

    var cell = gBoard[i][j];
    if (cell.isShown) return;

    if (cell.isMarked) {
        elCell.innerHTML = '';
        cell.isMarked = false;
        gGame.markedCount--;
    } else {
        elCell.innerHTML = FLAG;
        cell.isMarked = true;
        cell.isMine=true;
        gGame.markedCount++;
        if (checkGameOver()) {
            changeSmiely('win');
            gGame.isOn = false;
            clearInterval(gSecsPassedInterval);
            gSecsPassedInterval = null;
        }
    }
}

function expandShown(i, j) {
    for (var idxI = i - 1; idxI <= i + 1; idxI++) {
        if (idxI < 0 || idxI >= gBoard.length) continue;
        for (var idxJ = j - 1; idxJ <= j + 1; idxJ++) {
            if (idxJ < 0 || idxJ >= gBoard[idxI].length) continue;
            openCell(idxI, idxJ);
        }
    }
}

function openCell(i, j) {
    if (gBoard[i][j].isShown) return
    var elCell = document.querySelector(getSelector(i, j));
    elCell.classList.add('clicked-cell');
    elCell.innerText = gBoard[i][j].minesAroundCount;
    gBoard[i][j].isShown = true;
    gGame.shownCount++;
}



