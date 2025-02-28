// Everything in this file is used to create the test scene and the test itself
// The test is composed of a series of questions with two possible answers
// The user must select the correct answer to progress to the next question
// If the user selects the wrong answer, a random event will occur


const scene = document.querySelector("a-scene");
const response = await fetch('./Json/question.json');
const temp = await response.json();
console.log(temp);

let  storedUserInput = JSON.parse(localStorage.getItem("currentUserInput"));
if (storedUserInput) {
    console.log("Stored user input:", storedUserInput);
} else {
    console.log("No stored user input found");
}


import { getRequest } from "./api-request.js";
const userData = await getRequest("user?name=" + storedUserInput);

let money = document.querySelector("#money");
money.setAttribute("value", parseInt(userData[0].money));


let rounds = [2,4,6,8,10,12,14,16,18];
let round = parseInt(userData[0].round);
let questionIndex = 0;


const userText = document.createElement("a-text");
userText.setAttribute("position", "2.5 3.5 -9.47");
userText.setAttribute("value", "Name : " + (storedUserInput || "Guest"));
userText.setAttribute("color", "#FFF");
userText.setAttribute("align", "center");
userText.setAttribute("width", "2.5");
userText.setAttribute("font", "./assets/font/Gloria-msdf.json");
userText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
userText.setAttribute("negate", "false");

const roundText = document.createElement("a-text");
roundText.setAttribute("position", "2.5 3.0 -9.47");
roundText.setAttribute("value", "Round: " + (round + 1));
roundText.setAttribute("color", "#FFF");
roundText.setAttribute("align", "center");
roundText.setAttribute("width", "2.5");
roundText.setAttribute("font", "./assets/font/Gloria-msdf.json");
roundText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
roundText.setAttribute("negate", "false");


scene.appendChild(userText);
scene.appendChild(roundText);
;




// Setting up correct answers and questions for each round
let data = [];

for (let i = 0; i < rounds.length; i++) {
    const nb = rounds[i];
    const roundQuestions = [];
    // Create a copy of the questions to sample from for this round
    const availableQuestions = [...temp];
    for (let j = 0; j < nb; j++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        roundQuestions.push(availableQuestions.splice(randomIndex, 1)[0]);
    }
    data.push(roundQuestions);
}

console.log(data);

let correctAnswers = [];
data.forEach(roundArr => {
  roundArr.forEach(q => {
    if (q.reponses[0].est_correcte === true) {
        correctAnswers.push(q.reponses[0].texte_reponse);
    }
    if (q.reponses[1].est_correcte === true) {
        correctAnswers.push(q.reponses[1].texte_reponse);
    }
  });
});
console.log(correctAnswers);


let cpt_resp = 0;

