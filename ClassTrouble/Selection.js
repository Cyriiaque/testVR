// Imported dependencies and helper functions
import { StartTest } from "./test.js";
import { getRequest } from "./api-request.js";

// Retrieve saved user input from localStorage
let storedUserInput = JSON.parse(localStorage.getItem("currentUserInput"));
if (storedUserInput) {
  console.log("Stored user input:", storedUserInput);
} else {
  console.log("No stored user input found");
}

// Fetch user data from API using the stored input
const userData = await getRequest("user?name=" + storedUserInput);

// Fetch local JSON data containing vocabulary info
const response = await fetch("./Json/data.json");
const data = await response.json();

// Get the A-Frame scene element from the DOM
var scene = document.querySelector("a-scene");

// Initialize counter for collected vocabulary objects
let cpt_obj = 0;

const objectclickedsound = document.querySelector("#correct");
const clicsound = document.querySelector("#clickSound");

// Function to create and append vocabulary text
function createVocabText(id, obj, position) {
  objectclickedsound.components.sound.playSound();
  const textElement = document.createElement("a-text");
  let lines = [];
  for (let key in obj) {
    lines.push(key + " --> " + obj[key]);
  }
  textElement.setAttribute("id", id);
  textElement.setAttribute("value", lines.join("\n"));
  textElement.setAttribute("scale", "0.5 0.5 0.5");
  textElement.setAttribute("position", position);
  textElement.setAttribute("align", "left");
  textElement.setAttribute("font", "./assets/font/Gloria-msdf.json");
  textElement.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  textElement.setAttribute("negate", "false");
  textElement.setAttribute("color", "#FFF");
  scene.appendChild(textElement);
}

// Function to create and append the test prompt
function createTestPrompt() {
  clicsound.components.sound.playSound();
  const foundText = document.createElement("a-text");
  foundText.setAttribute("id", "found-text");
  foundText.setAttribute("value", "Proceed to the test");
  foundText.setAttribute("position", "-2.1 2.15 -9.47");
  foundText.setAttribute("scale", "0.5 0.5 0.5");
  foundText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  foundText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  foundText.setAttribute("negate", "false");
  foundText.setAttribute("class", "clickable");

  const testBoxBorder1 = document.createElement("a-box");
  testBoxBorder1.setAttribute("position", "-1.55 2.25 -9.48");
  testBoxBorder1.setAttribute("scale", "1.7 0.01 0.01");
  testBoxBorder1.setAttribute("color", "#FFFFFF");
  scene.appendChild(testBoxBorder1);

  const testBoxBorder2 = document.createElement("a-box");
  testBoxBorder2.setAttribute("position", "-1.55 1.95 -9.48");
  testBoxBorder2.setAttribute("scale", "1.7 0.01 0.01");
  testBoxBorder2.setAttribute("color", "#FFFFFF");
  scene.appendChild(testBoxBorder2);

  const testBoxBorder3 = document.createElement("a-box");
  testBoxBorder3.setAttribute("position", "-2.4 2.1 -9.48");
  testBoxBorder3.setAttribute("scale", "0.01 0.3 0.01");
  testBoxBorder3.setAttribute("color", "#FFFFFF");
  scene.appendChild(testBoxBorder3);

  const testBoxBorder4 = document.createElement("a-box");
  testBoxBorder4.setAttribute("position", "-0.7 2.1 -9.48");
  testBoxBorder4.setAttribute("scale", "0.01 0.3 0.01");
  testBoxBorder4.setAttribute("color", "#FFFFFF");
  scene.appendChild(testBoxBorder4);

  const testBox = document.createElement("a-box");
  testBox.setAttribute("id", "test-button");
  testBox.setAttribute("visible", "false");
  testBox.setAttribute("position", "-1.55 2.1 -9.47");
  testBox.setAttribute("scale", "1.7 0.3 0.01");

  testBox.addEventListener("click", function () {
    ["vocab-comp", "vocab-book", "vocab-paint", "vocab-car"].forEach(function (
      id
    ) {
      let el = document.getElementById(id);
      if (el) {
        scene.removeChild(el);
      }
    });
    StartTest();
  });

  scene.appendChild(testBox);
  scene.appendChild(foundText);
}

// Function to handle object click events
function handleObjectClick(id, obj, position) {
  const existingText = document.querySelector(`#${id}`);
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
  }
  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj + "/4");
  createVocabText(id, obj, position);
}

