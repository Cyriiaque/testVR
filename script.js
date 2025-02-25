AFRAME.registerComponent("VR-grab", {
  init: function () {
    let el = this.el;
    let scene = el.sceneEl;
    let isGrabbed = false;
    let controller = null;

    // Détection du mode VR
    let isVR = scene.is("vr-mode");

    // Gestion du grab en VR
    this.onGrabStart = function (evt) {
      let raycaster = evt.target.components.raycaster;
      if (!raycaster) return;
      let intersectedEls = raycaster.intersectedEls;
      if (intersectedEls.length === 0 || intersectedEls[0] !== el) return;

      isGrabbed = true;
      controller = evt.target;
      el.setAttribute("dynamic-body", "mass: 0");
      controller.addEventListener("triggerup", this.onGrabEnd);
    };

    this.onGrabEnd = function () {
      if (isGrabbed) {
        el.setAttribute("dynamic-body", "mass: 1; restitution: 0.6; friction: 0.5");
        isGrabbed = false;
        controller.removeEventListener("triggerup", this.onGrabEnd);
        controller = null;
      }
    };

    // Gestion du grab en mode navigateur (souris)
    function updatePosition(event) {
      if (isGrabbed) {
        let camera = document.querySelector("#camera");
        let cameraPos = new THREE.Vector3();
        let cameraQuat = new THREE.Quaternion();

        camera.object3D.getWorldPosition(cameraPos);
        camera.object3D.getWorldQuaternion(cameraQuat);

        // Convertit la position de la souris en coordonnées 3D
        let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        let offset = new THREE.Vector3(mouseX * 0.5, mouseY * 0.5, -2.5); // Toujours devant
        offset.applyQuaternion(cameraQuat);

        let newPosition = cameraPos.clone().add(offset);
        el.object3D.position.copy(newPosition);
      }
    }

    el.addEventListener("mousedown", function () {
      if (!scene.is("vr-mode")) {
        isGrabbed = true;
        el.setAttribute("dynamic-body", "mass: 0");
        window.addEventListener("mousemove", updatePosition);
      }
    });

    scene.addEventListener("mouseup", function () {
      if (isGrabbed) {
        el.setAttribute("dynamic-body", "mass: 1; restitution: 0.6; friction: 0.5");
        isGrabbed = false;
        window.removeEventListener("mousemove", updatePosition);
      }
    });

    // Associer les événements aux contrôleurs VR
    scene.addEventListener("enter-vr", function () {
      isVR = true;
      let leftController = document.querySelector("#leftController");
      let rightController = document.querySelector("#rightController");

      if (leftController) leftController.addEventListener("triggerdown", this.onGrabStart);
      if (rightController) rightController.addEventListener("triggerdown", this.onGrabStart);
    });

    scene.addEventListener("exit-vr", function () {
      isVR = false;
    });
  },
});
