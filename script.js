AFRAME.registerComponent("testVR", {
  init: function () {
    let el = this.el;
    let scene = el.sceneEl;
    let isGrabbed = false;

    // Add event listener for triggerdown event
    el.addEventListener("triggerdown", function () {
      el.setAttribute("color", "red"); // Change color to red
    });

    // Add event listener for triggerup event to reset color
    el.addEventListener("triggerup", function () {
      el.setAttribute("color", "blue"); // Change color back to blue
    });
  },
});
