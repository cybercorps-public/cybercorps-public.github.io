---
layout: page
title: Інструменти Кіберкорпусу
subtitle: Посібники для новачків та досвідчених учасників спільноти
---

<div class="tabs">
  <button class="tab-btn active" onclick="switchTab(event, 'beginners')"> СОВА - для власних гаджетів та девайсів</button>
  <button class="tab-btn" onclick="switchTab(event, 'server')">CDSS - для серверу</button>
  <button class="tab-btn" onclick="switchTab(event, 'individual')">Інидивідальні інструкції</button>
</div>

<div id="beginners" class="tab-panel active prose" markdown="1">

{% include tab-beginners.md %}

</div>

<div id="server" class="tab-panel prose" markdown="1">

{% include tab-server.md %}

</div>

<div id="individual" class="tab-panel prose" markdown="1">

<div class="individual-intro" markdown="1">

{% include tab-individual-intro.md %}

</div>

<div class="tabs nested-tabs">
  <button class="tab-btn" onclick="switchTab(event, 'mhddos')">MHDDOS PROXY</button>
  <button class="tab-btn" onclick="switchTab(event, 'distress')">DISTRESS</button>
  <button class="tab-btn" onclick="switchTab(event, 'x100')">X100</button>
</div>

<div id="individual-content" class="tab-panel-container">
  <div id="mhddos" class="tab-panel prose" markdown="1">

{% include tab-mhddos.md %}

  </div>

  <div id="distress" class="tab-panel prose" markdown="1">

{% include tab-distress.md %}

  </div>

  <div id="x100" class="tab-panel prose" markdown="1">

{% include tab-x100.md %}

  </div>
</div>

</div>

<script>
function switchTab(event, tabId) {
  var btn = event.target;
  var container = btn.closest('.tabs');
  var targetPanel = document.getElementById(tabId);

  container.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');

  if (container.classList.contains('nested-tabs')) {
    var individualPanel = document.getElementById('individual');
    individualPanel.classList.add('child-active');
    document.querySelectorAll('#individual-content .tab-panel').forEach(function (p) { p.classList.remove('active'); });
  } else {
    Array.from(container.parentElement.children).forEach(function (el) {
      if (el.classList.contains('tab-panel')) el.classList.remove('active');
    });
    var individualPanel = document.getElementById('individual');
    if (individualPanel) {
      individualPanel.classList.remove('child-active');
      individualPanel.querySelectorAll('.nested-tabs .tab-btn').forEach(function (b) { b.classList.remove('active'); });
    }
  }

  targetPanel.classList.add('active');
}

// Mobile accordion: convert outer .tabs to stacked accordion on small screens
(function () {
  var BP = 640;
  var tabsEl = document.querySelector('.tabs:not(.nested-tabs)');
  if (!tabsEl) return;

  var outerBtns = Array.from(tabsEl.querySelectorAll(':scope > .tab-btn'));

  function closeAll() {
    document.querySelectorAll('.acc-hdr').forEach(function (h) { h.classList.remove('active'); });
    outerBtns.forEach(function (b) {
      b.classList.remove('active');
      var m = b.getAttribute('onclick').match(/'([^']+)'/);
      if (m) { var p = document.getElementById(m[1]); if (p) p.classList.remove('active'); }
    });
    var ind = document.getElementById('individual');
    if (ind) {
      ind.classList.remove('child-active');
      ind.querySelectorAll('.nested-tabs .tab-btn').forEach(function (b) { b.classList.remove('active'); });
    }
  }

  function buildAccordion() {
    if (tabsEl.dataset.acc) return;

    // close all panels by default
    closeAll();

    outerBtns.forEach(function (btn) {
      var m = (btn.getAttribute('onclick') || '').match(/'([^']+)'/);
      if (!m) return;
      var id = m[1];
      var panel = document.getElementById(id);
      if (!panel) return;

      var hdr = document.createElement('button');
      hdr.type = 'button';
      hdr.className = 'acc-hdr';
      hdr.dataset.panelId = id;
      hdr.innerHTML = '<span class="acc-label">' + btn.textContent.trim() + '</span>' +
                      '<span class="acc-arrow">▼</span>';

      panel.parentNode.insertBefore(hdr, panel);

      hdr.addEventListener('click', function () {
        var wasActive = hdr.classList.contains('active');
        closeAll();
        if (!wasActive) {
          hdr.classList.add('active');
          var target = document.getElementById(id);
          if (target) target.classList.add('active');
          outerBtns.forEach(function (b) {
            if ((b.getAttribute('onclick') || '').indexOf("'" + id + "'") !== -1) b.classList.add('active');
          });
        }
      });
    });

    tabsEl.style.display = 'none';
    tabsEl.dataset.acc = '1';
  }

  function destroyAccordion() {
    if (!tabsEl.dataset.acc) return;
    document.querySelectorAll('.acc-hdr').forEach(function (h) { h.remove(); });
    tabsEl.style.display = '';
    delete tabsEl.dataset.acc;
  }

  function update() {
    if (window.innerWidth <= BP) buildAccordion();
    else destroyAccordion();
  }

  update();
  window.addEventListener('resize', update);
})();
</script>
