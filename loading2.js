import { initializeKeyboard } from "./data.js";

// Function to render the buttons and input field
let renderButton = function () {
  // Create the start button
  let button = document.createElement("a-entity");
  button.setAttribute("id", "startButton");
  button.setAttribute("geometry", "primitive: plane; height: 0.5; width: 2");
  button.setAttribute("material", "color: red");
  button.setAttribute("position", "0 3 -3");
  button.setAttribute(
    "text",
    "value: START; align: center; color: white; width: 3; font: ./ClassTrouble/assets/font/Gloria-msdf.json; font-image: ./ClassTrouble/assets/font/Gloria-msdf.png; negate:false"
  );

  // Create the rules button
  let buttonRules = document.createElement("a-entity");
  buttonRules.setAttribute("id", "buttonRules");
  buttonRules.setAttribute(
    "geometry",
    "primitive: plane; height: 0.5; width: 2"
  );
  buttonRules.setAttribute("material", "color: blue");
  buttonRules.setAttribute("position", "0 2.5 -3");
  buttonRules.setAttribute(
    "text",
    "value: RULES; align: center; color: white; width: 3; font: ./ClassTrouble/assets/font/Gloria-msdf.json; font-image: ./ClassTrouble/assets/font/Gloria-msdf.png; negate:false"
  );

  // Create the command button
  let buttonCommande = document.createElement("a-entity");
  buttonCommande.setAttribute("id", "buttonCommande");
  buttonCommande.setAttribute(
    "geometry",
    "primitive: plane; height: 0.5; width: 2"
  );
  buttonCommande.setAttribute("material", "color: green");
  buttonCommande.setAttribute("position", "0 2 -3");
  buttonCommande.setAttribute(
    "text",
    "value: CONTROLS; align: center; color: white; width: 3; font: ./ClassTrouble/assets/font/Gloria-msdf.json; font-image: ./ClassTrouble/assets/font/Gloria-msdf.png; negate:false"
  );

  // Create the input field
  let ascene = document.querySelector("a-scene");
  let input = document.createElement("a-input");
  input.setAttribute("id", "userInput");
  input.setAttribute("placeholder", "Enter text here");
  input.setAttribute("position", "0 1.5 -3");
  input.setAttribute("width", "2");
  input.setAttribute("color", "white");
  input.setAttribute("background", "black");
  ascene.appendChild(input);

  // Event listener for input change
  input.addEventListener("change", function (event) {
    console.log("User Input: ", event.target.value);
  });

  // Append buttons to the scene
  ascene.appendChild(button);
  ascene.appendChild(buttonRules);
  ascene.appendChild(buttonCommande);

  // Event listener for start button click
  button.addEventListener("click", function () {
    console.log("Button Clicked");
    window.location.href = "./ClassTrouble/index.html";
  });

  // Event listener for rules button click
  buttonRules.addEventListener("click", function () {
    console.log("Button Rules Clicked");
    let txt = document.getElementById("text");
    if (txt) {
      ascene.removeChild(txt);
    }
    let ascene = document.querySelector("a-scene");
    renderBoard(ascene);
    let aText = document.createElement("a-text");
    aText.setAttribute("id", "text");
    aText.setAttribute(
      "value",
      "The rules are simple\nwhen you spawn in the classroom, try to find some stuff who can be detected with a loup and an effect on the hover are try to do some task, after collecting all the word, try to memorize them and pass the test, each good answer can great you 3 coins that you can spend on the shop, but if your response is incorrect, be careful …"
    );
    aText.setAttribute("scale", ".5 .5 .5");
    aText.setAttribute("position", `0 2.35 -1.80`);
    aText.setAttribute("rotation", "0 0 0");
    aText.setAttribute("font", "./ClassTrouble/assets/font/Gloria-msdf.json");
    aText.setAttribute(
      "font-image",
      "./ClassTrouble/assets/font/Gloria-msdf.png"
    );
    aText.setAttribute("negate", "false");
    aText.setAttribute("align", "center");
    aText.setAttribute("color", "#FFF");
    ascene.appendChild(aText);

    // Create the exit arrow
    let arrow = document.createElement("a-entity");
    arrow.setAttribute("id", "arrow");
    arrow.setAttribute("geometry", "primitive: plane; height: 0.25; width: .5");
    arrow.setAttribute("material", "color: red");
    arrow.setAttribute("position", `1.35 1.42 -1.80`);
    arrow.setAttribute(
      "text",
      "value: Exit ->; align: center; color: white; width: 3; font: ./ClassTrouble/assets/font/Gloria-msdf.json; font-image: ./ClassTrouble/assets/font/Gloria-msdf.png; negate:false"
    );
    ascene.appendChild(arrow);

    // Event listener for arrow click
    arrow.addEventListener("click", function () {
      console.log("Arrow Clicked");
      let text = document.getElementById("text");
      let arrow = document.getElementById("arrow");
      ascene.removeChild(text);
      ascene.removeChild(arrow);
      let boards = document.querySelectorAll("#board");
      console.log(boards);
      boards.forEach((board) => ascene.removeChild(board));
    });
  });

  // Event listener for command button click
  buttonCommande.addEventListener("click", function () {
    let txt = document.getElementById("text");
    if (txt) {
      ascene.removeChild(txt);
    }
    console.log("Button Commande Clicked");
    let ascene = document.querySelector("a-scene");
    renderBoard(ascene);

    let aText = document.createElement("a-text");
    aText.setAttribute("id", "text");
    aText.setAttribute(
      "value",
      "You can use the joystick are keyboard\n z-q-s-d to mouve, you can also grab\n certains objets with the left click\n or grab / throw them with the right click"
    );
    aText.setAttribute("scale", ".5 .5 .5");
    aText.setAttribute("position", `0 2.35 -1.80`);
    aText.setAttribute("rotation", "0 0 0");
    aText.setAttribute("font", "./ClassTrouble/assets/font/Gloria-msdf.json");
    aText.setAttribute(
      "font-image",
      "./ClassTrouble/assets/font/Gloria-msdf.png"
    );
    aText.setAttribute("negate", "false");
    aText.setAttribute("align", "center");
    aText.setAttribute("color", "#FFF");
    ascene.appendChild(aText);

    // Create the exit arrow
    let arrow = document.createElement("a-entity");
    arrow.setAttribute("id", "arrow");
    arrow.setAttribute("geometry", "primitive: plane; height: 0.20; width: .5");
    arrow.setAttribute("material", "color: red");
    arrow.setAttribute("position", `1.35 1.42 -1.80`);
    arrow.setAttribute(
      "text",
      "value: Exit ->; align: center; color: white; width: 3; font: ./ClassTrouble/assets/font/Gloria-msdf.json; font-image: ./ClassTrouble/assets/font/Gloria-msdf.png; negate:false"
    );
    ascene.appendChild(arrow);

    // Event listener for arrow click
    arrow.addEventListener("click", function () {
      console.log("Arrow Clicked");
      let text = document.getElementById("text");
      let arrow = document.getElementById("arrow");
      ascene.removeChild(text);
      ascene.removeChild(arrow);
      let boards = document.querySelectorAll("#board");
      console.log(boards);
      boards.forEach((board) => ascene.removeChild(board));
    });
  });
};

