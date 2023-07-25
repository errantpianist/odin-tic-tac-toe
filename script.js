const Gameboard = (() => {
  let board = ["", "O", "X", "O", "X", "O", "X", "O", "X"];
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
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const play = (index) => {
    if (Gameboard.getBoard()[index] !== "") return;
    Gameboard.setBoard(index, currentPlayer.getMarker());
    switchPlayer();
  };
  const reset = () => {
    Gameboard.resetBoard();
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
    winningCombos.forEach((combo) => {
      if (
        board[combo[0]] !== "" &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
      ) {
        return board[combo[0]];
      } else if (!board.includes("")) {
        return "tie";
      }
    });
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
        }
      }
    }
  });
});

displayController.renderBoard(Gameboard.getBoard());
