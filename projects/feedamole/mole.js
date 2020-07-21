let curScore = 0;
const WIN_SCORE = 10;

const moles = document.querySelectorAll(".mole");
let runAgainAt = Array(10).fill(Date.now());
let timeoutFunction = Array(10).fill(null);
let checkMoleStatusInterval = Date.now() + 100;

function init() {
    for(let index=0; index<moles.length; index++) {
        sendMoleBack(moles[index], 500, 200);
        moles[index].addEventListener("click", handleMoleClick);
        runAgainAt[index] = getGoneInterval();
    }
    checkMoleStatus();
}

function checkMoleStatus(){
    if(Date.now() >= checkMoleStatusInterval) {
        for(let index=0; index<moles.length; index++) {
            displayEachMole(index);
        }
        checkMoleStatusInterval = Date.now() + 100;
    }
    requestAnimationFrame(checkMoleStatus);
}
function getGoneInterval() {
    return Date.now() + Math.floor(Math.random()*18000) + 2000; // 2-20 secs from now
}
function displayEachMole(index) {
    if(Date.now() > runAgainAt[index] && moles[index].classList.contains("gone")) {
        moles[index].src = `./img/${(Math.random()>0.8)?"king-":""}mole-hungry.png`;
        moles[index].classList.remove("gone");
        moles[index].classList.add("hungry");
        timeoutFunction[index] = setTimeout(function () {
            moles[index].src = `./img/${moleType(moles[index])}-sad.png`;
            moles[index].classList.remove("hungry");
            sendMoleBack(moles[index], 500, 500);
        }, 3000);
        runAgainAt[index] = getGoneInterval();
    }
}

function handleMoleClick(event) {
    const mole = event.target;
    if(!mole.classList.contains("hungry")) {
        return;
    }
    if(mole.src.includes("king")) {
        curScore+=2;
    }
    else {
        curScore++;
    }
    document.querySelector(".worm-container").style.width = `${curScore/WIN_SCORE*100}%`;
    if(curScore >= WIN_SCORE) {
        declareWinner();
    };
   clearTimeout(timeoutFunction[parseInt(mole.dataset.index)]);
    mole.src = `./img/${moleType(mole)}-fed.png`;
    mole.classList.remove("hungry");
    sendMoleBack(mole,500,500);
}

function sendMoleBack(mole, turnTime, goneTime) {
    setTimeout(function() {
        mole.src = `./img/${moleType(mole)}-leaving.png`;
        setTimeout(function() {
            mole.classList.add("gone");
        },goneTime);
    }, turnTime);
}

function moleType(mole) {
    let moleKind = "mole";
    if(mole.src.includes("king")) {
        moleKind = "king-mole";
    }
    return moleKind;
}

function declareWinner() {
    document.querySelector(".wrapper").classList.add("gone");
    document.querySelector(".win").classList.remove("gone");
}
init();