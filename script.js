// script.js

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (board[cellIndex] !== '' || isGameOver) {
        return;
    }

    updateCell(event.target, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        isGameOver = true;
        return;
    }

    if (!board.includes('')) {
        message.textContent = "It's a draw!";
        isGameOver = true;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    message.textContent = '';
}
