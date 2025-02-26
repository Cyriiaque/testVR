AFRAME.registerComponent("VR-grab", {
  init: function () {
    let el = this.el;
    let isGrabbed = false;
    let controller = null;

    this.onGrabStart = function (evt) {
      let raycaster = evt.target.components.raycaster;
      if (!raycaster) return;
      let intersectedEls = raycaster.intersectedEls;
      if (intersectedEls.length === 0 || intersectedEls[0] !== el) return; // Ne saisir que l'objet le plus proche

      isGrabbed = true;
      controller = evt.target;
      el.setAttribute("dynamic-body", "mass: 0");
      controller.addEventListener('triggerup', this.onGrabEnd);
    };

    this.onGrabEnd = function () {
      if (isGrabbed) {
        el.setAttribute("dynamic-body", "mass: 1");
        isGrabbed = false;
        controller.removeEventListener('triggerup', this.onGrabEnd);
        controller = null;
      }
    };

    this.tick = function () {
      if (isGrabbed && controller) {
        let controllerPos = new THREE.Vector3();
        let controllerQuat = new THREE.Quaternion();

        controller.object3D.getWorldPosition(controllerPos);
        controller.object3D.getWorldQuaternion(controllerQuat);

        let offset = new THREE.Vector3(0, 0, -1.5);
        offset.applyQuaternion(controllerQuat);

        let newPosition = controllerPos.clone().add(offset);
        el.object3D.position.copy(newPosition);
      }
    };

    el.sceneEl.addEventListener('triggerdown', this.onGrabStart);
  }
});

document.querySelector("#drawer1").addEventListener("click", function () {
  var drawer1 = document.querySelector("#drawer1");
  if (
    drawer1.getAttribute("position").x == -2.6 &&
    drawer1.getAttribute("position").y == 0 &&
    drawer1.getAttribute("position").z == -5
  ) {
    drawer1.setAttribute(
      "animation",
      "property: position; to: -2.6 0 -4.35; dur: 1000; easing: linear"
    );
  } else {
    drawer1.setAttribute(
      "animation",
      "property: position; to: -2.6 0 -5; dur: 1000; easing: linear"
    );
  }
});

document.querySelector("#drawer2").addEventListener("click", function () {
  var drawer2 = document.querySelector("#drawer2");
  if (
    drawer2.getAttribute("position").x == -2.6 &&
    drawer2.getAttribute("position").y == 0.5 &&
    drawer2.getAttribute("position").z == -5
  ) {
    drawer2.setAttribute(
      "animation",
      "property: position; to: -2.6 0.5 -4.35; dur: 1000; easing: linear"
    );
  } else {
    drawer2.setAttribute(
      "animation",
      "property: position; to: -2.6 0.5 -5; dur: 1000; easing: linear"
    );
  }
});

document.querySelector("#drawer3").addEventListener("click", function () {
  var drawer3 = document.querySelector("#drawer3");
  if (
    drawer3.getAttribute("position").x == -2.6 &&
    drawer3.getAttribute("position").y == 1 &&
    drawer3.getAttribute("position").z == -5
  ) {
    drawer3.setAttribute(
      "animation",
      "property: position; to: -2.6 1 -4.35; dur: 1000; easing: linear"
    );
  } else {
    drawer3.setAttribute(
      "animation",
      "property: position; to: -2.6 1 -5; dur: 1000; easing: linear"
    );
  }
});

