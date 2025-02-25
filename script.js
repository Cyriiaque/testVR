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
