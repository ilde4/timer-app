const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milsec = document.getElementById("miliseconds");
const addMinBtn = document.getElementById("add-min");
const decMinBtn = document.getElementById("dec-min");
const addSecBtn = document.getElementById("add-sec");
const decSecBtn = document.getElementById("dec-sec");
const zeroizeBtn = document.getElementById("zeroize");
const setTime = document.getElementById("set-time");
const starStoptBtn = document.getElementById("start-stop");
const clear = document.getElementById("clear");
const manualEntry = document.getElementById("manual-entry");
const enterMinutes = document.getElementById("enter-minutes");
const enterSeconds = document.getElementById("enter-seconds");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");


let currentMin = 0;
let currentSec = 0;
let currentMil = 0;
let intervalId;
let timing = false;

const startCountdown = () => {
    decMil();
    intervalId = setInterval(decMil, 10);
    timing = true;

};

const stopCountdown = () => {
    clearInterval(intervalId);
    timing = false;
    formatter(currentMil, milsec);
};

function formatter(currentTime, unit) {
    unit.innerText = `${currentTime}`.length === 1 ? `0${currentTime}` : currentTime;
}

const addMin = () => {
    if (currentMin < 0) {
        currentMin = 0;
        minutes.innerText = "00";
    } else {
        currentMin++;
        formatter(currentMin, minutes)
    }
};

const decMin = () => {
    if (currentMin > 0) {
        currentMin--;
        formatter(currentMin, minutes);
    }
};

const addSec = () => {
    if (currentSec === 59) {
        currentSec = 0;
        seconds.innerText = "00";
        if (timing) {
            addMin();
        }
    } else {
        currentSec++;
        formatter(currentSec, seconds);
    }
};

const decSec = () => {
    if (currentSec >= 0) {
        currentSec--;
        formatter(currentSec, seconds);
    }
    if (currentSec < 0) {
        currentSec = 59;
        formatter(currentSec, seconds);
        if (currentMin > 0 && timing) {
            decMin();
        }
    }
    if (currentMin > 0 && currentSec === 59 && currentMil === 0 && timing) {
        decMin();
        formatter(currentSec, seconds);
    }
};


const decMil = () => {
    if (currentMil > 0 && (currentMin > 0 || currentSec > 0)) {
        currentMil--;
        formatter(currentMil, milsec);
    } else if (currentMil >= 0) {
        currentMil--;
        formatter(currentMil, milsec);
    }
    if (currentMil < 0 && (currentMin > 0 || currentSec > 0)) {
        currentMil = 99;
        decSec();
        formatter(currentMil, milsec);
    }
    if (currentMil === 0 && currentSec === 0 && currentMin === 0 && timing) {
        stopCountdown();
    }
};

const clearTime = () => {
    currentMin = 0;
    currentSec = 0;
    currentMil = 0;
    minutes.innerText = "00";
    seconds.innerText = "00";
    milsec.innerText = "00";
    if (timing) {
        stopCountdown();
    }
};

addMinBtn.addEventListener("click", () => {
    addMin();
});

decMinBtn.addEventListener("click", () => {
    decMin();
});

addSecBtn.addEventListener("click", () => {
    addSec();
});

decSecBtn.addEventListener("click", () => {
    decSec();
});

clear.addEventListener("click", () => {
    clearTime();
});

zeroizeBtn.addEventListener("click", () => {
    if (!timing) {
        currentMil = 0;
        formatter(currentMil, milsec);
    }
});

starStoptBtn.addEventListener("click", () => {
    if (timing) {
        stopCountdown();
    } else if (currentMil === 0 && currentMin === 0 && currentSec === 0) {
        
    } else {
        startCountdown();
    }
});

setTime.addEventListener("click", () => {
    if (manualEntry.style.display === "block") {
        manualEntry.style.display = "none";
    } else {
        manualEntry.style.display = "block";
    }
});

confirmBtn.addEventListener("click", () => {
    currentMin = enterMinutes.value;
});
