const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);
statusText.textContent = `Ход игрока: ${currentPlayer}`;

function cellClicked() {
  const id = this.getAttribute("id");

  if (options[id] != "" || !running) {
    return;
  }

  updateCell(this, id);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? 'cross' : 'ellipse');
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Ход игрока: ${currentPlayer}`;
}

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      statusText.textContent = `${currentPlayer} выиграли!`;
      running = false;
      return;
    }
  }

  if (!options.includes("")) {
    endGame(`Ничья!`);
  }
  else {
    changePlayer();
  }
}

function endGame(message) {
  statusText.textContent = message;
  running = false;
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Ход игрока: ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('ellipse', 'cross');
  });
  running = true;
}