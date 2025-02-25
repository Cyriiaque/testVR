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
      el.setAttribute("grab", "");
      controller.addEventListener("triggerup", this.onGrabEnd);
    };

    this.onGrabEnd = function () {
      if (isGrabbed) {
        el.setAttribute(
          "dynamic-body",
          "mass: 1; restitution: 0.6; friction: 0.5"
        );
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

// Le code fait effet quand le jeu est en navigateur
AFRAME.registerComponent("click-grab", {
  // Version navigateur

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

        // Convertit la position de la souris en coordonnées 3D
        let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        let offset = new THREE.Vector3(mouseX * 0.5, mouseY * 0.5, -2.5); // Toujours devant
        offset.applyQuaternion(cameraQuat); // Oriente l'objet devant la caméra

        let newPosition = cameraPos.clone().add(offset);
        el.object3D.position.copy(newPosition);
      }
    }

    el.addEventListener("mousedown", function () {
      isGrabbed = true;
      el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
      el.setAttribute("grab", "");
      window.addEventListener("mousemove", updatePosition);
    });

    scene.addEventListener("mouseup", function () {
      if (isGrabbed) {
        el.setAttribute(
          "dynamic-body",
          "mass: 1; restitution: 0.6; friction: 0.5"
        ); // Réactive la gravité
        el.removeAttribute("grab");
        isGrabbed = false;
        window.removeEventListener("mousemove", updatePosition);
      }
    });
  },
});