async function StartTest() {
    // Set the initial position and movement controls for the camera
    const camera = document.querySelector("#rig");
    camera.setAttribute("position", "1.8 0 2.3");
    camera.setAttribute("movement-controls", "constrainToNavMesh: true; controls: checkpoint;");

    // Remove dynamic body attribute from the chair
    let chair = document.querySelector("#cr-chair");
    chair.removeAttribute("dynamic-body");

    const scene = document.querySelector("a-scene");

    // Create an info box to display the test information
    const infoBox = document.createElement("a-box");
    infoBox.setAttribute("id", "infoBox");
    infoBox.setAttribute("position", "1.8 1.5 1.3");
    infoBox.setAttribute("rotation", "-90 0 0");
    infoBox.setAttribute("width", "1.4");
    infoBox.setAttribute("height", "1.2");
    infoBox.setAttribute("depth", "0.01");
    infoBox.setAttribute("material", "color: #fff; opacity: 1");

    // Create a text element to display the start of the test
    const textElement = document.createElement("a-text");
    textElement.setAttribute("value", "Start of the test...");
    textElement.setAttribute("color", "#000");
    textElement.setAttribute("align", "center");
    textElement.setAttribute("width", "1.4");
    textElement.setAttribute("wrapCount", "15");
    textElement.setAttribute("position", "0 0 0.01");

    // Create a progress element indicating the round and the number of remaining questions
    const progressText = document.createElement("a-text");
    progressText.setAttribute("id", "progress");
    progressText.setAttribute("value", `Round ${round + 1}: ${data[round].length - questionIndex} questions remaining`);
    progressText.setAttribute("color", "#000");
    progressText.setAttribute("align", "center");
    progressText.setAttribute("width", "1.4");
    progressText.setAttribute("position", "0 0.5 0.01");

    infoBox.appendChild(textElement);
    textElement.appendChild(progressText);
    scene.appendChild(infoBox);

    // After a short timeout, load the first question of the current round
    setTimeout(() => {
        // Use data[round][questionIndex]
        const currentQuestion = data[round][questionIndex];
        textElement.setAttribute("value", currentQuestion.texte_question);
        textElement.setAttribute("id", "question");

        // Create text elements for the responses
        const textReponse1 = document.createElement("a-text");
        textReponse1.setAttribute("value", currentQuestion.reponses[0].texte_reponse);
        textReponse1.setAttribute("id", "reponse1");
        textReponse1.setAttribute("color", "#000");
        textReponse1.setAttribute("align", "center");
        textReponse1.setAttribute("wrapCount", "20");
        textReponse1.setAttribute("position", "0 -0.2 0.01");
        textReponse1.setAttribute("scale", "0.4 0.4 0.4");
        infoBox.appendChild(textReponse1);

        const textReponse2 = document.createElement("a-text");
        textReponse2.setAttribute("value", currentQuestion.reponses[1].texte_reponse);
        textReponse2.setAttribute("id", "reponse2");
        textReponse2.setAttribute("color", "#000");
        textReponse2.setAttribute("align", "center");
        textReponse2.setAttribute("wrapCount", "25");
        textReponse2.setAttribute("position", "0 -0.4 0.01");
        textReponse2.setAttribute("scale", "0.4 0.4 0.4");
        infoBox.appendChild(textReponse2);

        // Create hit boxes for the responses
        const hitBoxRep1 = document.createElement("a-box");
        hitBoxRep1.setAttribute("position", "0 0 -0.01");
        hitBoxRep1.setAttribute("id", "HitBoxRep1");
        hitBoxRep1.setAttribute("width", "2");
        hitBoxRep1.setAttribute("height", "0.2");
        hitBoxRep1.setAttribute("depth", "0.01");
        hitBoxRep1.setAttribute("material", "color: #f00; opacity: 0;");
        hitBoxRep1.addEventListener("click", () => {
            if (isCorrect(currentQuestion.reponses[0].texte_reponse)) {
                //son juste
                let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/SAE402-4-api/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
            } else {
                textElement.setAttribute("value", "Wrong !");
                // son wrong
                document.querySelector("#reponse1").setAttribute("value", "");
                document.querySelector("#reponse2").setAttribute("value", "");
                if (Math.random() < 0.5) {
                    characterAnimation();
                    setTimeout(() => {
                        nextQuestion(questionIndex + 1);
                    }, 10000);
                } else {
                    setTimeout(() => {
                        shootBall();
                    }, 1000);
                    setTimeout(() => {
                        nextQuestion(questionIndex + 1);
                    }, 3000);
                }
            }
        });
        textReponse1.appendChild(hitBoxRep1);

        const hitBoxRep2 = document.createElement("a-box");
        hitBoxRep2.setAttribute("position", "0 0 -0.01");
        hitBoxRep2.setAttribute("id", "HitBoxRep2");
        hitBoxRep2.setAttribute("width", "2");
        hitBoxRep2.setAttribute("height", "0.2");
        hitBoxRep2.setAttribute("depth", "0.01");
        hitBoxRep2.setAttribute("material", "opacity: 0;");
        hitBoxRep2.addEventListener("click", () => {
            if (isCorrect(currentQuestion.reponses[1].texte_reponse)) {
                //son juste
                let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/SAE402-4-api/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
            } else {
                textElement.setAttribute("value", "Wrong !");
                // son wrong
                document.querySelector("#reponse1").setAttribute("value", "");
                document.querySelector("#reponse2").setAttribute("value", "");
                if (Math.random() < 0.5) {
                    characterAnimation();
                    setTimeout(() => {
                        nextQuestion(questionIndex + 1);
                    }, 10000);
                } else {
                    setTimeout(() => {
                        shootBall();
                    }, 1000);
                    setTimeout(() => {
                        nextQuestion(questionIndex + 1);
                    }, 3000);
                }
            }
        });
        textReponse2.appendChild(hitBoxRep2);
    }, 2000);
}


