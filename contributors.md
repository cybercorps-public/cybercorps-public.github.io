---
layout: page
title: Лідерборд
subtitle: Топ учасників за трафіком — дані оновлюються з API в реальному часі
---

<div class="lb-period-tabs" id="lb-tabs">
  <button class="lb-tab active" data-period="month">Місяць</button>
  <button class="lb-tab" data-period="week">Тиждень</button>
  <button class="lb-tab" data-period="day">Сьогодні</button>
  <button class="lb-tab" data-period="total">Весь час</button>
</div>

<div id="lb-container" class="leaderboard"></div>

<p id="lb-updated" class="lb-updated-note"></p>

<script>
(function () {
  var API = 'https://corpsstats.bl4ck.dev/api/user/leaderboard';
  var currentPeriod = 'month';

  function fmtTraffic(bytes) {
    var n = Number(bytes);
    if (n >= 1e15) return [(n / 1e15).toFixed(2), 'ПБ'];
    if (n >= 1e12) return [(n / 1e12).toFixed(1), 'ТБ'];
    if (n >= 1e9)  return [(n / 1e9).toFixed(1),  'ГБ'];
    return [(n / 1e6).toFixed(0), 'МБ'];
  }

  function getActiveTools(trafficByTool) {
    return Object.keys(trafficByTool).filter(function (k) {
      return Number(trafficByTool[k].traffic) > 0;
    });
  }

  function getUniqueOS(trafficByOs) {
    var seen = {}, result = [];
    trafficByOs.forEach(function (entry) {
      var os = entry.os.charAt(0).toUpperCase() + entry.os.slice(1);
      if (!seen[os]) { seen[os] = true; result.push(os); }
    });
    return result;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var MEDALS = ['🥇', '🥈', '🥉'];

  var AVATAR_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' +
    '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>';

  var DIPLOMA_SVG =
    '<svg class="lb-diploma-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="2" y="3" width="15" height="13" rx="1"/>' +
    '<path d="M6 8h7M6 11h4"/><circle cx="18" cy="18" r="3"/>' +
    '<path d="M15.5 20.5L14 23l-1-2-2 1 1.5-2.5"/></svg>';

  function buildCard(user, isPodium, place) {
    var tf      = fmtTraffic(user.totalTraffic);
    var tools   = getActiveTools(user.trafficByTool);
    var osList  = getUniqueOS(user.trafficByOs);
    var rank    = Number(place) || Number(user.rank) || 0;

    var icon = isPodium
      ? '<div class="lb-medal">' + (MEDALS[rank - 1] || '') + '</div>'
      : DIPLOMA_SVG;

    var toolTags = tools.map(function (t) {
      return '<span class="lb-tool-tag">' + esc(t) + '</span>';
    }).join('');

    var osTags = osList.map(function (os) {
      return '<span class="lb-os-tag">' + esc(os) + '</span>';
    }).join('');

    var tags = (toolTags || osTags)
      ? '<div class="lb-os-tags">' + toolTags + osTags + '</div>'
      : '';

    return '<div class="lb-card' + (isPodium ? '' : ' honor') + ' rank-' + rank + '">'
      + icon
      + '<div class="lb-avatar-placeholder">' + AVATAR_SVG + '</div>'
      + '<div class="lb-name">' + esc(user.login) + '</div>'
      + '<div class="lb-stats">'
      +   '<div class="lb-stat">'
      +     '<span class="lb-stat-value">' + tf[0] + '</span>'
      +     '<span class="lb-stat-label">' + tf[1] + '</span>'
      +   '</div>'
      +   '<div class="lb-stat">'
      +     '<span class="lb-stat-value">' + (tools.length || '—') + '</span>'
      +     '<span class="lb-stat-label">інструменти</span>'
      +   '</div>'
      + '</div>'
      + tags
      + '</div>';
  }

  // Візуальний порядок п'єдесталу: 2-е місце ліворуч, 1-е в центрі, 3-є праворуч.
  var PODIUM_ORDER = { 1: [0], 2: [0, 1], 3: [1, 0, 2] };

  function render(users) {
    var podium = users.slice(0, 3);
    var honors = users.slice(3);
    var order  = PODIUM_ORDER[podium.length] || [1, 0, 2];

    var html = '<div class="podium-grid count-' + podium.length + '">'
      + order.map(function (i) {
          var u = podium[i];
          if (!u) return '';
          var place = i + 1;
          return '<div class="podium-slot place-' + place + '">'
            +   buildCard(u, true, place)
            +   '<div class="podium-step"><span class="podium-step-num">' + place + '</span></div>'
            + '</div>';
        }).join('')
      + '</div>';

    if (honors.length) {
      html += '<div class="honors-grid">'
        + honors.map(function (u, i) { return buildCard(u, false, i + 4); }).join('')
        + '</div>';
    }
    document.getElementById('lb-container').innerHTML = html;
  }

  function load(period) {
    var container = document.getElementById('lb-container');
    var updated   = document.getElementById('lb-updated');
    container.innerHTML =
      '<div class="lb-loading"><div class="lb-spinner"></div><span>Завантаження...</span></div>';
    updated.textContent = '';

    fetch(API + '/' + period)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (json) {
        render(json.data.users);
        updated.textContent = 'Оновлено: ' + new Date().toLocaleTimeString('uk-UA');
      })
      .catch(function () {
        container.innerHTML =
          '<div class="lb-error">Не вдалося завантажити дані.<br>' +
          '<button onclick="window.__lbLoad()">Спробувати знову</button></div>';
      });
  }

  window.__lbLoad = function () { load(currentPeriod); };

  document.getElementById('lb-tabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.lb-tab');
    if (!btn) return;
    document.querySelectorAll('#lb-tabs .lb-tab').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentPeriod = btn.dataset.period;
    load(currentPeriod);
  });

  load(currentPeriod);
}());
</script>

<hr class="divider">

<div class="prose" markdown="1">

## Як формується рейтинг

Враховується сумарний трафік (ТБ/ПБ) та кількість задіяних пристроїв. Доступні фільтри: сьогодні, тиждень, місяць, весь час.

</div>
