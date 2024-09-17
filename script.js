let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector(".newbtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let count = 0;
let turnO = true;

const winPattern = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableboxes();
  msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "red";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "blue";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 16 && !isWinner) {
      gameover();
    }
  });
});

const gameover = () => {
  msg.innerText = "The game over in tie";
  msgcontainer.classList.remove("hide");
  disableboxes();
};

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  msg.innerText = "";
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! The winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableboxes();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    let pos4val = boxes[pattern[3]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "" && pos4val !== "") {
      if (pos1val === pos2val && pos2val === pos3val && pos3val === pos4val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
  return false;
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
