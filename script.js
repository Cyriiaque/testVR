AFRAME.registerComponent("thumbstick-move", {
  init: function () {
    let rig = document.getElementById("rig");
    this.el.addEventListener("thumbstickmoved", function (evt) {
      let x = evt.detail.x; // Gauche/Droite
      let y = evt.detail.y; // Avant/Arrière

      let speed = 0.1; // Vitesse de déplacement
      rig.object3D.position.x -= x * speed;
      rig.object3D.position.z -= y * speed;
    });
  },
});

function moveToPosition(object, targetPosition) {
  var currentPosition = object.getAttribute("position");
  var step = 0.01;

  function animate() {
    var dx = targetPosition.x - currentPosition.x;
    var dy = targetPosition.y - currentPosition.y;
    var dz = targetPosition.z - currentPosition.z;

    var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < step) {
      object.setAttribute("position", targetPosition);
      return;
    }

    currentPosition.x += (dx * step) / distance;
    currentPosition.y += (dy * step) / distance;
    currentPosition.z += (dz * step) / distance;

    object.setAttribute("position", currentPosition);

    requestAnimationFrame(animate);
  }

  animate();
}

document.querySelector("#drawer1").addEventListener("click", function () {
  var drawer1 = document.querySelector("#drawer1");
  if (
    drawer1.getAttribute("position").x == -2.6 &&
    drawer1.getAttribute("position").y == 0 &&
    drawer1.getAttribute("position").z == -5
  ) {
    moveToPosition(drawer1, { x: -2.6, y: 0, z: -4.35 });
  } else {
    moveToPosition(drawer1, { x: -2.6, y: 0, z: -5 });
  }
});

document.querySelector("#drawer2").addEventListener("click", function () {
  var drawer2 = document.querySelector("#drawer2");
  if (
    drawer2.getAttribute("position").x == -2.6 &&
    drawer2.getAttribute("position").y == 0.5 &&
    drawer2.getAttribute("position").z == -5
  ) {
    moveToPosition(drawer2, { x: -2.6, y: 0.5, z: -4.35 });
  } else {
    moveToPosition(drawer2, { x: -2.6, y: 0.5, z: -5 });
  }
});

document.querySelector("#drawer3").addEventListener("click", function () {
  var drawer3 = document.querySelector("#drawer3");
  if (
    drawer3.getAttribute("position").x == -2.6 &&
    drawer3.getAttribute("position").y == 1 &&
    drawer3.getAttribute("position").z == -5
  ) {
    moveToPosition(drawer3, { x: -2.6, y: 1, z: -4.35 });
  } else {
    moveToPosition(drawer3, { x: -2.6, y: 1, z: -5 });
  }
});

// document
//   .querySelector("#rightController")
//   .addEventListener("triggerdown", function () {
//     var drawer1 = document.querySelector("#drawer1");
//     moveToPosition(drawer1, { x: -2.6, y: 0, z: -5 });
//   });

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
