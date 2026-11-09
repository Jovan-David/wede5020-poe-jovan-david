/* ============================================================
   enquiry.js - programme enquiry form
   WEDE5020 Part 3 | Jovan David (ST10510821)
   ------------------------------------------------------------
   What this file does:
     1. validates every control with JavaScript patterns [3][4]
     2. shows one clear error message per field plus an error summary
     3. counts the characters typed in the message box
     4. sends the enquiry with fetch() and async/await [1][2]
     5. builds a personalised quotation, availability note and
        reply time from the chosen programme
   The endpoint is simulated with a local Promise so the form works
   on a static host. The commented block in sendEnquiry() shows how
   to swap in a real endpoint without changing anything else.
   ============================================================ */

(function () {
  "use strict";

  /* Where a real backend would receive the enquiry */
  var ENDPOINT = ""; /* e.g. "https://formspree.io/f/your-form-id" */

  /* Validation patterns - these are also documented in the README */
  var PATTERNS = {
    name: /^[A-Za-z][A-Za-z'\-\s]{1,49}$/,
    email: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,
    /* South African mobile numbers: 0821234567 or +27821234567 */
    phone: /^(\+27|0)[6-8][0-9]{8}$/
  };

  var form, statusBox, submitButton, quotePanel, messageField, counter;

  document.addEventListener("DOMContentLoaded", function () {
    form = document.getElementById("enquiry-form");
    if (!form) return; /* not on this page */

    statusBox = document.getElementById("form-status");
    submitButton = document.getElementById("enquiry-submit");
    quotePanel = document.getElementById("quote-panel");
    messageField = document.getElementById("message");
    counter = document.getElementById("message-counter");

    /* Preselect the programme when the visitor arrives from the
       services page link (enquiry.html?service=workshop-composting) */
    preselectServiceFromUrl();

    /* Live character counter for the message box */
    if (messageField && counter) {
      messageField.addEventListener("input", function () {
        counter.textContent = messageField.value.length + " / 500 characters";
      });
    }

    /* Re-check a field as soon as the visitor leaves it, and clear
       the error as soon as the field becomes valid while typing. */
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });

      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
        updateQuote();
      });
    });

    form.addEventListener("submit", handleSubmit);
  });

  /* ------------------------------------------------------------
     Read ?service=... from the address bar [22]
     ------------------------------------------------------------ */
  function preselectServiceFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var serviceId = params.get("service");
    if (!serviceId) return;

    var select = document.getElementById("service");
    if (!select) return;

    var matchingOption = Array.prototype.slice.call(select.options).filter(function (option) {
      return option.value === serviceId;
    })[0];

    if (matchingOption) {
      select.value = serviceId;
      updateQuote();
    }
  }

  /* ------------------------------------------------------------
     Validation helpers
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

  /* Validate one field and return true when it is valid */
  function validateField(field) {
    var value = (field.value || "").trim();
    var message = "";

    switch (field.id) {
      case "first-name":
        if (value === "") {
          message = "Please enter your first name.";
        } else if (!PATTERNS.name.test(value)) {
          message = "Use letters, spaces, hyphens or apostrophes only (2 to 50 characters).";
        }
        break;

      case "last-name":
        if (value === "") {
          message = "Please enter your surname.";
        } else if (!PATTERNS.name.test(value)) {
          message = "Use letters, spaces, hyphens or apostrophes only (2 to 50 characters).";
        }
        break;

      case "email":
        if (value === "") {
          message = "Please enter your email address so we can reply.";
        } else if (!PATTERNS.email.test(value)) {
          message = "Enter a valid email address, for example thandi@example.co.za.";
        }
        break;

      case "phone":
        if (value === "") {
          message = "Please enter a mobile number.";
        } else if (!PATTERNS.phone.test(value.replace(/[\s()-]/g, ""))) {
          message = "Use a South African mobile number, for example 082 123 4567 or +27 82 123 4567.";
        }
        break;

      case "service":
        if (value === "") message = "Please choose the programme you are interested in.";
        break;

      case "quantity":
        var quantity = Number(value);
        if (value === "") {
          message = "Please enter how many people or plots you need.";
        } else if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
          message = "Enter a whole number between 1 and 50.";
        }
        break;

      case "preferred-date":
        if (value === "") {
          message = "Please choose a preferred date.";
        } else if (isPastDate(value)) {
          message = "Choose today or a date in the future.";
        }
        break;

      case "message":
        if (value.length < 10) {
          message = "Please tell us a little more (at least 10 characters).";
        } else if (value.length > 500) {
          message = "Please keep your message under 500 characters.";
        }
        break;

      case "consent":
        if (!field.checked) message = "Please agree to us storing your details so we can reply.";
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

  function isPastDate(value) {
    var chosen = new Date(value + "T00:00:00");
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return chosen < today;
  }

  /* Check the radio group: at least one option must be chosen */
  function validateEnquiryType() {
    var radios = form.querySelectorAll('input[name="enquiry-type"]');
    var checked = Array.prototype.slice.call(radios).some(function (radio) {
      return radio.checked;
    });

    var errorElement = document.getElementById("enquiry-type-error");

    if (!checked && errorElement) {
      errorElement.textContent = "Please tell us who the enquiry is for.";
      errorElement.classList.add("is-visible");
      return false;
    }

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("is-visible");
    }
    return true;
  }

  /* ------------------------------------------------------------
     Validate the whole form and list every problem at the top
     ------------------------------------------------------------ */
  function validateForm() {
    var fields = ["first-name", "last-name", "email", "phone", "service", "quantity", "preferred-date", "message", "consent"];
    var problems = [];

    fields.forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) return;
      if (!validateField(field)) {
        problems.push({
          label: field.getAttribute("data-label") || field.id,
          message: (getErrorElement(field) || {}).textContent || "Please check this field."
        });
      }
    });

    if (!validateEnquiryType()) {
      problems.push({ label: "Enquiry type", message: "Choose Individual, School, Community group or Business." });
    }

    return problems;
  }

  function showSummary(problems) {
    statusBox.className = "form-status error is-visible";

    var intro = document.createElement("strong");
    intro.textContent = problems.length === 1
      ? "There is 1 problem with your enquiry:"
      : "There are " + problems.length + " problems with your enquiry:";
    statusBox.textContent = "";
    statusBox.appendChild(intro);

    var list = document.createElement("ul");
    problems.forEach(function (problem) {
      var item = document.createElement("li");
      item.textContent = problem.label + ": " + problem.message;
      list.appendChild(item);
    });
    statusBox.appendChild(list);

    /* Move the keyboard focus to the summary so it is announced */
    statusBox.setAttribute("tabindex", "-1");
    statusBox.focus();
  }

  function hideSummary() {
    statusBox.className = "form-status";
    statusBox.textContent = "";
  }

  /* ------------------------------------------------------------
     Quotation logic
     ------------------------------------------------------------ */
  function getSelectedService() {
    var select = document.getElementById("service");
    if (!select || select.value === "") return null;

    var option = select.options[select.selectedIndex];

    return {
      id: option.value,
      name: option.textContent,
      price: Number(option.getAttribute("data-price") || 0),
      unit: option.getAttribute("data-unit") || "per booking",
      duration: option.getAttribute("data-duration") || "To be confirmed",
      availability: option.getAttribute("data-availability") || "Dates confirmed by email",
      reply: option.getAttribute("data-reply") || "one working day"
    };
  }

  function calculateTotal(service, quantity) {
    if (!service) return 0;
    return service.price * quantity;
  }

  /* Live preview of the price under the form (nice touch, and it
     proves the price is calculated rather than typed). */
  function updateQuote() {
    var preview = document.getElementById("price-preview");
    if (!preview) return;

    var service = getSelectedService();
    var quantityField = document.getElementById("quantity");
    var quantity = Number((quantityField && quantityField.value) || 0);

    if (!service || !quantity || quantity < 1) {
      preview.textContent = "";
      return;
    }

    if (service.price === 0) {
      preview.textContent = service.name + " is free of charge. No payment is needed.";
      return;
    }

    var total = calculateTotal(service, quantity);
    preview.textContent = "Estimated cost: " + quantity + " \u00D7 R" +
      service.price.toLocaleString("en-ZA") + " = R" + total.toLocaleString("en-ZA") + " in total.";
  }

  /* ------------------------------------------------------------
     Submit: validate, then send with async/await
     ------------------------------------------------------------ */
  async function handleSubmit(event) {
    event.preventDefault();
    hideSummary();

    var problems = validateForm();

    if (problems.length > 0) {
      showSummary(problems);
      return;
    }

    var payload = collectFormData();

    /* Loading state: the button is disabled and says what is happening */
    submitButton.disabled = true;
    submitButton.setAttribute("aria-disabled", "true");
    submitButton.textContent = "Sending your enquiry...";

    statusBox.className = "form-status info is-visible";
    statusBox.textContent = "Sending your enquiry, please wait...";

    try {
      var result = await sendEnquiry(payload);

      statusBox.className = "form-status success is-visible";
      statusBox.textContent = "Thank you " + payload.firstName + "! Your enquiry was sent successfully.";

      showQuotePanel(payload, result.reference);
      form.reset();
      if (counter) counter.textContent = "0 / 500 characters";

      var preview = document.getElementById("price-preview");
      if (preview) preview.textContent = "";
    } catch (error) {
      statusBox.className = "form-status error is-visible";
      statusBox.textContent = "Sorry, your enquiry could not be sent. Please try again or email info@greenthumbgarden.org.";
      console.error("Enquiry could not be sent:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-disabled");
      submitButton.textContent = "Send enquiry";
    }
  }

  function collectFormData() {
    var service = getSelectedService();
    var quantity = Number(document.getElementById("quantity").value);

    var addons = Array.prototype.slice
      .call(form.querySelectorAll('input[name="addons"]:checked'))
      .map(function (checkbox) {
        return checkbox.value;
      });

    return {
      firstName: document.getElementById("first-name").value.trim(),
      lastName: document.getElementById("last-name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      enquiryType: (form.querySelector('input[name="enquiry-type"]:checked') || {}).value || "",
      serviceId: service ? service.id : "",
      serviceName: service ? service.name : "",
      /* The rest of the programme details travel with the payload
         because the form is reset before the quote is drawn. */
      unit: service ? service.unit : "per booking",
      duration: service ? service.duration : "To be confirmed",
      availability: service ? service.availability : "Dates confirmed by email",
      reply: service ? service.reply : "one working day",
      price: service ? service.price : 0,
      quantity: quantity,
      preferredDate: document.getElementById("preferred-date").value,
      message: document.getElementById("message").value.trim(),
      addons: addons,
      total: service ? calculateTotal(service, quantity) : 0
    };
  }

  /* ------------------------------------------------------------
     The "AJAX" call.

     No real server exists for this portfolio, so the request is
     simulated with a Promise that resolves after a short delay,
     exactly like a real JSON API would. To use a real endpoint,
     uncomment the fetch block below and set ENDPOINT at the top.
     ------------------------------------------------------------ */
  async function sendEnquiry(payload) {
    if (ENDPOINT !== "") {
      var response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Server responded with " + response.status);
      }

      return response.json();
    }

    /* --- simulated endpoint --- */
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          ok: true,
          reference: createReference(),
          receivedAt: new Date().toISOString()
        });
      }, 1200);
    });
  }

  function createReference() {
    var now = new Date();
    var stamp = String(now.getFullYear()).slice(2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");
    var random = Math.floor(1000 + Math.random() * 9000);
    return "GT-" + stamp + "-" + random;
  }

  /* ------------------------------------------------------------
     Personalised confirmation panel
     ------------------------------------------------------------ */
  function showQuotePanel(payload, reference) {
    if (!quotePanel) return;

    /* Use the values captured before the form was reset, so the
       quote still describes what the visitor actually chose. */
    var quantity = payload.quantity;
    var total = payload.total;

    function setText(id, value) {
      var element = document.getElementById(id);
      if (element) element.textContent = value;
    }

    setText("quote-name", payload.firstName + " " + payload.lastName);
    setText("quote-programme", payload.serviceName || "Programme enquiry");
    setText("quote-reference", reference);
    setText("quote-quantity", quantity + " \u00D7 " + payload.unit);
    setText("quote-date", formatDate(payload.preferredDate));
    setText("quote-availability", "Requested date: " + formatDate(payload.preferredDate) +
      ". Next available start: " + payload.availability + ".");
    setText("quote-duration", payload.duration);
    setText("quote-total", total === 0 ? "Free of charge" : "R" + total.toLocaleString("en-ZA"));
    setText("quote-reply", "We reply within " + payload.reply + " to " + payload.email + ".");

    quotePanel.hidden = false;
    quotePanel.setAttribute("tabindex", "-1");
    quotePanel.focus();
  }

  function formatDate(value) {
    if (!value) return "not chosen";
    var date = new Date(value + "T00:00:00");
    return date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
  }
})();
