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
      grabSound.play();
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
