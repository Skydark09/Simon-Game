let gameSeq = [],
  userSeq = [];
let started = false,
  level = 0,
  score = 0;

let btns = ["yellow", "red", "green", "blue"];

let h2 = document.querySelector("h2");
let btn = document.querySelectorAll(".btn");
let p = document.querySelector("p");

document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("game started");
    started = true;
    p.innerText = "";
    levlup();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
// function userFlash(btn) {
//   btn.classList.add("userFlash");
//   setTimeout(function () {
//     btn.classList.remove("userFlash");
//   }, 250);
// }
function levlup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randCol = btns[randIdx];
  let randbtn = document.querySelector(`.${randCol}`);
  gameSeq.push(randCol);

  console.log(gameSeq);

  gameFlash(randbtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      maxScore(level);
      setTimeout(levlup, 1000);
    }
  } else {
    p.innerText = `Highest Score ${score}`;
    h2.innerHTML = `Game Over! Your Score Was ${level}<br>Please Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 350);

    reset();
  }
}
function btnPress() {
  if (started === false) return;
  let btn = this;
  gameFlash(btn);

  let userCol = btn.getAttribute("id");
  userSeq.push(userCol);

  checkAns(userSeq.length - 1);
}

for (let b of btn) {
  b.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function maxScore(level) {
  score = Math.max(score, level);
}
