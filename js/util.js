'use strict'

function createMat(SIZE) {
    var mat = []
    for (var i = 0; i < SIZE; i++) {
        var row = []
        for (var j = 0; j < SIZE; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSelector(i, j) {
    return '#cell-' + i + '-' + j;
}

function openModalLeves() {
    var elModal = document.querySelector('.moadl-levels');
    console.log('hello');
    elModal.style.display = "block";
}

function closeModalLevels() {
    var elModal = document.querySelector('.moadl-levels');
    elModal.style.display = "none";
}



 // if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length || gBoard[i][j].minesAroundCount !== 0) return;

    // elCell.innerHTML = '';
    // for (var idxI = i - 1; idxI <= i + 1; idxI++) {
    //     if (idxI < 0 || idxI >= gBoard.length) continue;
    //     for (var idxJ = j - 1; idxJ <= j + 1; idxJ++) {
    //         if (idxJ < 0 || idxJ >= gBoard[idxI].length) continue;
    //         // console.log(getSelector(idxI,idxJ));
    //         var elNegCell = document.querySelector(getSelector(idxI, idxJ));
    //         elNegCell.classList.add('clicked-cell');
    //         elNegCell.innerHTML = gBoard[idxI][idxJ].minesAroundCount;
    //         if (gBoard[idxI][idxJ].minesAroundCount === 0 && i !== idxI || j !== idxJ) {
    //             var elRecCel = document.querySelector(getSelector(idxI, idxJ));
    //             expandShown(elRecCel, idxI, idxJ);
    //         }
    //         gBoard[idxI][idxJ].isShown = true;
    //         gGame.shownCount++;
    //     }
    // }