// Function to render the board
let renderBoard = function (ascene) {
  const box1 = document.createElement("a-box");
  box1.setAttribute("id", "board");
  box1.setAttribute("static-body", "");
  box1.setAttribute("position", "0 2.25 -2");
  box1.setAttribute("scale", "4 2.5 0.01");
  box1.setAttribute("color", "#093e2e");
  ascene.appendChild(box1);

  const box2 = document.createElement("a-box");
  box2.setAttribute("id", "board");
  box2.setAttribute("static-body", "");
  box2.setAttribute("position", "0 3.5 -2");
  box2.setAttribute("scale", "4.1 0.1 0.05");
  box2.setAttribute("color", "#885f32");
  ascene.appendChild(box2);

  const box3 = document.createElement("a-box");
  box3.setAttribute("id", "board");
  box3.setAttribute("static-body", "");
  box3.setAttribute("position", "0 1 -2");
  box3.setAttribute("scale", "4.1 0.1 0.05");
  box3.setAttribute("color", "#885f32");
  ascene.appendChild(box3);

  const box4 = document.createElement("a-box");
  box4.setAttribute("id", "board");
  box4.setAttribute("static-body", "");
  box4.setAttribute("position", "-2 2.25 -2");
  box4.setAttribute("scale", "0.1 2.55 0.05");
  box4.setAttribute("color", "#885f32");
  ascene.appendChild(box4);

  const box5 = document.createElement("a-box");
  box5.setAttribute("id", "board");
  box5.setAttribute("static-body", "");
  box5.setAttribute("position", "2 2.25 -2");
  box5.setAttribute("scale", "0.1 2.55 0.05");
  box5.setAttribute("color", "#885f32");
  ascene.appendChild(box5);

  // Add event listeners to remove the board and text on click
  setTimeout(() => {
    let text = document.getElementById("text");
    let arrow = document.getElementById("arrow");
    let boards = document.querySelectorAll("#board");
    text.addEventListener("click", function () {
      boards.forEach((b) => ascene.removeChild(b));
      ascene.removeChild(text);
      ascene.removeChild(arrow);
    });

    boards.forEach((board) => {
      board.addEventListener("click", function () {
        boards.forEach((b) => ascene.removeChild(b));
        ascene.removeChild(text);
        ascene.removeChild(arrow);
      });
    });
  }, 0);
};

// Initialize the keyboard
let textDisplay = document.querySelector("#textDisplay");
let keysContainer = document.querySelector("#keysContainer");

initializeKeyboard(keysContainer, textDisplay);

export { renderButton };
