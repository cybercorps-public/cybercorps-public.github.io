(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- animated pixel-camo background ---------- */
  var canvas = document.getElementById("camo-canvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var CELL = 26;
    var palette = ["#0b0f08", "#10150b", "#18200f", "#202b13", "#2c3a18"];
    var grid = [], cols = 0, rows = 0;

    function hash(x, y) {
      var h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return h - Math.floor(h);
    }
    function noise(x, y) {
      var xi = Math.floor(x), yi = Math.floor(y);
      var xf = x - xi, yf = y - yi;
      var a = hash(xi, yi), b = hash(xi + 1, yi);
      var c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }

    function build() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL) + 1;
      rows = Math.ceil(canvas.height / CELL) + 1;
      grid = [];
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var n = noise(x * 0.16, y * 0.16) * 0.6 + noise(x * 0.45, y * 0.45) * 0.4;
          var idx = Math.min(palette.length - 1, Math.floor(n * palette.length * 1.15));
          grid.push(idx);
        }
      }
      drawAll();
    }

    function drawAll() {
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          ctx.fillStyle = palette[grid[y * cols + x]];
          ctx.fillRect(x * CELL, y * CELL, CELL - 1, CELL - 1);
        }
      }
    }

    var glints = [];
    function tick() {
      for (var i = glints.length - 1; i >= 0; i--) {
        var g = glints[i];
        g.life--;
        if (g.life <= 0) {
          ctx.fillStyle = palette[grid[g.y * cols + g.x]];
          ctx.fillRect(g.x * CELL, g.y * CELL, CELL - 1, CELL - 1);
          glints.splice(i, 1);
        }
      }
      if (glints.length < 14 && Math.random() < 0.7) {
        var x = Math.floor(Math.random() * cols);
        var y = Math.floor(Math.random() * rows);
        var col = Math.random() < 0.18 ? "rgba(232,198,63,0.5)" : "rgba(163,196,67,0.28)";
        ctx.fillStyle = col;
        ctx.fillRect(x * CELL, y * CELL, CELL - 1, CELL - 1);
        glints.push({ x: x, y: y, life: 14 + Math.floor(Math.random() * 30) });
      }
    }

    build();
    window.addEventListener("resize", build);
    if (!reduceMotion) setInterval(tick, 90);
  }

  /* ---------- nav scrolled state ---------- */
  var nav = document.querySelector(".site-nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle && nav) {
    function closeNav() {
      nav.classList.remove("nav-open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("nav-open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("nav-open") && !nav.contains(e.target)) closeNav();
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---------- scroll reveal ---------- */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- hero terminal typing loop ---------- */
  var termEl = document.getElementById("term-text");
  if (termEl && !reduceMotion) {
    var lines = [
      "сканування цілей... ЗНАЙДЕНО",
      "підготовка операції: АКТИВНО",
      "атака на цифрову інфраструктуру... OK",
      "канали зв'язку захищено [TOR+VPN]",
      "статус підрозділу: НА ПОЗИЦІЯХ"
    ];
    var li = 0, ci = 0, deleting = false;

    function type() {
      var line = lines[li];
      if (!deleting) {
        ci++;
        termEl.textContent = line.slice(0, ci);
        if (ci === line.length) {
          deleting = true;
          setTimeout(type, 2200);
          return;
        }
        setTimeout(type, 34 + Math.random() * 40);
      } else {
        ci -= 3;
        if (ci <= 0) {
          ci = 0;
          deleting = false;
          li = (li + 1) % lines.length;
        }
        termEl.textContent = line.slice(0, Math.max(0, ci));
        setTimeout(type, deleting ? 14 : 300);
      }
    }
    type();
  } else if (termEl) {
    termEl.textContent = "статус підрозділу: НА ПОЗИЦІЯХ";
  }

  /* ---------- hero word stagger ---------- */
  document.querySelectorAll("h1 .word").forEach(function (w, i) {
    w.style.animationDelay = 0.15 + i * 0.09 + "s";
  });

  /* ---------- Plyr video player ---------- */
  if (document.getElementById("join-player") && typeof Plyr !== "undefined") {
    new Plyr("#join-player", {
      controls: ["play-large", "play", "progress", "current-time", "duration", "mute", "volume", "fullscreen"],
      resetOnEnd: false,
      tooltips: { controls: false }
    });
  }

  /* ---------- responsive tables: add data-label to each td ---------- */
  document.querySelectorAll(".prose table").forEach(function (table) {
    var headers = Array.from(table.querySelectorAll("thead th")).map(function (th) {
      return th.textContent.trim();
    });
    if (!headers.length) return;
    table.querySelectorAll("tbody td").forEach(function (td, i) {
      td.setAttribute("data-label", headers[i % headers.length]);
    });
    table.classList.add("responsive-table");
  });
})();
