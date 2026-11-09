/* ============================================================
   main.js - shared interactive behaviour for every page
   WEDE5020 Part 3 | Jovan David (ST10510821)
   ------------------------------------------------------------
   1. Mobile navigation toggle
   2. Accessible accordion (FAQ)
   3. Accessible modal dialog
   4. Scroll reveal animation
   5. Footer year
   Everything here uses plain (vanilla) JavaScript - no library
   is needed for these behaviours. See [10], [11], [12].
   ============================================================ */

(function () {
  "use strict";

  /* Make it easy for the CSS to know that JavaScript is available.
     This keeps the site usable (menu always visible) if scripting
     is switched off. */
  document.documentElement.classList.add("js-enabled");

  /* ------------------------------------------------------------
     1. MOBILE NAVIGATION  [12]
     The button opens and closes the menu, keeps aria-expanded in
     sync and closes the menu when the Escape key is pressed.
     ------------------------------------------------------------ */
  function initNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("primary-nav");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* Close the menu after a link is chosen (single page apps are not
       used here, but this keeps the animation tidy on slow devices). */
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------
     2. ACCORDION  [10]
     Each trigger owns one panel. Only one panel stays open at a
     time so the FAQ stays easy to scan on a phone.
     ------------------------------------------------------------ */
  function initAccordion() {
    var accordions = document.querySelectorAll("[data-accordion]");

    accordions.forEach(function (accordion) {
      var triggers = accordion.querySelectorAll(".accordion-trigger");

      triggers.forEach(function (trigger) {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        if (!panel) return;

        /* Start closed so the state in the markup matches the CSS */
        trigger.setAttribute("aria-expanded", "false");
        panel.setAttribute("aria-hidden", "true");

        trigger.addEventListener("click", function () {
          var isOpen = trigger.getAttribute("aria-expanded") === "true";

          /* Close every panel first */
          triggers.forEach(function (otherTrigger) {
            var otherPanel = document.getElementById(otherTrigger.getAttribute("aria-controls"));
            otherTrigger.setAttribute("aria-expanded", "false");
            otherTrigger.closest(".accordion-item").classList.remove("is-open");
            if (otherPanel) otherPanel.setAttribute("aria-hidden", "true");
          });

          /* Then open the one that was clicked, unless it was already open */
          if (!isOpen) {
            trigger.setAttribute("aria-expanded", "true");
            trigger.closest(".accordion-item").classList.add("is-open");
            panel.setAttribute("aria-hidden", "false");
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------
     3. MODAL DIALOG  [11]
     Any element with [data-modal-open="modal-id"] opens a modal.
     Focus moves into the dialog, Tab is trapped inside it and the
     Escape key or a click on the dark backdrop closes it again.
     ------------------------------------------------------------ */
  var lastFocusedElement = null;

  function getFocusable(dialog) {
    return dialog.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function openModal(modal) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    var focusable = getFocusable(modal);
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      modal.querySelector(".modal-dialog").focus();
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  function initModals() {
    var openers = document.querySelectorAll("[data-modal-open]");

    openers.forEach(function (opener) {
      opener.addEventListener("click", function (event) {
        event.preventDefault();
        var id = opener.getAttribute("data-modal-open");
        openModal(document.getElementById(id));
      });
    });

    document.querySelectorAll(".modal").forEach(function (modal) {
      modal.setAttribute("aria-hidden", "true");

      /* Close button and any [data-modal-close] element */
      modal.querySelectorAll("[data-modal-close]").forEach(function (button) {
        button.addEventListener("click", function () {
          closeModal(modal);
        });
      });

      /* Clicking the dark area outside the dialog closes it */
      modal.addEventListener("click", function (event) {
        if (event.target === modal) closeModal(modal);
      });

      /* Escape closes, Tab is trapped inside the dialog */
      modal.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeModal(modal);
          return;
        }

        if (event.key !== "Tab") return;

        var focusable = getFocusable(modal);
        if (focusable.length === 0) return;

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });
    });
  }

  /* ------------------------------------------------------------
     4. SCROLL REVEAL  [21]
     IntersectionObserver adds .is-visible when a .reveal element
     scrolls into view. If the browser does not support it, the
     elements are simply shown straight away.
     ------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (items.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ------------------------------------------------------------
     5. FOOTER YEAR
     Keeps the copyright line current without editing HTML.
     ------------------------------------------------------------ */
  function initYear() {
    var year = document.getElementById("current-year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* Run everything once the HTML has been parsed. The script tag
     uses defer, so the DOM is already available here. */
  document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initAccordion();
    initModals();
    initReveal();
    initYear();
  });
})();
