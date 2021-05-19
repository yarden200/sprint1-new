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