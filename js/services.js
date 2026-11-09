/* ============================================================
   services.js - dynamic programmes list
   WEDE5020 Part 3 | Jovan David (ST10510821)
   ------------------------------------------------------------
   The programme cards on services.html are not typed into the HTML.
   They are loaded from data/services.json with fetch() [R1][R2][R24]
   and then filtered, searched and sorted in the browser.
   Everything is written with textContent (never innerHTML) so any
   text inside the JSON file can never run as code [R19].
   ============================================================ */

(function () {
  "use strict";

  var DATA_URL = "data/services.json";

  var state = {
    all: [],
    search: "",
    category: "All",
    sort: "name-asc"
  };

  var elements = {};

  /* Small helper so we do not repeat document.getElementById */
  function byId(id) {
    return document.getElementById(id);
  }

  /* ------------------------------------------------------------
     Load the JSON file
     ------------------------------------------------------------ */
  async function loadServices() {
    elements.grid.setAttribute("aria-busy", "true");

    try {
      var response = await fetch(DATA_URL);

      if (!response.ok) {
        throw new Error("The server answered with status " + response.status);
      }

      var data = await response.json();

      if (!data || !Array.isArray(data.services) || data.services.length === 0) {
        throw new Error("The JSON file did not contain any services");
      }

      state.all = data.services;
      buildCategoryChips();

      if (data.lastUpdated && elements.updated) {
        var date = new Date(data.lastUpdated + "T00:00:00");
        elements.updated.textContent = "Prices updated " + date.toLocaleDateString("en-ZA", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }) + ".";
      }

      render();
    } catch (error) {
      showError(error);
    } finally {
      elements.grid.removeAttribute("aria-busy");
    }
  }

  /* ------------------------------------------------------------
     Build the category buttons from whatever categories appear in
     the JSON, so adding a new category later needs no HTML edits.
     ------------------------------------------------------------ */
  function buildCategoryChips() {
    if (!elements.chips) return;

    var categories = ["All"];
    state.all.forEach(function (service) {
      if (categories.indexOf(service.category) === -1) {
        categories.push(service.category);
      }
    });

    categories.forEach(function (category) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "chip" + (category === state.category ? " is-active" : "");
      button.textContent = category;
      button.setAttribute("data-category", category);
      button.setAttribute("aria-pressed", category === state.category ? "true" : "false");
      elements.chips.appendChild(button);
    });

    /* Event delegation: one listener handles every chip */
    elements.chips.addEventListener("click", function (event) {
      var chip = event.target.closest(".chip");
      if (!chip) return;

      state.category = chip.getAttribute("data-category");

      elements.chips.querySelectorAll(".chip").forEach(function (otherChip) {
        var isActive = otherChip === chip;
        otherChip.classList.toggle("is-active", isActive);
        otherChip.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      render();
    });
  }

  /* ------------------------------------------------------------
     Filter, search and sort
     ------------------------------------------------------------ */
  function getVisibleServices() {
    var term = state.search.trim().toLowerCase();

    var list = state.all.filter(function (service) {
      var matchesCategory = state.category === "All" || service.category === state.category;

      if (!matchesCategory) return false;
      if (term === "") return true;

      /* Search the fields a visitor is likely to type */
      var haystack = [service.name, service.category, service.summary, service.availability]
        .join(" ")
        .toLowerCase();

      return haystack.indexOf(term) !== -1;
    });

    list.sort(function (a, b) {
      if (state.sort === "price-asc") return a.price - b.price;
      if (state.sort === "price-desc") return b.price - a.price;
      if (state.sort === "date-asc") return new Date(a.nextDate) - new Date(b.nextDate);

      /* Default: name A to Z, using the locale aware comparison */
      return a.name.localeCompare(b.name);
    });

    return list;
  }

  /* ------------------------------------------------------------
     Draw the cards
     ------------------------------------------------------------ */
  function render() {
    var list = getVisibleServices();

    elements.grid.textContent = "";

    if (list.length === 0) {
      var empty = document.createElement("li");
      empty.className = "empty-state";

      var emptyTitle = document.createElement("p");
      emptyTitle.textContent = "No programmes match \u201C" + state.search + "\u201D in " +
        (state.category === "All" ? "any category" : state.category) + ".";

      var emptyHint = document.createElement("p");
      emptyHint.textContent = "Try a shorter search word, choose another category, or clear the filters.";

      var clearButton = document.createElement("button");
      clearButton.type = "button";
      clearButton.className = "btn btn-outline btn-small";
      clearButton.textContent = "Clear filters";
      clearButton.addEventListener("click", resetFilters);

      empty.appendChild(emptyTitle);
      empty.appendChild(emptyHint);
      empty.appendChild(clearButton);
      elements.grid.appendChild(empty);
      announce(0, state.all.length);
      return;
    }

    list.forEach(function (service) {
      elements.grid.appendChild(createCard(service));
    });

    announce(list.length, state.all.length);
  }

  function createCard(service) {
    var card = document.createElement("li");
    card.className = "service-card";

    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = service.category;

    var title = document.createElement("h3");
    title.textContent = service.name;

    var summary = document.createElement("p");
    summary.textContent = service.summary;

    var price = document.createElement("p");
    price.className = "service-price";
    price.textContent = service.price === 0 ? "Free" : "R" + service.price.toLocaleString("en-ZA");
    if (service.price !== 0) {
      var unit = document.createElement("span");
      unit.textContent = " " + service.unit;
      price.appendChild(unit);
    }

    var meta = document.createElement("ul");
    meta.className = "service-meta";

    [
      "Duration: " + service.duration,
      "Next date: " + formatDate(service.nextDate),
      service.availability
    ].forEach(function (text) {
      var item = document.createElement("li");
      item.textContent = text;
      meta.appendChild(item);
    });

    var enquire = document.createElement("a");
    enquire.className = "btn btn-primary btn-small";
    enquire.href = "enquiry.html?service=" + encodeURIComponent(service.id);
    enquire.textContent = "Enquire about this";

    card.appendChild(tag);
    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(price);
    card.appendChild(meta);
    card.appendChild(enquire);

    return card;
  }

  function formatDate(value) {
    if (!value) return "To be confirmed";
    var date = new Date(value + "T00:00:00");
    return date.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  }

  /* ------------------------------------------------------------
     Count message (read out by screen readers) and reset
     ------------------------------------------------------------ */
  function announce(count, total) {
    if (!elements.summary) return;

    if (count === total) {
      elements.summary.textContent = "Showing all " + total + " programmes.";
    } else {
      elements.summary.textContent = "Showing " + count + " of " + total + " programmes.";
    }
  }

  function resetFilters() {
    state.search = "";
    state.category = "All";
    state.sort = "name-asc";

    if (elements.search) elements.search.value = "";
    if (elements.sort) elements.sort.value = "name-asc";

    elements.chips.querySelectorAll(".chip").forEach(function (chip) {
      var isActive = chip.getAttribute("data-category") === "All";
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    render();
  }

  /* ------------------------------------------------------------
     Error message if the JSON file cannot be loaded
     (for example when the page is opened directly from a file and
     the browser blocks the fetch request)
     ------------------------------------------------------------ */
  function showError(error) {
    elements.grid.textContent = "";

    var box = document.createElement("li");
    box.className = "error-state";

    var title = document.createElement("p");
    title.textContent = "Sorry, the programme list could not be loaded.";

    var detail = document.createElement("p");
    detail.textContent = "Please check your connection and try again, or contact us on +27 31 563 0142.";

    var retry = document.createElement("button");
    retry.type = "button";
    retry.className = "btn btn-outline btn-small";
    retry.textContent = "Try again";
    retry.addEventListener("click", function () {
      elements.grid.textContent = "";
      var loading = document.createElement("li");
      loading.className = "loading-state";
      loading.textContent = "Loading programmes...";
      elements.grid.appendChild(loading);
      loadServices();
    });

    box.appendChild(title);
    box.appendChild(detail);
    box.appendChild(retry);
    elements.grid.appendChild(box);

    if (elements.summary) elements.summary.textContent = "The programme list is currently unavailable.";
    if (elements.updated) elements.updated.textContent = "";

    /* Kept in the console for debugging - visitors never see it */
    console.error("Could not load " + DATA_URL + ":", error);
  }

  /* ------------------------------------------------------------
     Start-up
     ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    elements.grid = byId("service-grid");
    if (!elements.grid) return; /* not on this page */

    elements.summary = byId("result-summary");
    elements.updated = byId("prices-updated");
    elements.chips = byId("category-chips");
    elements.search = byId("service-search");
    elements.sort = byId("service-sort");

    /* Live search: filter while typing, no submit button needed */
    if (elements.search) {
      elements.search.addEventListener("input", function (event) {
        state.search = event.target.value;
        render();
      });
    }

    if (elements.sort) {
      elements.sort.addEventListener("change", function (event) {
        state.sort = event.target.value;
        render();
      });
    }

    loadServices();
  });
})();
