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
let manualEntryDisplaying = false;

const startCountdown = () => {
    timing = true;
    decMil();
    intervalId = setInterval(decMil, 10);
};

const stopCountdown = () => {
    clearInterval(intervalId);
    timing = false;
    updateTimerBlock(currentMil, milsec);
};

function updateTimerBlock(currentTime, unit) {
    unit.innerText = `${currentTime}`.length === 1 ? `0${currentTime}` : currentTime;
}

const addMin = () => {
    if (currentMin < 0) {
        currentMin = 0;
        minutes.innerText = "00";
    } else {
        currentMin++;
        updateTimerBlock(currentMin, minutes)
    }
};

const decMin = () => {
    if (currentMin > 0) {
        currentMin--;
        updateTimerBlock(currentMin, minutes);
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
        updateTimerBlock(currentSec, seconds);
    }
};

const decSec = () => {
    if (currentSec > 0) {
        currentSec--;
        updateTimerBlock(currentSec, seconds);
    } else if (currentSec === 0 && currentMin > 0 && timing) {
        currentSec--;
        updateTimerBlock(currentSec, seconds);
    } else if (currentSec === 0 && currentMin > 0) {
        currentSec--;
        updateTimerBlock(currentSec, seconds);
    }
    if (currentSec < 0) {
        currentSec = 59;
        updateTimerBlock(currentSec, seconds);
        if (currentMin > 0 && timing) {
            decMin();
        }
    }
    if (currentMin > 0 && currentSec === 59 && currentMil === 0 && timing) {
        decMin();
        updateTimerBlock(currentSec, seconds);
    }
};

const decMil = () => {
    if (currentMil >= 0 && (currentMin > 0 || currentSec > 0)) {
        currentMil--;
        updateTimerBlock(currentMil, milsec);
    } else if (currentMil > 0) {
        currentMil--;
        updateTimerBlock(currentMil, milsec);
    } else if (currentMil === 0 && currentSec === 0 && currentMin === 0 && timing) {
        stopCountdown();
    }
    if (currentMil < 0 && (currentMin > 0 || currentSec > 0)) {
        currentMil = 99;
        decSec();
        updateTimerBlock(currentMil, milsec);
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

const manuallyEnterTime = () => {
    if (enterMinutes.value) {
        currentMin = parseInt(enterMinutes.value);
        updateTimerBlock(currentMin, minutes);
    } else {
        currentMin = 0;
        updateTimerBlock(currentMin, minutes);
    }
    if (enterSeconds.value) {
        currentSec = parseInt(enterSeconds.value);
        updateTimerBlock(currentSec, seconds);
    } else {
        currentSec = 0;
        updateTimerBlock(currentSec, seconds);
    }
    if (currentMil) {
        currentMil = 0;
        updateTimerBlock(currentMil, milsec);
    }
};

const openManualEntry = () => {
    if (timing) {
        stopCountdown();
        timing = true;
    }
    manualEntry.style.display = "block";
    manualEntryDisplaying = true;
};

const closeManualEntry = () => {
    manualEntry.style.display = "none";
    manualEntryDisplaying = false;
};

const clearManualEntry = () => {
    enterMinutes.value = "";
    enterSeconds.value = "";
};

const checkNumber = (input) => {
    const regex = /^\d+$/
    if (input.value === "") {
        return true
    } else {
        return regex.test(input.value);
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
        updateTimerBlock(currentMil, milsec);
    }
});

starStoptBtn.addEventListener("click", () => {
    if (timing) {
        stopCountdown();
    } else if (currentMil === 0 && currentMin === 0 && currentSec === 0) {
        // Do nothing
    } else {
        startCountdown();
    }
});

setTime.addEventListener("click", () => {
    if (manualEntryDisplaying) {
        closeManualEntry();
    } else {
        openManualEntry();
    }
});

confirmBtn.addEventListener("click", () => {
    if (checkNumber(enterMinutes) && checkNumber(enterSeconds)) {
        manuallyEnterTime();
        closeManualEntry();
        clearManualEntry();
        if (timing) {
            stopCountdown();
        }
    } else {
        alert("Please enter positive whole numbers only.")
    }
});

cancelBtn.addEventListener("click", () => {
    closeManualEntry();
    clearManualEntry();
    if (timing) {
        startCountdown();
    }
});

enterMinutes.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        manuallyEnterTime();
        closeManualEntry();
        clearManualEntry();
        if (timing) {
            stopCountdown();
        }
    }
});

enterSeconds.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        manuallyEnterTime();
        closeManualEntry();
        clearManualEntry();
        if (timing) {
            stopCountdown();
        }
    }
});