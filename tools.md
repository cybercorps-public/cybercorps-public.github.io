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

## СОВА - твій впевнений перший крок (переписати)

Якщо ти щойно приєднався чи приєдналася — починай тут. Не потрібен технічний досвід.

### Крок 1 - налаштовуємо VPN

Для початку налаштовуємо VPN 

> **Правило безпеки:** Використовуй перевірені VPN.

### Крок 1 - Встановлюємо "Сову"

Текст про те як встановити

</div>

<div id="server" class="tab-panel prose" markdown="1">

## CDSS - для твого сервера

CDSS - це Bash-утиліта для встановлення, оновлення та керування набором мережевих інструментів Cyber Corps на Linux. Скрипт визначає дистрибутив, архітектуру та init-систему, встановлює потрібні базові пакети, створює системні служби, веде конфігурацію в одному файлі та надає інтерактивне меню.

### Встановлення

Рекомендований варіант:

```bash
curl -fsSLo install.sh https://raw.githubusercontent.com/
# Перегляньте install.sh перед запуском
sudo bash install.sh
```

Швидкий варіант:

```bash
curl -sL https://raw.githubusercontent.com/install.sh | sudo bash -s
```

> **Примітка:** CDSS можна запускати від `root` без встановленого `sudo`. Якщо ви root — `sudo` не потрібен. Для non-root користувачів потрібен `sudo`.


</div>

<div id="individual" class="tab-panel prose" markdown="1">

<div class="individual-intro" markdown="1">

## Індивідальне використання інструментів

Якщо ти вже давно знами, маєш власні погляди на інструменти, і хочеш запускати `mhddos`, `distress` чи `x100` вручну, то ось тобі відповідні гайди

### Крок 1 - налаштовуємо VPN

Для початку налаштовуємо VPN 

> **Правило безпеки:** Використовуй перевірені VPN.

</div>

<div class="tabs nested-tabs">
  <button class="tab-btn" onclick="switchTab(event, 'mhddos')">MHDDOS</button>
  <button class="tab-btn" onclick="switchTab(event, 'distress')">DISTRESS</button>
  <button class="tab-btn" onclick="switchTab(event, 'x100')">X100</button>
</div>

<div id="individual-content" class="tab-panel-container">
  <div id="mhddos" class="tab-panel prose" markdown="1">

### MHDDOS - посібник користувача

Гайд по використанню MHDDOS для запуску атак.

#### Встановлення та налаштування

Опис MHDDOS та як його налаштувати.

#### Приклади використання

Приклади команд для запуску атак.

  </div>

  <div id="distress" class="tab-panel prose" markdown="1">

### DISTRESS - посібник користувача

Гайд по використанню DISTRESS для захисту.

#### Встановлення та налаштування

Опис DISTRESS та як його налаштувати.

#### Приклади використання

Приклади команд для запуску захисту.

  </div>

  <div id="x100" class="tab-panel prose" markdown="1">

### X100 - посібник користувача

Гайд по використанню X100 для додаткового захисту.

#### Встановлення та налаштування

Опис X100 та як його налаштувати.

#### Приклади використання

Приклади команд для запуску X100.

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
