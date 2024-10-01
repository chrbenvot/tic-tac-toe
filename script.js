let player1, player2;
let counter = 0; // Moved counter to global scope
let gameOver = false; // Moved gameOver to global scope

function createPlayer(name, mark) {
    return { name, mark };
}

const module = (function () {
    let board = ["", "", "",
                 "", "", "",
                 "", "", ""];

    const clickHandler = function (e) {
        if (e.target.tagName !== 'DIV') return; // Only handle div clicks

        const cellId = Number(e.target.id); // Convert to number
        if (gameOver || board[cellId] !== "") return; // Stop if the game is over or the cell is taken

        // Add X or O based on the counter
        board[cellId] = (counter % 2 === 0) ? "X" : "O"; // Set the mark directly
        counter++; // Increment the counter
        displayController(board);
    };

    // Attach click handlers to each game board cell
    const boardGrids = document.querySelectorAll("#gameboard > div");
    boardGrids.forEach(grid => {
        grid.addEventListener('click', clickHandler);
    });

    // Function to update the board display and check for win or tie
    const displayController = function (board) {
        const boardGrids = document.querySelectorAll("#gameboard > div");
        boardGrids.forEach((item, i) => {
            item.textContent = board[i];
        });

        if (checkWin(board)) {
            gameOver = true;
            const player = (counter % 2 === 0) ? player2.name : player1.name;
            displayMessage(`${player} wins!`);
        } else if (checkTie(board)) {
            gameOver = true;
            displayMessage("It's a tie!");
        }
    };

    return { makeBoard: () => board }; // Expose only the board for resetting
})();

// Function to display game result messages
function displayMessage(message) {
    document.getElementById('message').textContent = message;
}

// Check for winning condition
function checkWin(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i of winningCombinations) {
        const [a, b, c] = i;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winner ('X' or 'O')
        }
    }
    return null; // No winner
}

// Check for tie condition
function checkTie(board) {
    const isBoardFull = board.every(cell => cell !== "");
    return isBoardFull && !checkWin(board);
}

// Form submission handler
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page refresh
    
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;
    
    if (player1Name === "" || player2Name === "") {
        alert("Both players must enter a name");
        return;
    }
    
    player1 = createPlayer(player1Name, 'X');
    player2 = createPlayer(player2Name, 'O');

    console.log(player1, player2);
    
    module.makeBoard(); // Initialize the game board after creating players
});

// Reset button functionality
const reset = document.querySelector('#reset');

function resetHandler() {
    const board = module.makeBoard(); // Get the current board state

    // Reset the board array
    board.fill(""); // Reset the board

    // Reset the game state
    counter = 0; // Reset counter to 0
    gameOver = false; // Reset game over state

    // Clear the display of the board
    const boardGrids = document.querySelectorAll("#gameboard > div");
    boardGrids.forEach(grid => grid.textContent = "");

    // Clear any displayed messages
    document.getElementById('message').textContent = "";
}

// Attach the reset event listener
reset.addEventListener('click', resetHandler);
