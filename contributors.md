---
layout: page
title: Лідерборд
subtitle: Учасники, що зробили найбільший внесок у спільну справу
---

<div class="leaderboard">

  <div class="podium-grid">
    {% for contributor in site.data.contributors limit:3 %}
    <div class="lb-card rank-{{ forloop.index }}">

      <div class="lb-medal">
        {% if forloop.index == 1 %}🥇{% elsif forloop.index == 2 %}🥈{% else %}🥉{% endif %}
      </div>

      {% if contributor.avatar and contributor.avatar != "" %}
        <img class="lb-avatar" src="{{ contributor.avatar }}" alt="{{ contributor.name }}">
      {% else %}
        <div class="lb-avatar-placeholder">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
      {% endif %}

      <div class="lb-name">
        {% if contributor.link and contributor.link != "" %}
          <a href="{{ contributor.link }}" target="_blank" rel="noopener">{{ contributor.name }}</a>
        {% else %}
          {{ contributor.name }}
        {% endif %}
      </div>
      <div class="lb-handle">{{ contributor.handle }}</div>

      <div class="lb-stats">
        <div class="lb-stat">
          <span class="lb-stat-value">{{ contributor.contributions }}</span>
          <span class="lb-stat-label">ТБ</span>
        </div>
        <div class="lb-stat">
          <span class="lb-stat-value">{{ contributor.servers | default: "—" }}</span>
          <span class="lb-stat-label">пристрої</span>
        </div>
      </div>

      {% if contributor.os %}
      <div class="lb-os-tags">
        {% for os_name in contributor.os %}
          <span class="lb-os-tag">{{ os_name }}</span>
        {% endfor %}
      </div>
      {% endif %}

    </div>
    {% endfor %}
  </div>

  <div class="honors-grid">
    {% for contributor in site.data.contributors offset:3 %}
    {% assign rank = forloop.index | plus: 3 %}
    <div class="lb-card honor rank-{{ rank }}">

      <svg class="lb-diploma-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="15" height="13" rx="1"/>
        <path d="M6 8h7M6 11h4"/>
        <circle cx="18" cy="18" r="3"/>
        <path d="M15.5 20.5L14 23l-1-2-2 1 1.5-2.5"/>
      </svg>

      {% if contributor.avatar and contributor.avatar != "" %}
        <img class="lb-avatar" src="{{ contributor.avatar }}" alt="{{ contributor.name }}">
      {% else %}
        <div class="lb-avatar-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
      {% endif %}

      <div class="lb-name">
        {% if contributor.link and contributor.link != "" %}
          <a href="{{ contributor.link }}" target="_blank" rel="noopener">{{ contributor.name }}</a>
        {% else %}
          {{ contributor.name }}
        {% endif %}
      </div>
      <div class="lb-handle">{{ contributor.handle }}</div>

      <div class="lb-stats">
        <div class="lb-stat">
          <span class="lb-stat-value">{{ contributor.contributions }}</span>
          <span class="lb-stat-label">ТБ</span>
        </div>
        <div class="lb-stat">
          <span class="lb-stat-value">{{ contributor.servers | default: "—" }}</span>
          <span class="lb-stat-label">пристрої</span>
        </div>
      </div>

      {% if contributor.os %}
      <div class="lb-os-tags">
        {% for os_name in contributor.os %}
          <span class="lb-os-tag">{{ os_name }}</span>
        {% endfor %}
      </div>
      {% endif %}

    </div>
    {% endfor %}
  </div>

</div>

<hr class="divider">

<div class="prose" markdown="1">

## Як потрапити в рейтинг

Рейтинг оновлюється вручну. Враховуються:
- Кількість внесків
- Якість та точність даних
- Допомога іншим учасникам

</div>