// Function to handle mouse enter and leave events
function handleMouseEvents(
  element,
  iconId,
  scaleEnter,
  scaleLeave,
  iconPosition,
  iconScale
) {
  element.addEventListener("mouseenter", function () {
    element.setAttribute("animation", {
      property: "scale",
      to: scaleEnter,
      dur: 200,
    });
    var icon = document.createElement("a-entity");
    icon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
    icon.id = iconId;
    icon.setAttribute("position", iconPosition);
    icon.setAttribute("scale", iconScale);

    var camera = document.querySelector("[camera]");
    var cameraPosition = camera.getAttribute("position");
    var elementPosition = element.getAttribute("position");
    var dx = cameraPosition.x - elementPosition.x;
    var dz = cameraPosition.z - elementPosition.z;
    var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;
    icon.setAttribute("rotation", `45 ${rotationY} 0`);
    element.appendChild(icon);
  });

  element.addEventListener("mouseleave", function () {
    var icon = document.getElementById(iconId);
    if (icon) {
      element.removeChild(icon);
    }
    element.setAttribute("animation", {
      property: "scale",
      to: scaleLeave,
      dur: 200,
    });
  });
}

// If the user round is greater than 0, display all vocabulary texts and the test prompt
if (userData[0].round > 0) {
  cpt_obj = 4;
  createVocabText("vocab-comp", data[0].computerdata[0], "-1.2 2.1 -9.47");
  createVocabText("vocab-book", data[0].bookdata[0], "-1.2 3 -9.47");
  createVocabText("vocab-paint", data[0].paintData[0], "-2.5 2.1 -9.47");
  createVocabText("vocab-car", data[0].car[0], "-2.5 3 -9.47");
  createTestPrompt();
}

// Create and append counter text (displays how many objects have been found)
const counterText = document.createElement("a-text");
counterText.setAttribute("id", "counter-text");
counterText.setAttribute("value", "Objects " + cpt_obj + "/4");
counterText.setAttribute("align", "center");
counterText.setAttribute("position", "1.35 3.7 -9.47");
counterText.setAttribute("font", "./assets/font/Gloria-msdf.json");
counterText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
counterText.setAttribute("negate", "false");
counterText.setAttribute("scale", "0.7 0.7 0.7");
scene.appendChild(counterText);

// Event listeners for objects
var computer = document.getElementById("computer-");
handleMouseEvents(
  computer,
  "computer-icon",
  "0.07 0.07 0.07",
  "0.05 0.05 0.05",
  "0 4 0",
  "10 10 10"
);
computer.addEventListener("click", function () {
  objectclickedsound.components.sound.playSound();
  handleObjectClick("vocab-comp", data[0].computerdata[0], "0.3 2.1 -9.47");
});

var book = document.getElementById("book");
book.setAttribute("position", "5.950 2.00 0.650");
handleMouseEvents(
  book,
  "eye-icon",
  "0.4 0.4 0.4",
  "0.3 0.3 0.3",
  "0 0.5 0",
  "1 1 1"
);
book.addEventListener("click", function () {
  objectclickedsound.components.sound.playSound();
  handleObjectClick("vocab-book", data[0].bookdata[0], "0.3 3 -9.47");
});

var paint = document.getElementById("paint-");
handleMouseEvents(
  paint,
  "brush-icon",
  "0.11 0.11 0.11",
  "0.1 0.1 0.1",
  "0 5 -5",
  "5 5 5"
);
paint.addEventListener("click", function () {
  objectclickedsound.components.sound.playSound();
  handleObjectClick("vocab-paint", data[0].paintData[0], "1.6 2.1 -9.47");
});

let car = document.getElementById("car-");
handleMouseEvents(
  car,
  "car-icon",
  "0.6 0.6 0.6",
  "0.5 0.5 0.5",
  "0 0.8 0",
  "1 1 1"
);
car.addEventListener("click", function () {
  objectclickedsound.components.sound.playSound();
  handleObjectClick("vocab-car", data[0].car[0], "1.6 3 -9.47");
});

// Exit door event
let door = document.getElementById("exit");
door.addEventListener("click", function () {
  console.log("door clicked");
  window.location.href = "../index.html";
});

// Helper Function: isFound()
// Checks if all vocabulary objects have been found.
// If counter equals 4, display the test prompt and bind the event to start a test.
function isFound() {
  if (cpt_obj === 4) {
    createTestPrompt();
  }
}
