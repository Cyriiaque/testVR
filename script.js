// Joystick
AFRAME.registerComponent("thumbstick-move", {
  init: function () {
    let rig = document.getElementById("rig");
    let camera = document.getElementById("camera");

    this.el.addEventListener("thumbstickmoved", function (evt) {
      let x = evt.detail.x;
      let y = evt.detail.y;

      if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) return;

      let speed = 0.08;

      let direction = new THREE.Vector3();
      camera.object3D.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();

      let strafe = new THREE.Vector3()
        .crossVectors(new THREE.Vector3(0, 1, 0), direction)
        .multiplyScalar(x);
      let move = direction.multiplyScalar(y);

      let finalMove = new THREE.Vector3()
        .addVectors(strafe, move)
        .multiplyScalar(speed);

      rig.object3D.position.add(finalMove);
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

// document.querySelector("#drawer1").addEventListener("click", function () {
//   var drawer1 = document.querySelector("#drawer1");
//   if (
//     drawer1.getAttribute("position").x == -2.6 &&
//     drawer1.getAttribute("position").y == 0 &&
//     drawer1.getAttribute("position").z == -5
//   ) {
//     moveToPosition(drawer1, { x: -2.6, y: 0, z: -4.35 });
//   } else {
//     moveToPosition(drawer1, { x: -2.6, y: 0, z: -5 });
//   }
// });

// document
//   .querySelector("#rightController")
//   .addEventListener("triggerdown", function () {
//     var drawer1 = document.querySelector("#drawer1");
//     if (
//       drawer1.getAttribute("position").x == -2.6 &&
//       drawer1.getAttribute("position").y == 0 &&
//       drawer1.getAttribute("position").z == -5
//     ) {
//       moveToPosition(drawer1, { x: -2.6, y: 0, z: -4.35 });
//     } else {
//       moveToPosition(drawer1, { x: -2.6, y: 0, z: -5 });
//     }
//   });

["#drawer1", "#drawer2", "#drawer3"].forEach(function (drawerId) {
  document.querySelector(drawerId).addEventListener("click", function () {
    var drawer = document.querySelector(drawerId);
    var targetPosition = drawer.getAttribute("position").z == -5 ? -4.35 : -5;
    moveToPosition(drawer, {
      x: -2.6,
      y: drawer.getAttribute("position").y,
      z: targetPosition,
    });
  });

  document
    .querySelector("#rightController")
    .addEventListener("triggerdown", function () {
      var drawer = document.querySelector(drawerId);
      var targetPosition = drawer.getAttribute("position").z == -5 ? -4.35 : -5;
      moveToPosition(drawer, {
        x: -2.6,
        y: drawer.getAttribute("position").y,
        z: targetPosition,
      });
    });
});