// Function to move to the next question in the test
function nextQuestion(newIndex) {
    questionIndex = newIndex;
    const infoBox = document.querySelector("#infoBox");
    const questionElem = document.querySelector("#question");

    // If current round is finished then increment round
    if (questionIndex >= data[round].length) {
        // If there is a next round, increment round and reset questionIndex.
        if (round < data.length - 1) {
            round++;
            questionIndex = 0;
            questionElem.setAttribute("value", "Round " + (round + 1) + " begins...");

            // Brief pause before next round questions load
            setTimeout(() => {
                updateQuestion(infoBox);
            }, 2000);
        } else {
            // End of the entire test
            questionElem.setAttribute("value", "End of the test, you got " + cpt_resp + "/" + (data.flat().length) +
                " And you got " + cpt_resp * 2 + " shop credits");
            document.querySelector("#reponse1").setAttribute("value", "");
            document.querySelector("#reponse2").setAttribute("value", "");
            
            setTimeout(() => {
                const camera = document.querySelector("#rig");
                camera.setAttribute("position", "1.8 0 2.3");
                camera.setAttribute("movement-controls", "constrainToNavMesh: true; controls: checkpoint, gamepad, trackpad, keyboard, nipple;");
                const chair = document.querySelector("#cr-chair");
                chair.setAttribute("dynamic-body", "");
                const infoBox = document.querySelector("#infoBox");
                if (infoBox) {
                    infoBox.parentNode.removeChild(infoBox);
                }
            }, 5000);
        }
        return;
    }

    updateQuestion(infoBox);
}


// Function to update the question and responses during the test

function updateQuestion(infoBox) {
    const currentQuestion = data[round][questionIndex];
    const questionElem = document.querySelector("#question");
    questionElem.setAttribute("value", currentQuestion.texte_question);

    // Update of the text display
    let progressText = document.querySelector("#progress");
    if (progressText) {
      progressText.setAttribute("value", `Round ${round + 1}: ${data[round].length - questionIndex} questions remaining`);
    }

    let reponse1 = document.querySelector("#reponse1");
    let reponse2 = document.querySelector("#reponse2");

    // Update response text values
    reponse1.setAttribute("value", currentQuestion.reponses[0].texte_reponse);
    reponse2.setAttribute("value", currentQuestion.reponses[1].texte_reponse);

    // Remove any previous hitBoxes if present
    while (reponse1.firstChild) {
        reponse1.removeChild(reponse1.firstChild);
    }
    while (reponse2.firstChild) {
        reponse2.removeChild(reponse2.firstChild);
    }

    const hitBoxRep1 = document.createElement("a-box");
    hitBoxRep1.setAttribute("position", "0 0 -0.01");
    hitBoxRep1.setAttribute("id", "HitBoxRep1");
    hitBoxRep1.setAttribute("width", "2");
    hitBoxRep1.setAttribute("height", "0.2");
    hitBoxRep1.setAttribute("depth", "0.01");
    hitBoxRep1.setAttribute("material", "color: #f00; opacity: 0;");
    hitBoxRep1.addEventListener("click", () => {
        if (isCorrect(currentQuestion.reponses[0].texte_reponse)) {
            //son juste
            let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/SAE402-4-api/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
        } else {
            questionElem.setAttribute("value", "Wrong !");
            // son wrong
            document.querySelector("#reponse1").setAttribute("value", "");
            document.querySelector("#reponse2").setAttribute("value", "");
            if (Math.random() < 0.5) {
                characterAnimation();
                setTimeout(() => {
                    nextQuestion(questionIndex + 1);
                }, 10000);
            } else {
                setTimeout(() => {
                    shootBall();
                }, 1000);
                setTimeout(() => {
                    nextQuestion(questionIndex + 1);
                }, 3000);
            }
        }
    });
    reponse1.appendChild(hitBoxRep1);

    const hitBoxRep2 = document.createElement("a-box");
    hitBoxRep2.setAttribute("position", "0 0 -0.01");
    hitBoxRep2.setAttribute("id", "HitBoxRep2");
    hitBoxRep2.setAttribute("width", "2");
    hitBoxRep2.setAttribute("height", "0.2");
    hitBoxRep2.setAttribute("depth", "0.01");
    hitBoxRep2.setAttribute("material", "opacity: 0;");
    hitBoxRep2.addEventListener("click", () => {
        if (isCorrect(currentQuestion.reponses[1].texte_reponse)) {
            //son juste
            let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/SAE402-4-api/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
        } else {
            questionElem.setAttribute("value", "Wrong !");
            // son wrong
            document.querySelector("#reponse1").setAttribute("value", "");
            document.querySelector("#reponse2").setAttribute("value", "");
            if (Math.random() < 0.5) {
                characterAnimation();
                setTimeout(() => {
                    nextQuestion(questionIndex + 1);
                }, 10000);
            } else {
                setTimeout(() => {
                    shootBall();
                }, 1000);
                setTimeout(() => {
                    nextQuestion(questionIndex + 1);
                }, 3000);
            }
            
        }
    });
    reponse2.appendChild(hitBoxRep2);
}

