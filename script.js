const Gameboard = (() => {
  let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
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
      boardDiv.appendChild(square);
    });
  };
  return { renderBoard };
})();

displayController.renderBoard(Gameboard.getBoard());
