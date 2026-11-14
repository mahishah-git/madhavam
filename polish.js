/* =========================================
   MADHAVAM - BACKGROUND & FINAL POLISH
   ========================================= */

(() => {
  "use strict";

  // 1. LOAD BACKGROUND IMAGES
  // Each HTML section loads the image named in data-bg.

  const scenes = document.querySelectorAll(".scene[data-bg]");

  scenes.forEach((scene) => {
    const imageName = scene.dataset.bg + ".jpg";
    const imagePath = new URL(
      "./assets/bg/" + imageName,
      document.baseURI
    ).href;

    const image = new Image();

    image.onload = () => {
      scene.style.setProperty("--bg", `url("${imagePath}")`);
      scene.style.setProperty(
        "--ar",
        `${image.naturalWidth} / ${image.naturalHeight}`
      );

      scene.classList.add("bgd");
      console.log("Background loaded:", imageName);
    };

    image.onerror = () => {
      console.error("Background not found:", imagePath);
      scene.classList.remove("bgd");
    };

    image.src = imagePath;
  });


  // 2. HIDE DUPLICATE GANESHA SHLOKA
  // Only hide the HTML version when the mandala video is ready.

  const video = document.getElementById("mv");

  if (video) {
    const hideDuplicate = () => {
      document.body.classList.add("hasvid");
    };

    if (video.readyState >= 2) {
      hideDuplicate();
    } else {
      video.addEventListener("loadeddata", hideDuplicate, {
        once: true
      });
    }
  }


  // 3. PREVENT ACCIDENTAL DOUBLE RSVP SUBMISSION

  const form = document.getElementById("rsvp");

  if (form) {
    form.addEventListener("submit", () => {
      const name = document.getElementById("gname");

      if (!name || !name.value.trim()) return;

      const button = form.querySelector(
        'button[type="submit"]'
      );

      if (!button) return;

      button.disabled = true;

      setTimeout(() => {
        button.disabled = false;
      }, 4000);
    });
  }

})();
