let renderCharacter = function () {
    let animations = ["Punch_Right", "Punch_Left", "Kick_Right", "Kick_Left"];
    let emote=["Roll", "Death","Gun_Shoot"]
  
    let ascene = document.querySelector('a-scene');
    let acharacter = document.createElement('a-entity');
    acharacter.setAttribute('gltf-model', '#character');
    acharacter.setAttribute('scale', '1.75 1.75 1.75');
    acharacter.setAttribute('position', '-2 0 -8');
    acharacter.setAttribute('id', 'characters');
    acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Idle; loop: repeat; timeScale: 1');
    ascene.appendChild(acharacter);
  
    acharacter.addEventListener("click", function () {
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
    });
  };
  let characters = [
    {
      url: "models/teacher/Astronaut.glb",
      img: "assets/teacher/Astronaut.png",
      name: "Astronaut",
      price: "10",
      description: "Space traveler",
    },
    {
      url: "models/teacher/Beach Character.glb",
      img: "assets/teacher/Beach Character.png",
      name: "Beach Character",
      price: "2",
      description: "Chill guy",
    },
    {
      url: "models/teacher/Business Man.glb",
      img: "assets/teacher/Business Man.png",
      name: "Business Man",
      price: "4",
      description: "Rich guy",
    },
    {
      url: "models/teacher/Casual Character.glb",
      img: "assets/teacher/Casual Character.png",
      name: "Casual",
      price: "3",
      description: "Casual Character",
    },
    {
      url: "models/teacher/King.glb",
      img: "assets/teacher/King.png",
      name: "King",
      price: "1",
      description: "King",
    },
    {
      url: "models/teacher/Punk.glb",
      img: "assets/teacher/Punk.png",
      name: "Punk",
      price: "2",
      description: "Punk",
    },
    {
      url: "models/teacher/Swat.glb",
      img: "assets/teacher/Swat.png",
      name: "Swat",
      price: "4",
      description: "Swat",
    },
    {
      url: "models/teacher/Worker.glb",
      img: "assets/teacher/Farmer.png",
      name: "Worker",
      price: "5",
      description: "Worker",
    },
  ];
  
  let colors = [
    { normal: "#8B5A2B", dark: "#654321", price: 5 },
    { normal: "#A67B5B", dark: "#6F4F28", price: 7 },
    { normal: "#D2B48C", dark: "#A08050", price: 3 },
    { normal: "#6B4226", dark: "#4E2A14", price: 6 },
    { normal: "#4B3621", dark: "#2E1A0F", price: 8 },
    { normal: "#B0A999", dark: "#7D7461", price: 4 },
    { normal: "#5D5C61", dark: "#3C3B3D", price: 9 },
    { normal: "#FFF8DC", dark: "#EED5B7", price: 2 }, 
    { normal: "#C0C0C0", dark: "#808080", price: 10 }, 
    { normal: "#3F301D", dark: "#22150C", price: 1 } 
  ];
  
  
  let renderMarket = function () {
    let ascene = document.querySelector('a-scene');
    let amarket = document.createElement('a-entity');
    amarket.setAttribute('gltf-model', '#Snorlax');
    amarket.setAttribute('scale', '3 3 1.5');
    amarket.setAttribute('position', '5.5 .8 8.5');
    amarket.setAttribute('rotation', '0 35 0');
    amarket.setAttribute('id', 'Snorlax');
    ascene.appendChild(amarket);
  
      let atable = document.createElement('a-entity');
    atable.setAttribute('gltf-model', '#table-shop');
    atable.setAttribute('scale', '.5 .5 .5');
    atable.setAttribute('position', '5.5 1 8');
    atable.setAttribute('rotation', '0 35 0');
    atable.setAttribute('id', 'Table-shop');
    ascene.appendChild(atable);
  
    atable.addEventListener("click", function () {
      let otherboxes = document.querySelectorAll("#character-list");
      let othertext = document.querySelectorAll("#text-product");
      let money = document.getElementById("money");
      let moneyvalue = money.getAttribute("value");
      if (otherboxes) {
        otherboxes.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
      if (othertext) {
        othertext.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
      colors.forEach((color, index) => {
        const aBox = document.createElement("a-box");
        aBox.setAttribute("color", color.normal);
        aBox.setAttribute("width", ".5");
        aBox.setAttribute("height", ".5");
        aBox.setAttribute("depth", ".5");
        aBox.setAttribute("rotation", `0 0 0`);
        aBox.setAttribute("id", `box-color`);
        aBox.setAttribute("position", `${3 - (index % 5) * .5} ${3.1 - Math.floor(index / 5) * 1.4} 9.25`);
        const atext = document.createElement("a-text");
        if (color.price == 0){
          atext.setAttribute("value","");
        }
        else{
          atext.setAttribute("value", color.price);
        }
        atext.setAttribute("color", "black");
        atext.setAttribute("id","text-product")
        atext.setAttribute("position", `${3.05 - (index % 5) * .49} ${2.75 - Math.floor(index / 5) * 1.4} 8.75`);
        atext.setAttribute("scale", "1 1 1");
        atext.setAttribute("rotation", "0 180 0");
        ascene.appendChild(atext);
        ascene.appendChild(aBox);
        aBox.addEventListener("click", function () {
          if (Number(color.price) > Number(moneyvalue)){
            renderBoard();
  
          }
          else{
            let tabletops = document.querySelectorAll("#table-top");
            tabletops.forEach((tabletop) => {
              tabletop.setAttribute("color", color.normal);
            });
            let tablebottoms = document.querySelectorAll("#table-bot");
            tablebottoms.forEach((tablebottom) => {
              tablebottom.setAttribute("color", color.dark);
          });
          atext.setAttribute("value","");
          
          moneyvalue = moneyvalue - color.price;
          money.setAttribute("value", moneyvalue);
          color.price = 0;
          }
  
        });
  
      });
    });
  
  
    amarket.addEventListener("click", function () {
      let money = document.getElementById("money");
      let moneyvalue = money.getAttribute("value");
      let otherboxes = document.querySelectorAll("#box-color");
      let othertext = document.querySelectorAll("#text-product");
      if (otherboxes) {
        otherboxes.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
      if (othertext) {
        othertext.forEach((box) => {
          box.parentNode.removeChild(box);
        });
      }
  
      characters.forEach((character, index) => {
        const characterEntity = document.createElement("a-image");
        characterEntity.setAttribute("src", character.img);
        characterEntity.setAttribute("width", "0.4");
        characterEntity.setAttribute("height", "1");
        characterEntity.setAttribute("alt", character.name);
        characterEntity.setAttribute("position", `${3 - (index % 5) * .5} ${3.2 - Math.floor(index / 5) * 1.5} 9.45`);
        characterEntity.setAttribute("rotation", "0 180 0");
        characterEntity.setAttribute("id", `character-list`);
        const atext = document.createElement("a-text");
        if (character.price == 0){
          atext.setAttribute("value","");
        }
        else{
          atext.setAttribute("value", character.price);
        }
        atext.setAttribute("color", "black");
        atext.setAttribute("id","text-product")
        atext.setAttribute("position", `${3.05 - (index % 5) * .49} ${2.75 - Math.floor(index / 5) * 1.4} 8.75`);
        atext.setAttribute("scale", "1 1 1");
        atext.setAttribute("rotation", "0 180 0");
        ascene.appendChild(atext);
        ascene.appendChild(characterEntity);
        characterEntity.addEventListener("click", function () {
          
          if (Number(character.price) <= Number(moneyvalue)) {
            let characters = document.getElementById("characters");
            characters.setAttribute("gltf-model", character.url);
            moneyvalue = moneyvalue - character.price;
            money.setAttribute("value", moneyvalue);
            character.price = 0;
            atext.setAttribute("value","");
          } else{
              renderBoard();
              console.log(character.price, moneyvalue);
          }
  
        });
      });
    });
  }
  let renderBoard = function () {
    let ascene = document.querySelector('a-scene');
    const box1 = document.createElement("a-box");
    box1.setAttribute("static-body", "");
    box1.setAttribute("position", "2 2.25 8.6");
    box1.setAttribute("scale", "4 2.5 0.01");
    box1.setAttribute("color", "#093e2e");
    ascene.appendChild(box1);
  
    const box2 = document.createElement("a-box");
    box2.setAttribute("static-body", "");
    box2.setAttribute("position", "2 3.5 8.6");
    box2.setAttribute("scale", "4.1 0.1 0.05");
    box2.setAttribute("color", "#885f32");
    ascene.appendChild(box2);
  
    const box3 = document.createElement("a-box");
    box3.setAttribute("static-body", "");
    box3.setAttribute("position", "2 1 8.6");
    box3.setAttribute("scale", "4.1 0.1 0.05");
    box3.setAttribute("color", "#885f32");
    ascene.appendChild(box3);
  
    const box4 = document.createElement("a-box");
    box4.setAttribute("static-body", "");
    box4.setAttribute("position", "0 2.25 8.6");
    box4.setAttribute("scale", "0.1 2.55 0.05");
    box4.setAttribute("color", "#885f32");
    ascene.appendChild(box4);
  
    const box5 = document.createElement("a-box");
    box5.setAttribute("static-body", "");
    box5.setAttribute("position", "4 2.25 8.6");
    box5.setAttribute("scale", "0.1 2.55 0.05");
    box5.setAttribute("color", "#885f32");
    ascene.appendChild(box5);
  
    let aText = document.createElement("a-text");
    aText.setAttribute("id", "vocab-comp");
      aText.setAttribute("value", "You don't have enough\nmoney to buy this item");
    aText.setAttribute("scale", "1 1 1");
    aText.setAttribute("position", `2 2.5 8.59`);
    aText.setAttribute("rotation", "0 180 0");
    aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
    aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
    aText.setAttribute("negate", "false");
    aText.setAttribute("align", "center");
    aText.setAttribute("color", "#FFF");
    ascene.appendChild(aText);
  
    setTimeout(() => {
    ascene.removeChild(box1);
    ascene.removeChild(box2);
    ascene.removeChild(box3);
    ascene.removeChild(box4);
    ascene.removeChild(box5);
    ascene.removeChild(aText);
    }, 3000);
  };

  let fish = document.getElementById("pufferfish");
  console.log(fish);
  fish.addEventListener("mouseup", function () {
    let fishPosition = fish.getAttribute('position');
    console.log(fishPosition);
  if ((fishPosition.x < -2 && fishPosition.x > -5) && (fishPosition.y > 0 && fishPosition.y < 3) && (fishPosition.z > 7.5 && fishPosition.z < 10)  ){
    fish.removeAttribute('animation-mixer');
    fish.setAttribute('animation-mixer', 'clip:Fish_Armature|Death; loop: once; timeScale: 1');
    setTimeout(function () {
      fish.removeAttribute('animation-mixer');
      fish.removeAttribute('dynamic-body'); 
      fish.setAttribute('rotation', '0 0 180');   
      setTimeout(function () {
        fish.setAttribute('animation', 'property: position; to:-4 1.75 8.9; dur: 2000; easing: linear');
        let ascene = document.querySelector('a-scene');
        let text = document.createElement('a-text');
        text.setAttribute('value', 'You killed the puffer fish !');
        text.setAttribute('position', '-4 2.25 8');
        text.setAttribute('align', 'center');
        text.setAttribute('color', 'red');
        text.setAttribute('font', './assets/font/Gloria-msdf.json');
        text.setAttribute('font-image', './assets/font/Gloria-msdf.png');
        text.setAttribute('negate', 'false');
        text.setAttribute('scale', '.75 .75 .75');
        text.setAttribute('rotation', '0 180 0');
        ascene.appendChild(text);
      }, 100);
    }, 100);
}
  });
renderMarket();
renderCharacter ();

