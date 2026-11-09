/* ============================================================
   contact.js - general contact form
   WEDE5020 Part 3 | Jovan David (ST10510821)
   ------------------------------------------------------------
   The site is hosted as static files, so there is no server to
   receive this form. Instead the form:
     1. validates every control in the browser [R3][R4]
     2. builds a properly encoded mailto: link [R23]
     3. shows a confirmation panel with an "Open in email app"
        button, so the message still reaches the right inbox
   Change RECIPIENT_EMAIL in one place to send it elsewhere.
   ============================================================ */

(function () {
  "use strict";

  /* The one place the destination address is stored */
  var RECIPIENT_EMAIL = "info@greenthumbgarden.org";

  var PATTERNS = {
    name: /^[A-Za-z][A-Za-z'\-\s]{1,49}$/,
    email: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,
    phone: /^(\+27|0)[6-8][0-9]{8}$/
  };

  var form, statusBox, submitButton, confirmation, mailtoLink;

  document.addEventListener("DOMContentLoaded", function () {
    form = document.getElementById("contact-form");
    if (!form) return;

    statusBox = document.getElementById("contact-status");
    submitButton = document.getElementById("contact-submit");
    confirmation = document.getElementById("contact-confirmation");
    mailtoLink = document.getElementById("mailto-link");

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });

      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", handleSubmit);

    /* Copy the address to the clipboard when the mail app is missing */
    var copyButton = document.getElementById("copy-email");
    if (copyButton) {
      copyButton.addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(RECIPIENT_EMAIL);
          copyButton.textContent = "Address copied";
        } catch (error) {
          copyButton.textContent = "Copy failed - please type it";
        }
      });
    }
  });

  /* ------------------------------------------------------------
     Validation (same rules as the enquiry form)
     ------------------------------------------------------------ */
  function getErrorElement(field) {
    return document.getElementById(field.id + "-error");
  }

  function setError(field, message) {
    var errorElement = getErrorElement(field);
    field.setAttribute("aria-invalid", "true");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("is-visible");
    }
  }

  function clearError(field) {
    var errorElement = getErrorElement(field);
    field.removeAttribute("aria-invalid");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("is-visible");
    }
  }

  function validateField(field) {
    var value = (field.value || "").trim();
    var message = "";

    switch (field.id) {
      case "contact-name":
        if (value === "") {
          message = "Please enter your full name.";
        } else if (!PATTERNS.name.test(value)) {
          message = "Use letters, spaces, hyphens or apostrophes only.";
        }
        break;

      case "contact-email":
        if (value === "") {
          message = "Please enter your email address.";
        } else if (!PATTERNS.email.test(value)) {
          message = "Enter a valid email address, for example thandi@example.co.za.";
        }
        break;

      case "contact-phone":
        /* Optional field: only checked when something is typed */
        if (value !== "" && !PATTERNS.phone.test(value.replace(/[\s()-]/g, ""))) {
          message = "Use a South African mobile number, for example 082 123 4567.";
        }
        break;

      case "contact-subject":
        if (value === "") message = "Please choose a subject.";
        break;

      case "contact-message":
        if (value.length < 10) {
          message = "Please write at least 10 characters.";
        } else if (value.length > 500) {
          message = "Please keep your message under 500 characters.";
        }
        break;

      default:
        break;
    }

    if (message) {
      setError(field, message);
      return false;
    }

    clearError(field);
    return true;
  }

  function validateForm() {
    var ids = ["contact-name", "contact-email", "contact-phone", "contact-subject", "contact-message"];
    var problems = [];

    ids.forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) return;
      if (!validateField(field)) {
        problems.push((getErrorElement(field) || {}).textContent || "Please check this field.");
      }
    });

    return problems;
  }

  function showSummary(problems) {
    statusBox.className = "form-status error is-visible";
    statusBox.textContent = "";

    var intro = document.createElement("strong");
    intro.textContent = problems.length === 1
      ? "Please fix 1 problem before sending:"
      : "Please fix " + problems.length + " problems before sending:";
    statusBox.appendChild(intro);

    var list = document.createElement("ul");
    problems.forEach(function (problem) {
      var item = document.createElement("li");
      item.textContent = problem;
      list.appendChild(item);
    });
    statusBox.appendChild(list);

    statusBox.setAttribute("tabindex", "-1");
    statusBox.focus();
  }

  /* ------------------------------------------------------------
     Build and open the mailto: link [R23]
     ------------------------------------------------------------ */
  function handleSubmit(event) {
    event.preventDefault();

    var problems = validateForm();

    if (problems.length > 0) {
      showSummary(problems);
      return;
    }

    statusBox.className = "form-status";
    statusBox.textContent = "";

    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var phone = document.getElementById("contact-phone").value.trim();
    var subject = document.getElementById("contact-subject").value;
    var message = document.getElementById("contact-message").value.trim();

    var mailSubject = "Website contact: " + subject + " - " + name;
    var mailBody = [
      "Name: " + name,
      "Email: " + email,
      "Phone: " + (phone || "not provided"),
      "Subject: " + subject,
      "",
      message,
      "",
      "Sent from the GreenThumb Community Garden website contact form."
    ].join("\n");

    /* encodeURIComponent keeps spaces, ampersands and line breaks
       from breaking the link [R23] */
    var mailtoUrl = "mailto:" + RECIPIENT_EMAIL +
      "?subject=" + encodeURIComponent(mailSubject) +
      "&body=" + encodeURIComponent(mailBody);

    mailtoLink.setAttribute("href", mailtoUrl);

    var summary = document.getElementById("contact-summary");
    if (summary) {
      summary.textContent = "A message to " + RECIPIENT_EMAIL + " from " + email + " about \u201C" + subject + "\u201D is ready to send.";
    }

    confirmation.hidden = false;
    confirmation.setAttribute("tabindex", "-1");
    confirmation.focus();

    submitButton.textContent = "Message ready to send";

    /* Try to open the email app straight away. If the visitor has
       no mail app configured, the confirmation panel stays on the
       screen with the address and a copy button. */
    window.location.href = mailtoUrl;
  }
})();
