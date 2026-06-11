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
  <button class="tab-btn" onclick="switchTab(event, 'mhddos')">MHDDOS</button>
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
  const btn = event.target;
  const container = btn.closest('.tabs');
  const targetPanel = document.getElementById(tabId);

  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (container.classList.contains('nested-tabs')) {
    // Дочірній таб: показуємо лише контент дочірнього, ховаємо intro батька
    const individualPanel = document.getElementById('individual');
    individualPanel.classList.add('child-active');
    document.querySelectorAll('#individual-content .tab-panel').forEach(p => p.classList.remove('active'));
  } else {
    // Батьківський таб: ховаємо всі панелі верхнього рівня
    Array.from(container.parentElement.children).forEach(el => {
      if (el.classList.contains('tab-panel')) el.classList.remove('active');
    });
    // Скидаємо стан дочірніх табів в individual
    const individualPanel = document.getElementById('individual');
    if (individualPanel) {
      individualPanel.classList.remove('child-active');
      individualPanel.querySelectorAll('.nested-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    }
  }

  targetPanel.classList.add('active');
}
</script>
