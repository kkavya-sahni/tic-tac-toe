let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let restrtBtn = document.querySelector("#restart");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let inputP1 = document.querySelector("#in-p1");
let inputP2 = document.querySelector("#in-p2");
let renameB1 = document.querySelector("#btn-p1");
let renameB2 = document.querySelector("#btn-p2");
let scoreP1 = document.querySelector("#score-p1");
let scoreP2 = document.querySelector("#score-p2");
let count = 0;

let turnO = true;
inputP1.disabled = true;
inputP2.disabled = true;

renameB1.addEventListener("click", () => {
  inputP1.disabled = false;
  inputP1.focus();
  inputP1.addEventListener("blur", () => {
    inputP1.disabled = true;
  });
});

renameB2.addEventListener("click", () => {
  inputP2.disabled = false;
  inputP2.focus();
  inputP2.addEventListener("blur", () => {
    inputP2.disabled = true;
  });
});

const WinPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const restrtGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations!, ${winner} is the Winner`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of WinPattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        if (pos1val === "O") {
          scoreP1.removeAttribute("disabled");
          scoreP1.value = parseInt(scoreP1.value) + 1;
          scoreP1.disabled = true;
          showWinner(inputP1.value);
          return popup("gloss");
        } else if (pos1val === "X") {
          scoreP2.removeAttribute("disabled");
          scoreP2.value = parseInt(scoreP2.value) + 1;
          scoreP2.disabled = true;
          showWinner(inputP2.value);
        }
      }
    }
  }
  if (count === 9) {
    draw();
  }
};

const draw = () => {
  msg.innerText = `The Game is a draw`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

restrtBtn.addEventListener("click", restrtGame);
resetBtn.addEventListener("click", resetGame);
