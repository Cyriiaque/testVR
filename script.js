AFRAME.registerComponent("color-toggle", {
  init: function () {
    let el = this.el;
    let originalColor = el.getAttribute("material").color || "white"; // Couleur de base
    let isOriginalColor = true;

    // Fonction pour changer de couleur
    this.toggleColor = function () {
      let newColor = isOriginalColor ? "blue" : originalColor;
      el.setAttribute("material", "color", newColor);
      isOriginalColor = !isOriginalColor;
    };

    // Ajoute un écouteur sur les contrôleurs VR
    this.el.sceneEl.addEventListener("triggerdown", (evt) => {
      let controller = evt.target;
      let raycaster = controller.components.raycaster;

      if (raycaster) {
        let intersectedEls = raycaster.intersectedEls;
        if (intersectedEls.includes(el)) {
          this.toggleColor();
        }
      }
    });
  },
});

// document.querySelector("#drawer1").addEventListener("click", function () {
//   var drawer1 = document.querySelector("#drawer1");
//   if (
//     drawer1.getAttribute("position").x == -2.6 &&
//     drawer1.getAttribute("position").y == 0 &&
//     drawer1.getAttribute("position").z == -5
//   ) {
//     drawer1.setAttribute(
//       "animation",
//       "property: position; to: -2.6 0 -4.35; dur: 1000; easing: linear"
//     );
//   } else {
//     drawer1.setAttribute(
//       "animation",
//       "property: position; to: -2.6 0 -5; dur: 1000; easing: linear"
//     );
//   }
// });

// document.querySelector("#drawer2").addEventListener("click", function () {
//   var drawer2 = document.querySelector("#drawer2");
//   if (
//     drawer2.getAttribute("position").x == -2.6 &&
//     drawer2.getAttribute("position").y == 0.5 &&
//     drawer2.getAttribute("position").z == -5
//   ) {
//     drawer2.setAttribute(
//       "animation",
//       "property: position; to: -2.6 0.5 -4.35; dur: 1000; easing: linear"
//     );
//   } else {
//     drawer2.setAttribute(
//       "animation",
//       "property: position; to: -2.6 0.5 -5; dur: 1000; easing: linear"
//     );
//   }
// });

// document.querySelector("#drawer3").addEventListener("click", function () {
//   var drawer3 = document.querySelector("#drawer3");
//   if (
//     drawer3.getAttribute("position").x == -2.6 &&
//     drawer3.getAttribute("position").y == 1 &&
//     drawer3.getAttribute("position").z == -5
//   ) {
//     drawer3.setAttribute(
//       "animation",
//       "property: position; to: -2.6 1 -4.35; dur: 1000; easing: linear"
//     );
//   } else {
//     drawer3.setAttribute(
//       "animation",
//       "property: position; to: -2.6 1 -5; dur: 1000; easing: linear"
//     );
//   }
// });
