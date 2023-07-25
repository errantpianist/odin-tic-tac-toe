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
  return { getCurrentPlayer, switchPlayer, play, reset };
})();

displayController.renderBoard(Gameboard.getBoard());
