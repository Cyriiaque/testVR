// document.querySelector("#myBox").addEventListener("click", function () {
//   var box = document.querySelector("#myBox");
//   box.setAttribute(
//     "color",
//     "#" + Math.floor(Math.random() * 16777215).toString(16)
//   );
// });

// document
//   .querySelector("#rightController")
//   .addEventListener("triggerdown", function () {
//     var s = document.querySelector("#mySphere");
//     s.setAttribute(
//       "color",
//       "#" + Math.floor(Math.random() * 16777215).toString(16)
//     );
//   });

////

// var scene = document.querySelector("a-scene");
// var cylinder = document.createElement("a-cylinder");
// cylinder.setAttribute("color", "#FF9500");
// cylinder.setAttribute("height", "2");
// cylinder.setAttribute("radius", "0.75");
// cylinder.setAttribute("position", "3 3 0");
// cylinder.setAttribute("class", "collidable");
// scene.appendChild(cylinder);

// var t = 0;
// function render() {
//   t += 0.01;
//   requestAnimationFrame(render);
//   cylinder.setAttribute("position", "3 " + (Math.sin(t * 2) + 3) + " 0");

//   cylinder.addEventListener("click", function () {
//     cylinder.setAttribute(
//       "color",
//       "#" + Math.floor(Math.random() * 16777215).toString(16)
//     );
//   });

//   document.querySelector("a-box").addEventListener("triggerdown", function () {
//     cylinder.setAttribute(
//       "color",
//       "#" + Math.floor(Math.random() * 16777215).toString(16)
//     );
//   });
// }
// function checkCollision() {
//   var camera = document.querySelector("[camera]");
//   var cameraPosition = camera.getAttribute("position");
//   var cylinderPosition = cylinder.getAttribute("position");

//   var dx = cameraPosition.x - cylinderPosition.x;
//   var dy = cameraPosition.y - cylinderPosition.y;
//   var dz = cameraPosition.z - cylinderPosition.z;

//   var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

//   if (distance < 1.5) {
//     cylinder.setAttribute(
//       "color",
//       "#" + Math.floor(Math.random() * 16777215).toString(16)
//     );
//   }
// }

// setInterval(checkCollision, 100);
// render();
