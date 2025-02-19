import { StartTest } from './test.js';




let data = [
  { car : [
    {
    "Wheel": "Roues",
    "Engine": "Moteur",
    "Body": "Carrosserie",
    "Headlight": "Phare",
    
  }
  ],
  bookdata : [
   {
    "Page": "Page",
    "Cover": "Couverture",
    "Title": "Titre",
    "Author": "Auteur",
  }


  ],
  computerdata : [
    {
    "Screen": "Ecran",
    "Keyboard": "Clavier",
    "Mouse": "Souris",
    "Webcam": "Caméra",
  }

],
paintData : [
  {
    "Canvas": "Toile",
    "Brush": "Pinceau",
    "Palette": "Palette",
    "Easel": "Chevalet",
  }
],
}
]




var scene = document.querySelector("a-scene");

let cpt_obj = 0;

const counterText = document.createElement("a-text");
counterText.setAttribute("id", "counter-text");
counterText.setAttribute("value", "Objet " + cpt_obj +"/4");
counterText.setAttribute("position", "1.2 2.1 -9.47");
counterText.setAttribute("scale", "0.5 0.5 0.5");
scene.appendChild(counterText);




var computer = document.getElementById("computer-");

computer.addEventListener("mouseenter", function () {
  computer.setAttribute("animation", {
    property: "scale",
    to: "0.07 0.07 0.07",
    dur: 200
  });
  var compIcon = document.createElement("a-entity");
  compIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  compIcon.id = "computer-icon";
  compIcon.setAttribute("scale", "10 10 10");
  compIcon.setAttribute("position", "0 4 0");

  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var compPosition = computer.getAttribute("position");

  var dx = cameraPosition.x - compPosition.x;
  var dz = cameraPosition.z - compPosition.z;
  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;

  compIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  computer.appendChild(compIcon);
});

computer.addEventListener("mouseleave", function () {
  var compIcon = document.getElementById("computer-icon");
  if (compIcon) {
    computer.removeChild(compIcon);
  }
  computer.setAttribute("animation", {
    property: "scale",
    to: "0.05 0.05 0.05",
    dur: 200
  });
});

computer.addEventListener("click", function () {
  
  const existingText = document.querySelector("#vocab-comp");
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
    
  }


  cpt_obj++;
  isFound();

  counterText.setAttribute("value", "Objet " + cpt_obj +"/4");


  const aText = document.createElement("a-text");
  

  let computerObj = data[0].computerdata[0];
  let lines = [];
  for (let key in computerObj) {
    lines.push(key + " --> " + computerObj[key]);
  }
  aText.setAttribute("id", "vocab-comp");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", `-1.2 2.1 -9.47`);
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");
  aText.setAttribute("align", "left");
  aText.setAttribute("color", "#FFF");
  

  

  scene.appendChild(aText);
  
});

// Création de l'entité livre (book)
var book = document.createElement("a-entity");
book = document.getElementById("book");
book.setAttribute("position", "5.950 2.00 0.650");
// drawer1 = document.getElementById("drawer1");
scene.appendChild(book);

book.addEventListener("mouseenter", function () {
  book.setAttribute("animation", {
    property: "scale",
    to: "0.4 0.4 0.4",
    dur: 200
  });
  var eyeIcon = document.createElement("a-entity");
  eyeIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  eyeIcon.id = "eye-icon";
  eyeIcon.setAttribute("position", "0 0.5 0");
  
  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var bookPosition = book.getAttribute("position");

  var dx = cameraPosition.x - bookPosition.x;
  var dz = cameraPosition.z - bookPosition.z;

  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;

  eyeIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  book.appendChild(eyeIcon);
});

book.addEventListener("mouseleave", function () {
  var eyeIcon = document.getElementById("eye-icon");
  if (eyeIcon) {
    book.removeChild(eyeIcon);
  }
});

book.addEventListener("mouseleave", function () {
  book.setAttribute("animation", {
    property: "scale",
    to: "0.3 0.3 0.3",
    dur: 200
  });
});



book.addEventListener("click", function () { 

  const existingText = document.querySelector("#vocab-book");
  
  

  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
    
  }

  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj +"/4");

 
  
  const aText = document.createElement("a-text");

  let bookObj = data[0].bookdata[0];
  let lines = [];
  for (let key in bookObj) {
    lines.push(key + " --> " + bookObj[key]);
  }
  aText.setAttribute("id", "vocab-book");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", `-1.2 3 -9.47`);
  aText.setAttribute("align", "left");
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");
  aText.setAttribute("color", "#FFF");
  aText.setAttribute("rotation", `0 0 0`);
  scene.appendChild(aText);
  
});


