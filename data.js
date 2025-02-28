import { renderButton } from "./loading.js";
import { getRequest, postRequest } from "./ClassTrouble/api-request.js";

// Retrieve the current user input from local storage
let userInput = localStorage.getItem("currentUserInput");
console.log(userInput);
if (userInput !== null) {
  userInput = JSON.parse(userInput);
}

// If no user input is found, initialize it as an empty string
if (userInput === null) {
  userInput = "";
}
console.log(userInput);

// Fetch the list of users from the server
const users = await getRequest("user");

// Function to update the text display with the current user input
function updateTextDisplay(textDisplay) {
  textDisplay.setAttribute(
    "text",
    "value: " +
      (userInput || "Enter your name") +
      "; align: center; color: black"
  );
  textDisplay.setAttribute("position", "0 3 -3");
}

// Function to handle key clicks on the virtual keyboard
function handleKeyClick(key, textDisplay, keysContainer) {
  if (key === "<-") {
    // Remove the last character if the backspace key is pressed
    userInput = userInput.slice(0, -1);
  } else if (key === "OK") {
    // Handle the OK key press
    renderButton();
    console.log("Nom validé: ", userInput);
    keysContainer.parentNode.removeChild(keysContainer);
    textDisplay.parentNode.removeChild(textDisplay);

    let playersNames = [];
    console.log("ceci est la longueur ", users.length);
    for (let i = 0; i < users.length; i++) {
      playersNames.push(users[i].players_name.toUpperCase());
    }

    let existingPlayer = playersNames.includes(userInput);

    if (existingPlayer) {
      // If the player already exists, update the display and set the start button text
      console.log("Données enregistrées: ", existingPlayer);
      updateTextDisplay(textDisplay);
      let startButton = document.getElementById("startButton");
      startButton.setAttribute(
        "text",
        "value: CONTINUE; align: center; color: white; width: 3; font: ./ClassTrouble/assets/font/Gloria-msdf.json; font-image: ./ClassTrouble/assets/font/Gloria-msdf.png; negate:false"
      );
      console.log("Existe déjà");

      localStorage.setItem("currentUserInput", JSON.stringify(userInput));

      return userInput;
    } else {
      // If the player does not exist, create a new player entry
      console.log("Nom: ", userInput);
      fetch('https://florian-bounissou.fr/ClassTrouble/SAE402-4-api/api/user', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(userInput),
          money: 0,
          round: 0,
          id_questions: [],
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur réseau : " + response.status);
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("Erreur :", error));
    }
    if (localStorage.getItem("currentUserInput")) {
      localStorage.removeItem("currentUserInput");
    }
    localStorage.setItem("currentUserInput", JSON.stringify(userInput));
  } else {
    // Append the key to the user input
    userInput += key;
  }
  updateTextDisplay(textDisplay);
  console.log("Nom: ", userInput);
}

// Function to initialize the virtual keyboard
function initializeKeyboard(keysContainer, textDisplay) {
  let keys = "AZERTYUIOPQSDFGHJKLMWXCVBN".split("");
  let specialKeys = ["<-", "OK"];
  let keySpacingX = 0.25;
  let keySpacingY = 0.3;
  let rowSize = 10;

  // Create key entities for each letter key
  keys.forEach((key, index) => {
    let keyEntity = document.createElement("a-plane");
    keyEntity.setAttribute(
      "geometry",
      "primitive: plane; width: 0.2; height: 0.2"
    );
    keyEntity.setAttribute("collidable", "");
    keyEntity.setAttribute("material", "color: #222");
    keyEntity.setAttribute(
      "text",
      `value: ${key}; align: center; color: white; width: 4`
    );
    keyEntity.setAttribute(
      "position",
      `${(index % rowSize) * keySpacingX - 1.0} ${
        2 - Math.floor(index / rowSize) * keySpacingY
      } -1`
    );
    keyEntity.setAttribute("class", "key");
    keyEntity.addEventListener("click", () => {
      handleKeyClick(key, textDisplay, keysContainer);
    });

    keyEntity.addEventListener("raycaster-intersected", () => {
      keyEntity.setAttribute("material", "color: #555");
    });

    keyEntity.addEventListener("raycaster-intersected-cleared", () => {
      keyEntity.setAttribute("material", "color: #222");
    });

    keysContainer.appendChild(keyEntity);
  });

  // Create key entities for special keys (backspace and OK)
  specialKeys.forEach((key, index) => {
    let keyEntity = document.createElement("a-entity");
    keyEntity.setAttribute(
      "geometry",
      "primitive: plane; width: 0.5; height: 0.2"
    );
    keyEntity.setAttribute("material", "color: #444");
    keyEntity.setAttribute(
      "text",
      `value: ${key}; align: center; color: white; width: 4`
    );
    keyEntity.setAttribute("position", `${index * 0.6 - 0.3} 1 -1`);
    keyEntity.setAttribute("class", "key");
    keyEntity.addEventListener("click", () => {
      handleKeyClick(key, textDisplay, keysContainer);
    });
    keysContainer.appendChild(keyEntity);
  });

  updateTextDisplay(textDisplay);
}

export { initializeKeyboard, userInput };