function isCorrect(value) {
    return correctAnswers.includes(value);
};



//-------------------------------------------------------------//
//Following function will touche the character and make it move//
//-------------------------------------------------------------//




// Character animation function
//
// This function initializes the character with a walking animation,
// sets its initial rotation and position, and then transitions to a running sequence.
let characterAnimation = function () {
    let animations = ["Punch_Right", "Punch_Left", "Kick_Right", "Kick_Left"];
    let emote = ["Roll", "Death", "Gun_Shoot"];
    let acharacter = document.getElementById('characters');
    acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Walk; loop: repeat; timeScale: 1');
    acharacter.setAttribute('rotation', '0 90 0');
    acharacter.setAttribute('animation', 'property: position; to: 0 0 -8; dur: 1000; easing: linear');

    setTimeout(function () {
        acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Run; loop: repeat; timeScale: 1');
        acharacter.setAttribute('rotation', '0 0 0');
        acharacter.setAttribute('animation', 'property: position; to: 0 0 2; dur: 2000; easing: linear');

        setTimeout(function () {
            acharacter.setAttribute('rotation', '0 90 0');
            let randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            acharacter.setAttribute('animation-mixer', `clip: CharacterArmature|${randomAnimation}; loop: once; timeScale: 1`);

            setTimeout(function () {
                acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Run_Back; loop: repeat; timeScale: 1');
                acharacter.setAttribute('animation', 'property: position; to: 0 0 -4; dur: 2000; easing: linear');
                acharacter.setAttribute('rotation', '0 0 0');

                setTimeout(function () {
                    let randomEmote = emote[Math.floor(Math.random() * emote.length)];
                    acharacter.setAttribute('animation-mixer', `clip: CharacterArmature|${randomEmote}; loop: once; timeScale: 1`);
                    acharacter.setAttribute('animation', 'property: position; to: 0 0 -8; dur: 2000; easing: linear');
                    acharacter.setAttribute('rotation', '0 35 0');

                    setTimeout(function () {
                        acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Walk; loop: repeat; timeScale: 1');
                        acharacter.setAttribute('animation', 'property: position; to: -2 0 -8; dur: 1000; easing: linear');
                        acharacter.setAttribute('rotation', '0 -90 0');

                        setTimeout(function () {
                            acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Idle; loop: repeat; timeScale: 1');
                            acharacter.setAttribute('rotation', '0 0 0');
                        }, 1000);
                    }, 2000);
                }, 1000);
            }, 1000);
        }, 2000);
    }, 1000);
};


// Ball shooting function for the character
function shootBall() {
    let character = document.getElementById("characters");
    character.removeAttribute("animation-mixer");

    let ball = document.createElement("a-sphere");
    let size = Math.random() * 0.2 + 0.1;
    ball.setAttribute("radius", size);
    ball.setAttribute("position", "-2.15 2.15 -8");
    ball.setAttribute("click-grab", "");    
    ball.setAttribute("color", "red");
    
    let ascene = document.querySelector("a-scene");
    ascene.appendChild(ball);
    
    ball.setAttribute("animation", "property: position; to: 2 2 2.7; dur: 500; easing: linear");
    character.setAttribute("animation-mixer", "clip: CharacterArmature|Gun_Shoot; loop: once; timeScale: 1");
    
    setTimeout(() => {
      ball.setAttribute("dynamic-body", "");
    }, 500);
}

export { StartTest };