// Création de l'entité peinture (paint)
var paint = document.getElementById("paint-");
scene.appendChild(paint);

paint.addEventListener("mouseenter", function () {
  paint.setAttribute("animation", {
    property: "scale",
    to: "0.11 0.11 0.11",
    dur: 200
  });
  var brushIcon = document.createElement("a-entity");
  brushIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  brushIcon.id = "brush-icon";
  brushIcon.setAttribute("position", "0 5 -5");
  brushIcon.setAttribute("scale", "5 5 5");

  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var paintPosition = paint.getAttribute("position");

  var dx = cameraPosition.x - paintPosition.x;
  var dz = cameraPosition.z - paintPosition.z;
  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;
  brushIcon.setAttribute("rotation", `45 ${rotationY} 0`);

  paint.appendChild(brushIcon);
});

paint.addEventListener("mouseleave", function () {
  var brushIcon = document.getElementById("brush-icon");
  if (brushIcon) {
    paint.removeChild(brushIcon);
  }
  paint.setAttribute("animation", {
    property: "scale",
    to: "0.1 0.1 0.1",
    dur: 200
  });
});

paint.addEventListener("click", function () {

  
  const existingText = document.querySelector("#vocab-paint");
  
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
    
  }

  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj +"/4");

  const aText = document.createElement("a-text");


  let paintObj = data[0].paintData[0];
  let lines = [];
  for (let key in paintObj) {
    lines.push(key + " --> " + paintObj[key]);
  }
  aText.setAttribute("id", "vocab-paint");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", `-2.5 2.1 -9.47`);
  aText.setAttribute("align", "left");
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");
  aText.setAttribute("color", "#FFF");
  aText.setAttribute("rotation", `0 0 0`);


  scene.appendChild(aText);

});


let car = document.getElementById("car-");

console.log(car);

car.addEventListener("mouseenter", function () {
  car.setAttribute("animation", {
    property: "scale",
    to: "0.6 0.6 0.6",
    dur: 200
  });
  var carIcon = document.createElement("a-entity");
  carIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  carIcon.id = "car-icon";
  carIcon.setAttribute("position", "0 0.8 0");

  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var carPosition = car.getAttribute("position");

  var dx = cameraPosition.x - carPosition.x;
  var dz = cameraPosition.z - carPosition.z;

  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;

  carIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  car.appendChild(carIcon);
});

car.addEventListener("mouseleave", function () {
  var carIcon = document.getElementById("car-icon");
  if (carIcon) {
    car.removeChild(carIcon);
  }
});

car.addEventListener("mouseleave", function () {
  car.setAttribute("animation", {
    property: "scale",
    to: "0.5 0.5 0.5",
    dur: 200
  });
});

car.addEventListener("click", function () {
  console.log("click");

  

  const existingText = document.querySelector("#vocab-car");
  
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
    
  }

  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj +"/4");





  const aText = document.createElement("a-text");
  


  let carObj = data[0].car[0];
  let lines = [];
  for (let key in carObj) {
    lines.push(key + " --> " + carObj[key]);
  }
  aText.setAttribute("id", "vocab-car"); 
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", `-2.5 3 -9.47`);
  aText.setAttribute("align", "left");
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");  
  aText.setAttribute("color", "#FFF");
  aText.setAttribute("rotation", `0 0 0`);


  scene.appendChild(aText);
});


// Removed duplicate isFound() definition; only the version with the click event listener is kept.

let found = document.getElementById("found-text");
// Moved the event listener inside isFound so that found-text exists when attaching it.
function isFound() {
  if (cpt_obj == 4) {
    const foundText = document.createElement("a-text");
    foundText.setAttribute("id", "found-text");
    foundText.setAttribute("value", "Proceed to the test");
    foundText.setAttribute("position", "1.2 2.5 -9.47");
    foundText.setAttribute("scale", "0.5 0.5 0.5"); 
    foundText.setAttribute("font", "./assets/font/Gloria-msdf.json");
    foundText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
    foundText.setAttribute("negate", "false");
    const testBox = document.createElement("a-box");
    testBox.setAttribute("id", "test-button");
    testBox.setAttribute("visible", "false");
    testBox.setAttribute("position", "1.2 2.5 -9.47");
    testBox.setAttribute("width", "2");
    testBox.setAttribute("height", "0.5");

    foundText.setAttribute("class", "clickable");
    testBox.addEventListener("click", function () {
      console.log("found");
      ["vocab-comp", "vocab-book", "vocab-paint", "vocab-car"].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        scene.removeChild(el);
        

      }
      });
      StartTest();
    });

    scene.appendChild(testBox);
    scene.appendChild(foundText);
  }
}
