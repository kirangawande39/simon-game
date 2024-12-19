let userSeq = [];
let gameSeq = [];
let color = ["yellow", "red", "green", "purple"];
let level = 0;
let started = false;

let p = document.querySelector('p');

document.addEventListener("keypress", function () {
    if (!started) {
        alert("Game Started..");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 200);
}

function levelUp() {
    level++;
    p.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = color[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    // console.log(gameSeq)
    gameFlash(randomBtn);
    userSeq = []; 
}

function userFlash(btn) {
    btn.classList.add('userflash');
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 200);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    } else {
        p.innerHTML = `Game Over! <b>Your score was ${level}</b><br>Press any key to play again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        gameReset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    // console.log(userSeq);
    checkAns(userSeq.length - 1);
}

let allButton = document.querySelectorAll('.card');
for (let btn of allButton) {
    btn.addEventListener('click', btnPress);
}

function gameReset() {
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
   
}
