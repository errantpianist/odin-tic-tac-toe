const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setBoard = (index, value) => {
    board[index] = value;
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getBoard, setBoard, resetBoard };
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const displayController = (() => {
  const renderBoard = (board) => {
    const boardDiv = document.querySelector(".board");
    boardDiv.innerHTML = "";
    board.forEach((element, index) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("data-index", index);
      square.textContent = element;
      square.addEventListener("click", (e) => {
        console.log(e.target.dataset.index);
        gameController.play(e.target.dataset.index);
        renderBoard(Gameboard.getBoard());
      });
      boardDiv.appendChild(square);
    });
  };
  return { renderBoard };
})();

const gameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;
  const getCurrentPlayer = () => currentPlayer;
  const switchPlayer = () => {
    let winner = checkWinner() || null;
    if (winner) {
      if (winner === "tie") {
        document.querySelector("#turn").textContent = "It's a tie!";
        document.querySelector("#turn").classList = "tie";
      } else {
        document.querySelector("#turn").textContent = `Player ${
          winner === "X" ? 1 : 2
        } wins!`;
        document.querySelector("#turn").classList = "win";
      }
      const resetButton = document.createElement("button");
      resetButton.textContent = "Play again?";
      resetButton.classList = "reset";
      resetButton.addEventListener("click", (e) => {
        e.target.remove();
        reset();
      });
      document.querySelector("#turn").appendChild(resetButton);
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      document.querySelector("#turn").classList = currentPlayer.getMarker();
    }
  };
  const play = (index) => {
    if (checkWinner()) return;
    if (Gameboard.getBoard()[index] !== "") return;
    Gameboard.setBoard(index, currentPlayer.getMarker());
    switchPlayer();
  };
  const reset = () => {
    Gameboard.resetBoard();
    displayController.renderBoard(Gameboard.getBoard());
    currentPlayer = player1;
    document.getElementById("turn").classList = "X";
    document.getElementById("turn").textContent = "";
  };
  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winningCombos = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // left diagonal
      [2, 4, 6], // right diagonal
    ];
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes("")) return "tie";

    return null;
  };

  return { getCurrentPlayer, switchPlayer, play, reset, checkWinner };
})();

const playerInputs = document.querySelectorAll(".player-names input");
playerInputs.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.value !== "") {
        e.target.parentElement.classList = "modal hidden";
        e.target.parentElement.parentElement.querySelector("h2").textContent +=
          e.target.value;
        e.target.parentElement.parentElement
          .querySelector("h2")
          .classList.remove("hidden");
        if (e.target.id === "player1") {
          document.querySelector("#player2").focus();
        } else {
          document.querySelector(".board").classList.remove("hidden");
        }
      }
    }
  });
});

displayController.renderBoard(Gameboard.getBoard());
