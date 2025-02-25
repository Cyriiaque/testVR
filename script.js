AFRAME.registerComponent("VR-grab", {
  init: function () {
    let el = this.el;
    let scene = el.sceneEl;
    let rightController = document.querySelector("#rightController");
    let isGrabbed = false;

    if (!rightController) {
      alert("Aucun contrôleur droit détecté !");
      return;
    }

    // Détecter quand la gâchette est pressée
    rightController.addEventListener("triggerdown", (evt) => {
      if (isGrabbed) return;

      let raycaster = rightController.components.raycaster;
      if (!raycaster) return;

      let intersectedEls = raycaster.intersectedEls;
      if (intersectedEls.includes(el)) {
        // Attacher l'objet au contrôleur
        el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
        rightController.appendChild(el); // Attache à la main droite
        el.object3D.position.set(0, 0, -0.2); // Ajuste la position
        isGrabbed = true;
      }
    });

    // Relâcher l'objet quand on lâche la gâchette
    rightController.addEventListener("triggerup", () => {
      if (isGrabbed) {
        scene.appendChild(el); // Remet dans la scène
        el.setAttribute(
          "dynamic-body",
          "mass: 1; restitution: 0.6; friction: 0.5"
        ); // Réactive la gravité
        isGrabbed = false;
      }
    });
  },
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
