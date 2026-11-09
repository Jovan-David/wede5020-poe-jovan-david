/* ============================================================
   gallery.js - photo gallery lightbox
   WEDE5020 Part 3 | Jovan David (ST10510821)
   ------------------------------------------------------------
   The gallery buttons already exist in gallery.html, so this file
   only adds the lightbox behaviour on top of them:
     - click a photo to open it large
     - previous / next buttons and the Left / Right arrow keys
     - Escape or a click on the dark background closes it
     - Tab stays inside the lightbox while it is open
     - the photo count and caption are announced politely
   Pattern based on the W3Schools lightbox tutorial [R9] and the
   accessibility rules in WCAG 2.2 [R12].
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox-trigger]"));
    if (buttons.length === 0) return;

    var lightbox = document.getElementById("lightbox");
    var image = document.getElementById("lightbox-image");
    var caption = document.getElementById("lightbox-caption");
    var counter = document.getElementById("lightbox-counter");
    if (!lightbox || !image || !caption || !counter) return;

    var closeButton = lightbox.querySelector(".lightbox-close");
    var prevButton = lightbox.querySelector(".lightbox-prev");
    var nextButton = lightbox.querySelector(".lightbox-next");

    var currentIndex = 0;
    var lastFocused = null;

    /* Build one simple data object per gallery button. Reading the
       data from the markup keeps the HTML usable without JavaScript. */
    var photos = buttons.map(function (button) {
      var img = button.querySelector("img");
      return {
        src: button.getAttribute("data-full") || (img ? img.getAttribute("src") : ""),
        alt: img ? img.getAttribute("alt") : "",
        caption: button.getAttribute("data-caption") || (img ? img.getAttribute("alt") : "")
      };
    });

    /* Load the neighbouring photos in the background so the next
       click feels instant, without downloading all nine at once. */
    function preload(index) {
      var next = photos[(index + 1) % photos.length];
      var previous = photos[(index - 1 + photos.length) % photos.length];
      [next, previous].forEach(function (photo) {
        if (!photo || !photo.src) return;
        var preloadImage = new Image();
        preloadImage.src = photo.src;
      });
    }

    function show(index) {
      currentIndex = (index + photos.length) % photos.length;
      var photo = photos[currentIndex];

      image.setAttribute("src", photo.src);
      image.setAttribute("alt", photo.alt);
      caption.textContent = photo.caption;
      counter.textContent = "Photo " + (currentIndex + 1) + " of " + photos.length;

      preload(currentIndex);
    }

    function open(index) {
      lastFocused = document.activeElement;
      show(index);

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");

      if (closeButton) closeButton.focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");

      if (lastFocused) {
        lastFocused.focus();
        lastFocused = null;
      }
    }

    /* Open the clicked photo */
    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        open(index);
      });
    });

    if (closeButton) closeButton.addEventListener("click", close);
    if (prevButton) prevButton.addEventListener("click", function () { show(currentIndex - 1); });
    if (nextButton) nextButton.addEventListener("click", function () { show(currentIndex + 1); });

    /* Clicking the dark area (but not the photo or buttons) closes it */
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });

    /* Keyboard controls: Escape, arrows and a Tab trap */
    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(currentIndex + 1);
      } else if (event.key === "Tab") {
        var focusable = [closeButton, prevButton, nextButton];
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    /* Swipe left / right on touch screens */
    var touchStartX = 0;
    lightbox.addEventListener("touchstart", function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {
      var distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) < 50) return;
      if (distance > 0) {
        show(currentIndex - 1);
      } else {
        show(currentIndex + 1);
      }
    }, { passive: true });
  });
})();
