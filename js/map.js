/* ============================================================
   map.js - interactive OpenLayers map
   WEDE5020 Part 3 | Jovan David (ST10510821)
   ------------------------------------------------------------
   Features:
     - OpenStreetMap base layer (free, no API key) [R8]
     - four GreenThumb locations as vector markers
     - a popup with the address and a Google Maps directions link
     - a coordinate readout when the map is clicked
     - zoom in, zoom out and reset buttons
     - a location list that works without the map [R12]
   OpenLayers is loaded from a CDN in the page <head>. Its global
   object is called "ol". API details: OpenLayers docs [R6] and the
   Overlay API page used for the popup [R7].
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     The four sites. Coordinates are [longitude, latitude] because
     that is the order OpenLayers expects (the opposite of how we
     normally say "latitude, longitude").
     ------------------------------------------------------------ */
  var LOCATIONS = [
    {
      id: "main-garden",
      name: "GreenThumb Main Garden",
      address: "45 Adelaide Tambo Drive, Durban North, Durban, 4051",
      description: "Our original 1.5 hectare garden, the tool shed and the office.",
      lon: 31.0350,
      lat: -29.7860,
      page: "about.html"
    },
    {
      id: "workshop-hub",
      name: "Workshop and Training Hub",
      address: "Berea Community Hall, 121 Stephen Dlamini Road, Berea, Durban",
      description: "Indoor workshops run here on rainy days and in winter.",
      lon: 31.0115,
      lat: -29.8515,
      page: "services.html"
    },
    {
      id: "youth-plot",
      name: "Youth Education Plot",
      address: "Chatsworth Environmental Centre, 1 Havenside Drive, Chatsworth",
      description: "The plot used for school visits and the holiday garden club.",
      lon: 30.9265,
      lat: -29.9185,
      page: "services.html"
    },
    {
      id: "harvest-market",
      name: "Saturday Harvest Market",
      address: "Chartwell Drive, Umhlanga Rocks, Durban",
      description: "Our monthly market stall, open 07:00 to 12:00 on the first Saturday.",
      lon: 31.0845,
      lat: -29.7265,
      page: "gallery.html"
    }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    var mapElement = document.getElementById("map");
    if (!mapElement) return; /* this page has no map */

    /* If the CDN was blocked or offline, show a friendly message
       instead of leaving an empty green box on the page. */
    if (typeof ol === "undefined") {
      showMapError(mapElement);
      return;
    }

    initMap(mapElement);
  });

  function showMapError(mapElement) {
    mapElement.textContent = "";
    var message = document.createElement("p");
    message.style.padding = "24px";
    message.textContent = "The interactive map could not load. Please use the address list below or call +27 31 563 0142.";
    mapElement.appendChild(message);
  }

  /* ------------------------------------------------------------
     Build the map
     ------------------------------------------------------------ */
  function initMap(mapElement) {
    var fromLonLat = ol.proj.fromLonLat;

    /* 1. Marker style: a green dot with a white ring and a brown
          outline, based on the brand colours. */
    var markerStyle = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 9,
        fill: new ol.style.Fill({ color: "#2E7D32" }),
        stroke: new ol.style.Stroke({ color: "#FFF8E1", width: 3 })
      })
    });

    /* 2. One point feature per location */
    var features = LOCATIONS.map(function (location) {
      var feature = new ol.Feature({
        geometry: new ol.geom.Point(fromLonLat([location.lon, location.lat]))
      });
      feature.setProperties(location);
      feature.setStyle(markerStyle);
      return feature;
    });

    var markerLayer = new ol.layer.Vector({
      source: new ol.source.Vector({ features: features }),
      /* Markers should always sit on top of the map tiles */
      zIndex: 10
    });

    /* 3. The map itself, centred on Durban North */
    var map = new ol.Map({
      target: mapElement,
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }),
        markerLayer
      ],
      view: new ol.View({
        center: fromLonLat([31.03, -29.83]),
        zoom: 11,
        minZoom: 8,
        maxZoom: 18
      }),
      /* Hide the default zoom buttons - we add our own buttons that
         match the site design (and are easier to reach on mobile). */
      controls: ol.control.defaults.defaults({ zoom: false, attribution: true })
    });

    /* 4. Popup overlay. The element lives inside the map shell. */
    var popupElement = document.getElementById("map-popup");
    var popupTitle = document.getElementById("popup-title");
    var popupAddress = document.getElementById("popup-address");
    var popupDescription = document.getElementById("popup-description");
    var popupPage = document.getElementById("popup-page");
    var popupDirections = document.getElementById("popup-directions");
    var popupClose = document.getElementById("popup-close");

    var overlay = new ol.Overlay({
      element: popupElement,
      autoPan: { animation: { duration: 250 } },
      positioning: "bottom-center",
      offset: [0, -12]
    });
    map.addOverlay(overlay);

    function showPopup(location) {
      popupTitle.textContent = location.name;
      popupAddress.textContent = location.address;
      popupDescription.textContent = location.description;
      popupPage.href = location.page;

      /* Google Maps directions link built from the coordinates [R6] */
      popupDirections.href = "https://www.google.com/maps/dir/?api=1&destination=" +
        location.lat + "," + location.lon;

      overlay.setPosition(fromLonLat([location.lon, location.lat]));
      if (popupClose) popupClose.focus();
    }

    function hidePopup() {
      overlay.setPosition(undefined);
    }

    if (popupClose) {
      popupClose.addEventListener("click", hidePopup);
    }

    /* ----------------------------------------------------------
       5. Clicking the map
          - on a marker: open its popup
          - anywhere else: show the coordinates of that point
       ---------------------------------------------------------- */
    var coordinateOutput = document.getElementById("map-coordinates");

    map.on("singleclick", function (event) {
      var clickedFeature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
      });

      if (clickedFeature) {
        showPopup(clickedFeature.getProperties());
      } else {
        hidePopup();
      }

      if (coordinateOutput) {
        var coordinates = ol.proj.toLonLat(event.coordinate);
        var lon = coordinates[0].toFixed(5);
        var lat = coordinates[1].toFixed(5);
        coordinateOutput.textContent = "You clicked near longitude " + lon + ", latitude " + lat +
          ". Click a green marker to see the address.";
      }
    });

    /* Show a pointer cursor when hovering a marker */
    map.on("pointermove", function (event) {
      if (event.dragging) return;
      var hit = map.hasFeatureAtPixel(event.pixel);
      mapElement.style.cursor = hit ? "pointer" : "";
    });

    /* ----------------------------------------------------------
       6. Toolbar buttons (zoom in / zoom out / reset)
       ---------------------------------------------------------- */
    var view = map.getView();

    document.querySelectorAll("[data-map-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        var action = button.getAttribute("data-map-action");

        if (action === "zoom-in" || action === "zoom-out") {
          var currentZoom = view.getZoom();
          view.animate({
            zoom: currentZoom + (action === "zoom-in" ? 1 : -1),
            duration: 250
          });
          return;
        }

        if (action === "reset") {
          hidePopup();

          /* fit() frames all four markers, however far apart they are */
          var extent = markerLayer.getSource().getExtent();
          view.fit(extent, {
            padding: [70, 70, 70, 70],
            maxZoom: 13,
            duration: 500
          });
        }
      });
    });

    /* ----------------------------------------------------------
       7. The location list underneath the map.
          Each button pans the map and opens the matching popup, so
          keyboard and screen reader users get the same information
          as people who click the markers.
       ---------------------------------------------------------- */
    document.querySelectorAll("[data-location-id]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-location-id");
        var location = LOCATIONS.filter(function (item) {
          return item.id === id;
        })[0];

        if (!location) return;

        view.animate({
          center: fromLonLat([location.lon, location.lat]),
          zoom: 14,
          duration: 500
        });

        showPopup(location);
      });
    });

    /* Keep the map crisp when the browser window is resized */
    window.addEventListener("resize", function () {
      map.updateSize();
    });
  }
})();
