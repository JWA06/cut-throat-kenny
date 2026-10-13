(function () {
  "use strict";

  var config = window.CTK_CONFIG || {};
  var booking = config.booking || {};

  /* Booking links ---------------------------------------------------------
     With a booking URL set, every [data-book] link opens the booking page.
     Without one, they keep pointing at the #book section. */
  function setupBooking() {
    var url = (booking.url || "").trim();
    var live = url !== "";
    var barbers = booking.barbers || {};

    document.querySelectorAll("[data-book]").forEach(function (link) {
      if (!live) return;
      var barberUrl = (barbers[link.dataset.barber] || "").trim();
      link.href = barberUrl || url;
      if (booking.newTab !== false) {
        link.target = "_blank";
        link.rel = "noopener";
      }
    });

    document.querySelectorAll("[data-booking-live]").forEach(function (el) {
      el.hidden = !live;
    });
    document.querySelectorAll("[data-booking-soon]").forEach(function (el) {
      el.hidden = live;
    });
  }

  /* Header: scrolled state and phone menu -------------------------------- */
  function setupHeader() {
    var header = document.querySelector("[data-header]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.getElementById("site-nav");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !nav) return;
    var label = toggle.querySelector(".sr-only");

    function setOpen(open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Close menu" : "Open menu";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* Opening hours: highlight today and show open / closed -----------------
     Hours are read from the table rows (data-open / data-close), so the
     table in index.html is the only place they need editing. */
  var DAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function shopTimeNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    var get = function (type) {
      var part = parts.find(function (p) { return p.type === type; });
      return part ? part.value : "";
    };
    return {
      day: DAY_INDEX[get("weekday")],
      minutes: Number(get("hour")) * 60 + Number(get("minute")),
    };
  }

  function toMinutes(hhmm) {
    var bits = hhmm.split(":").map(Number);
    return bits[0] * 60 + (bits[1] || 0);
  }

  function formatTime(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    var suffix = h >= 12 ? "pm" : "am";
    var h12 = h % 12 || 12;
    return m ? h12 + ":" + String(m).padStart(2, "0") + suffix : h12 + suffix;
  }

  function setupHours() {
    var rows = Array.prototype.slice.call(document.querySelectorAll("[data-hours] [data-day]"));
    if (!rows.length) return;

    var schedule = {};
    rows.forEach(function (row) {
      var d = row.dataset;
      schedule[Number(d.day)] = d.open && d.close
        ? { open: toMinutes(d.open), close: toMinutes(d.close) }
        : null;
    });

    var now = shopTimeNow();
    if (now.day === undefined || isNaN(now.minutes)) return;

    rows.forEach(function (row) {
      var isToday = Number(row.dataset.day) === now.day;
      row.classList.toggle("is-today", isToday);
      if (isToday) row.setAttribute("aria-current", "date");
    });

    var today = schedule[now.day];
    var state = "closed";
    var text = "";

    if (today && now.minutes >= today.open && now.minutes < today.close) {
      state = "open";
      text = "Open now · until " + formatTime(today.close);
    } else if (today && now.minutes < today.open) {
      text = "Closed · opens " + formatTime(today.open) + " today";
    } else {
      for (var i = 1; i <= 7; i++) {
        var day = (now.day + i) % 7;
        var next = schedule[day];
        if (next) {
          text = "Closed · opens " + formatTime(next.open) + " " + (i === 1 ? "tomorrow" : DAY_NAMES[day]);
          break;
        }
      }
    }

    if (!text) return;
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.textContent = text;
      el.dataset.state = state;
    });
  }

  /* Photos: fade in when loaded, show the labelled slot if the file is missing. */
  function setupPhotos() {
    document.querySelectorAll(".photo img").forEach(function (img) {
      function loaded() { img.classList.add("is-loaded"); }
      function missing() { img.remove(); }

      if (img.complete) {
        if (img.naturalWidth > 0) loaded();
        else missing();
      } else {
        img.addEventListener("load", loaded, { once: true });
        img.addEventListener("error", missing, { once: true });
      }
    });
  }

  function setupYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  setupPhotos();
  setupBooking();
  setupHeader();
  setupHours();
  setupYear();
})();
