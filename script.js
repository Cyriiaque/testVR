const scene = document.querySelector("a-scene");
const entity = document.createElement("a-entity");
entity.setAttribute("gltf-model", "#chair");
entity.setAttribute("position", "0 1 0");
entity.setAttribute("scale", "0.1 0.08 0.1");
entity.setAttribute("dynamic-body", "mass: 1;");
entity.setAttribute("click-grab", "");
entity.setAttribute("VR-grab", "");
entity.setAttribute("id", `${Date.now()}`);
entity.setAttribute("class", "collidable");
scene.appendChild(entity);

AFRAME.registerComponent("VR-grab", {
  init: function () {
    let el = this.el;
    let isGrabbed = false;
    let controller = null;

    let leftController = document.querySelector("#leftController");
    let rightController = document.querySelector("#rightController");

    function onGrabStart(evt) {
        let raycaster = evt.target.components.raycaster;
        if (!raycaster) return;
        let intersectedEls = raycaster.intersectedEls;
        if (intersectedEls.length === 0 || intersectedEls[0] !== el) return;

        isGrabbed = true;
        controller = evt.target;
        el.setAttribute("dynamic-body", "mass: 0");
        controller.addEventListener("triggerup", onGrabEnd);
    }

    function onGrabEnd() {
        if (isGrabbed) {
            el.setAttribute("dynamic-body", "mass: 1");
            isGrabbed = false;
            controller.removeEventListener("triggerup", onGrabEnd);
            controller = null;
        }
    }

    if (leftController) leftController.addEventListener("triggerdown", onGrabStart);
    if (rightController) rightController.addEventListener("triggerdown", onGrabStart);
}
});

