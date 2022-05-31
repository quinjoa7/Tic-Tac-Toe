const gameboard = (() => {
    'use strict';

    let currentPlayer = 'X';
    let winner = '';

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', function(){
        start();
    })

    const gameResult = document.getElementById('result');

    const grid = [];
    for (let i = 1; i <= 9; i++) {
        const num = document.getElementById('cell' + i);
        num.addEventListener('click', function () {
            setCell(currentPlayer, num);
        });
        grid.push(num);
    }

    const setCell = (mark, cell) => {
        if (cell.innerText === '' && winner === '') {
            cell.innerText = mark;

            checkWin();

            if (currentPlayer === 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X'
            };
        }
    }

    const checkVertical = () => {
        for (let i = 0; i < 3; i++) {
            let oneDown = i + 3;
            let twoDown = i + 6;
            if (grid[i].innerText === 'X' || grid[i].innerText === 'O') {
                if (grid[i].innerText === grid[oneDown].innerText &&
                    grid[i].innerText === grid[twoDown].innerText) {
                    winner = currentPlayer;
                }
            }
        }
    }

    const checkHorizontal = () => {
        for (let i = 0; i < 6; i++) {
            let oneRight = i + 1;
            let twoRight = i + 2;
            if (grid[i].innerText === 'X' || grid[i].innerText === 'O') {
                if (grid[i].innerText === grid[oneRight].innerText &&
                    grid[i].innerText === grid[twoRight].innerText) {
                    winner = currentPlayer;
                }
            }
            i++;
            i++;
        }
    }

    const checkDiagonal = () => {
        if (grid[4].innerText === 'X' || grid[4].innerText === 'O') {
            if (grid[0].innerText === grid[4].innerText &&
                grid[0].innerText === grid[8].innerText) {
                winner = currentPlayer;
            } else if (grid[2].innerText === grid[4].innerText &&
                grid[2].innerText === grid[6].innerText) {
                winner = currentPlayer;
            }
        }
    }

    const checkTie = () => {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i].innerText === '') {
                return;
            }
        }
        winner = ' Tie';
    }

    const checkWin = () => {
        checkVertical()
        checkHorizontal();
        checkDiagonal();
        checkTie();
        if (winner !== '') {
            if (winner === ' Tie') {
                gameResult.innerText += winner;
            } else {
                gameResult.innerText += ' ' + currentPlayer + ' wins.';
            }
        }
    }

    const start = () => {
        for (let i in grid){ 
            grid[i].innerText = '';
        }
        winner = '';
        gameResult.innerText = 'Result:'
    }
})();
