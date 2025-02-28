const scene = document.querySelector("a-scene");
const entity = document.createElement("a-entity");
entity.setAttribute("gltf-model", "#chair");
entity.setAttribute("position", "0 1 0");
entity.setAttribute("scale", "0.1 0.08 0.1");
entity.setAttribute("dynamic-body", "mass: 1;");
entity.setAttribute("VR-grab", "");
entity.setAttribute("click-grab", "");
entity.setAttribute("id", `${Date.now()}`);
entity.setAttribute("class", "collidable");
scene.appendChild(entity);

// PC to VR

AFRAME.registerComponent("adjust-camera-height", {
  init: function () {
    let rig = document.querySelector("#rig");
    let scene = this.el;

    scene.addEventListener("enter-vr", function () {
      if (scene.is("vr-mode")) {
        rig.setAttribute("scale", { x: 1.5, y: 1.5, z: 1.5 });
      }
    });

    scene.addEventListener("exit-vr", function () {
      rig.setAttribute("scale", { x: 1, y: 1, z: 1 });
    });
  },
});
document.querySelector("a-scene").setAttribute("adjust-camera-height", "");

AFRAME.registerComponent("VR-grab", {
  init: function () {
    let el = this.el;
    let isGrabbed = false;
    let controller = null;

    this.onGrabStart = function (evt) {
      let raycaster = evt.target.components.raycaster;
      if (!raycaster) return;
      let intersectedEls = raycaster.intersectedEls;
      if (intersectedEls.length === 0 || intersectedEls[0] !== el) return; // only take the first intersected element

      isGrabbed = true;
      controller = evt.target;
      el.setAttribute("dynamic-body", "mass: 0");
      el.setAttribute("grab", "");
      controller.addEventListener("triggerup", this.onGrabEnd);
    };

    this.onGrabEnd = function () {
      if (isGrabbed) {
        el.setAttribute("dynamic-body", "mass: 1");
        el.removeAttribute("grab");
        isGrabbed = false;
        controller.removeEventListener("triggerup", this.onGrabEnd);
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

    el.sceneEl.addEventListener("triggerdown", this.onGrabStart);
  },
});

// Grab
AFRAME.registerComponent("click-grab", {
  init: function () {
    let el = this.el;
    let scene = el.sceneEl;
    let camera = document.querySelector("#camera");
    let isGrabbed = false;

    function updatePosition(event) {
      if (isGrabbed) {
        let cameraPos = new THREE.Vector3();
        let cameraQuat = new THREE.Quaternion();

        camera.object3D.getWorldPosition(cameraPos);
        camera.object3D.getWorldQuaternion(cameraQuat);

        let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        let offset = new THREE.Vector3(mouseX * 0.5, mouseY * 0.5, -1);
        offset.applyQuaternion(cameraQuat);

        let newPosition = cameraPos.clone().add(offset);
        el.object3D.position.copy(newPosition);
      }
    }

    el.oncontextmenu = function () {
      return false;
    };

    let launcher = document.querySelector("#launcher");
    const clickSound = document.querySelector("#clickSound");
    const releaseSound = document.querySelector("#releaseSound");

    el.addEventListener("mousedown", function () {
      updatePosition;
      clickSound.components.sound.playSound();
      launcher.setAttribute("static-body", "");
      isGrabbed = true;
      el.setAttribute("dynamic-body", "mass: 0");
      window.addEventListener("mousemove", updatePosition);
    });

    scene.addEventListener("mouseup", function (event) {
      if ((event.button == 0) & isGrabbed) {
        clickSound.components.sound.playSound();
        isGrabbed = false;
        launcher.removeAttribute("static-body");
        el.setAttribute("dynamic-body", "mass: 1");
      }
      if ((event.button == 2) & isGrabbed) {
        releaseSound.components.sound.playSound();
        isGrabbed = false;
        el.setAttribute("dynamic-body", "mass: 1");
        setTimeout(() => {
          launcher.removeAttribute("static-body");
        }, 100);
      }
    });

    let rightController = document.querySelector("#rightController");
    if (rightController) {
      rightController.addEventListener("triggerdown", function () {
        isGrabbed = true;
        el.setAttribute("dynamic-body", "mass: 0");
        window.addEventListener("mousemove", updatePosition);
        launcher.setAttribute("static-body", "");
      });

      rightController.addEventListener("triggerup", function () {
        if (isGrabbed) {
          isGrabbed = false;
          el.setAttribute("dynamic-body", "mass: 1");
          window.removeEventListener("mousemove", updatePosition);
          setTimeout(() => {
            launcher.removeAttribute("static-body");
          }, 100);
        }
      });
    }
    let leftController = document.querySelector("#leftController");
    if (leftController) {
      leftController.addEventListener("triggerdown", function () {
        isGrabbed = true;
        el.setAttribute("dynamic-body", "mass: 0");
        window.addEventListener("mousemove", updatePosition);
      });

      leftController.addEventListener("triggerup", function () {
        if (isGrabbed) {
          isGrabbed = false;
          el.setAttribute("dynamic-body", "mass: 1");
          window.removeEventListener("mousemove", updatePosition);
        }
      });
    }
  },
});

// DRAWER ANIMATION
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
