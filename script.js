let createButton;
let arrayOfExcersices = [];
let newExcersiceObject = {};
let arrayOf;

window.onload = function () {
  const numberInputs = document.querySelectorAll("input[type=number]");

  numberInputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "e" || event.key === "+" || event.key === "-") {
        event.preventDefault();
      }
    });
  });
  createButton = document.querySelector(".create-set");
  createButton.addEventListener("click", function () {
    document.querySelector(".lightbox-create-set").style.display = "inline";
    document.querySelector(".blurbox").style.visibility = "visible";
  });
  document.querySelector(".close-lightbox").onclick = function () {
    document.querySelector(".lightbox-create-set").style.display = "none";
    document.querySelector(".blurbox").style.visibility = "hidden";
  };
};

function closeLightBox() {
  event.preventDefault();
  createButton.remove();

  document.querySelector(".lightbox-create-set").style.display = "none";
  document.querySelector(".blurbox").style.visibility = "hidden";
  if (document.getElementById("name-of-set").value == "") {
    newExcersiceObject.name = "Untitled Exercise";
  } else {
    newExcersiceObject.name = document.getElementById("name-of-set").value;
  }

  newExcersiceObject.time = parseInt(
    document.getElementById("excersice").value
  );

  newExcersiceObject.rest = parseInt(
    document.getElementById("rest-excersice").value
  );

  newExcersiceObject.sets = parseInt(document.getElementById("sets").value);
  console.log(newExcersiceObject);
  document.querySelector(".excersices-container").innerHTML =
    "<div class='exercise-info-box'> <div class='title-exercise'>" +
    newExcersiceObject.sets +
    " sets of " +
    newExcersiceObject.name +
    "</div> <div class='exercise-time'>High Intensity intervals for: " +
    newExcersiceObject.time +
    "s</div> <div class='rest-time'> Low Intensity intervals for: " +
    newExcersiceObject.rest +
    "s</div> <div class='edit-button-container'><button type='button' class='edit' onclick='edit()'>Edit</button></div></div>";
}

function edit() {
  document.querySelector(".lightbox-create-set").style.display = "inline";
  document.querySelector(".blurbox").style.visibility = "visible";
}

function startTimer() {
  event.preventDefault();
  let warmUpObject = {};
  document.querySelector(".timer-container").style.visibility = "visible";
  warmUpObject.name = "Warm-up";
  warmUpObject.time = document.getElementById("warm-up-timer").value;
  let coolDownObject = {};
  coolDownObject.name = "Cool-down";
  coolDownObject.time = document.getElementById("cool-down-timer").value;
  arrayOfExcersices.push(warmUpObject);
  arrayOfExcersices.push(newExcersiceObject);
  arrayOfExcersices.push(coolDownObject);
  console.log(arrayOfExcersices);

  startWarmUp();
}

function startWarmUp() {
  document.getElementById("current-heading").innerText = "Cool-down";
  document.getElementById("timer-bar").max = arrayOfExcersices[0].time;
  document.getElementById("timer-bar").value = arrayOfExcersices[0].time;
  var warmupTime = arrayOfExcersices[0].time;
  var timerId = setInterval(countdown, 1000);
  function countdown() {
    if (warmupTime == 0) {
      clearInterval(timerId);
      startMainExercise();
    } else {
      warmupTime--;
      document.getElementById("timer-bar").value = warmupTime;
    }
  }
}

function startMainExercise() {
  if (Object.keys(newExcersiceObject).length === 0) {
    console.log("No exercise selected");
    return;
  }

  let setsRemaining = newExcersiceObject.sets;
  let isHighIntensity = true;
  let totalSets = newExcersiceObject.sets * 2 - 1; // includes rest intervals
  let intervalTime = isHighIntensity
    ? newExcersiceObject.time
    : newExcersiceObject.rest;
  let intervalText = isHighIntensity ? "High Intensity" : "Low Intensity";
  let intervalColor = isHighIntensity ? "#F84F31" : "#23C552";

  document.documentElement.style.setProperty("--main-color", intervalColor);
  document.getElementById("timer-bar").value = intervalTime;
  document.getElementById("timer-bar").max = intervalTime;
  document.getElementById("current-heading").innerText = intervalText;
  let timerId = setTimeout(countdown, 1000);

  function countdown() {
    console.log(document.getElementById("timer-bar").value);
    intervalTime--;
    document.getElementById("timer-bar").value = intervalTime;

    if (intervalTime === -1) {
      isHighIntensity = !isHighIntensity;
      setsRemaining--;

      if (setsRemaining === 0) {
        console.log("Exercise completed");
        clearTimeout(timerId);
        coolDown();
        return;
      }

      intervalTime = isHighIntensity
        ? newExcersiceObject.time
        : newExcersiceObject.rest;
      document.getElementById("timer-bar").value = intervalTime;
      document.getElementById("timer-bar").max = intervalTime;
      let intervalText = isHighIntensity ? "High Intensity" : "Low Intensity";
      document.getElementById("current-heading").innerText =
        arrayOfExcersices[1].name + " - " + intervalText;
      let intervalColor = isHighIntensity ? "#F84F31" : "#23C552";
      document.documentElement.style.setProperty("--main-color", intervalColor);
    }
    timerId = setTimeout(countdown, 1000);
  }
}

function coolDown() {
  document.getElementById("current-heading").innerText = "Cool-down";
  document.getElementById("timer-bar").max = arrayOfExcersices[2].time;
  document.getElementById("timer-bar").value = arrayOfExcersices[2].time;
  var coolDownTimer = arrayOfExcersices[2].time;
  var timerId = setInterval(countdown, 1000);
  function countdown() {
    if (coolDownTimer == 0) {
      clearInterval(timerId);
      openEndBox();
    } else {
      coolDownTimer--;
      document.getElementById("timer-bar").value = coolDownTimer;
    }
  }
}

function openEndBox() {
  document.querySelector(".endBox").style.display = "inline";
}

function redo() {
  document.querySelector(".endBox").style.display = "none";
  startWarmUp();
}

function reload() {
  location.reload();
}