let button = document.querySelector('button')
let choices = Array.from(document.querySelectorAll('.choice'))
let result = document.querySelector('.result')
let resultText = document.querySelector('h3')

let gameStatus = false;
let board = Array(9).fill(null);
let currentPlayer = 'x';

button.addEventListener('click', () => {
    if(gameStatus == false && !result.classList.contains('hidden')) {
        result.classList.toggle('hidden')
    }
    gameStatus = true;
    button.textContent = "Reset";
    choices.forEach((choice, index) => {
        choice.children[0].src = "blank.png";
        board[index] = null;
    });
    currentPlayer = 'x';
})

choices.forEach((choice, index) => {
    choice.addEventListener('click', () => {
        if(gameStatus && !board[index]) {
            board[index] = currentPlayer;
            choice.children[0].src = currentPlayer === 'x' ? "x.png" : "o.png";
            if(checkWinner()) {
                gameStatus = false;
                result.classList.toggle('hidden')
                resultText.textContent = `Player '${currentPlayer}' wins!`;
                button.textContent = "Start";
            } else {
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            }
        }
    });
});

function checkWinner() {
    const winingLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winingLines.length; i++) {
        let [a, b, c] = winingLines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}