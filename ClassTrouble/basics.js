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