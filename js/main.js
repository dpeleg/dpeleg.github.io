/* Daniel Peleg — Portfolio
   Small progressive enhancements only; every page is readable without JS.
   1. Project dialogs (home)   2. Gallery thumbnails   3. Case-study contents + progress */

(function () {
  "use strict";

  /* ---------- 1. Project dialogs ---------- */
  var lastTrigger = null;

  function openDialog(id, trigger) {
    var dialog = document.getElementById(id);
    if (!dialog || typeof dialog.showModal !== "function") return false;
    lastTrigger = trigger || null;
    dialog.showModal();
    if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
    return true;
  }

  document.querySelectorAll("[data-dialog]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openDialog(btn.getAttribute("data-dialog"), btn);
    });
  });

  document.querySelectorAll("dialog.project-dialog").forEach(function (dialog) {
    // close buttons
    dialog.querySelectorAll("[data-close]").forEach(function (b) {
      b.addEventListener("click", function () { dialog.close(); });
    });
    // click on the backdrop closes
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    // return focus and clear the hash
    dialog.addEventListener("close", function () {
      if (location.hash === "#" + dialog.id) history.replaceState(null, "", location.pathname);
      if (lastTrigger) lastTrigger.focus();
    });
  });

  // deep link: index.html#project-opal opens that dialog
  if (location.hash.indexOf("#project-") === 0) {
    var trig = document.querySelector('[data-dialog="' + location.hash.slice(1) + '"]');
    openDialog(location.hash.slice(1), trig);
  }

  /* ---------- 2. Gallery thumbnails ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var main = gallery.querySelector(".gallery__main img");
    var caption = gallery.querySelector(".gallery__caption");
    var thumbs = gallery.querySelectorAll(".gallery__thumbs button");
    thumbs.forEach(function (t) {
      t.addEventListener("click", function () {
        var img = t.querySelector("img");
        main.src = img.src;
        main.alt = img.getAttribute("data-alt") || img.alt;
        if (caption) caption.textContent = t.getAttribute("data-caption") || "";
        thumbs.forEach(function (o) { o.setAttribute("aria-pressed", String(o === t)); });
      });
    });
  });

  /* ---------- 3. Case study: active section + reading progress ---------- */
  var toc = document.querySelector(".toc");
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
    var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);

    // open the contents list on wide screens (it is a collapsed <details> on mobile)
    var wide = window.matchMedia("(min-width: 1000px)");
    function syncToc() { toc.open = wide.matches; }
    syncToc();
    wide.addEventListener("change", syncToc);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            var on = a.getAttribute("href") === "#" + entry.target.id;
            a.classList.toggle("is-active", on);
            if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      sections.forEach(function (s) { observer.observe(s); });
    }
  }

  var bar = document.querySelector(".progress span");
  if (bar) {
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }
})();
