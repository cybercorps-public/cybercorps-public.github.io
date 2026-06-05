# Деплой на GitHub Pages

## Передумови

- Акаунт на [github.com](https://github.com)
- Git встановлений локально (`git --version`)
- Доступ до репозиторію (або права на його створення)

---

## 1. Створення репозиторію

1. Зайди на github.com → **New repository**
2. Назви репозиторій:
   - `<твій-нік>.github.io` — якщо хочеш сайт на `https://<твій-нік>.github.io`
   - Або будь-яка назва (напр. `volunteers-site`) — тоді сайт буде на `https://<твій-нік>.github.io/volunteers-site`
3. Visibility: **Public** (GitHub Pages безкоштовний тільки для публічних репо на free-тарифі)
4. **Не** ініціалізуй з README — репозиторій має бути порожнім

---

## 2. Налаштування `_config.yml`

Перед першим деплоєм відредагуй `_config.yml`:

```yaml
# Якщо репозиторій називається <нік>.github.io:
baseurl: ""
url: "https://<твій-нік>.github.io"

# Якщо репозиторій має іншу назву (напр. volunteers-site):
baseurl: "/volunteers-site"
url: "https://<твій-нік>.github.io"

# Обов'язково:
telegram_url: "https://t.me/назва_твого_каналу"
```

---

## 3. Перший деплой

```bash
cd corp_site

# Ініціалізація git
git init
git add .
git commit -m "initial deploy"

# Підключення до GitHub
git remote add origin https://github.com/<нік>/<назва-репо>.git
git branch -M main
git push -u origin main
```

---

## 4. Увімкнення GitHub Pages

1. Зайди в репозиторій на GitHub
2. **Settings** → **Pages** (ліве меню)
3. Source: **Deploy from a branch**
4. Branch: `main` / `/ (root)`
5. Натисни **Save**

Через 1–2 хвилини сайт з'явиться за адресою, яку GitHub покаже вгорі сторінки Pages.

> Статус деплою видно у вкладці **Actions** — зелена галочка означає успіх.

---

## 5. Оновлення контенту

### Через GitHub Web UI (для не-технічних волонтерів)

1. Відкрий потрібний файл у репозиторії:
   - Місія / головна → `index.md`
   - Інструменти → `tools.md`
   - Топ-5 контрибюторів → `_data/contributors.yml`
2. Натисни іконку олівця ✏️ (Edit this file)
3. Внеси зміни
4. Внизу: **Commit changes** → **Commit directly to main**

GitHub Pages автоматично перебудує сайт (~1 хв).

### Через git (для технічних учасників)

```bash
# Оновити файл і запушити
git add _data/contributors.yml
git commit -m "update top contributors"
git push
```

---

## 6. Локальна розробка

На цій машині де `ruby-dev` не встановлений, тому `bundle install` не працює.  
Використовуй системний Jekyll **без** Gemfile:

```bash
# Скопіюй сайт у тимчасову папку без Gemfile
cp -r corp_site /tmp/site-preview
rm /tmp/site-preview/Gemfile

# Запусти сервер
cd /tmp/site-preview
jekyll serve --port 4000
# → http://localhost:4000
```

На машині з `ruby-dev` (або в GitHub Codespaces):

```bash
cd corp_site
bundle install
bundle exec jekyll serve --livereload
```

---

## 7. Кастомний домен (опційно)

1. Купи домен (напр. `volunteers-gur.org`)
2. У DNS провайдера додай записи:
   ```
   A    @   185.199.108.153
   A    @   185.199.109.153
   A    @   185.199.110.153
   A    @   185.199.111.153
   CNAME www <нік>.github.io
   ```
3. У `_config.yml` встанови `baseurl: ""` і `url: "https://volunteers-gur.org"`
4. Settings → Pages → **Custom domain** → введи домен → Save
5. Увімкни **Enforce HTTPS** (з'явиться після propagation DNS, ~24 год)

---

## 8. Доступ для волонтерів

Щоб довірені волонтери могли редагувати контент без злиття через PR:

1. Settings → **Collaborators** → **Add people**
2. Введи GitHub-нік волонтера
3. Вибери роль **Write** (редагування файлів) або **Maintain** (+ управління налаштуваннями)

Волонтери з роллю Write можуть редагувати `index.md`, `tools.md`, `_data/contributors.yml` напряму через веб-інтерфейс GitHub.

---

## Швидка шпаргалка

| Дія | Команда / місце |
|-----|----------------|
| Перший деплой | `git push -u origin main` |
| Оновити контент | Редагуй `.md` / `.yml` → push або web UI |
| Статус деплою | GitHub → вкладка **Actions** |
| Переглянути сайт | `https://<нік>.github.io/<репо>` |
| Локальний прев'ю | `jekyll serve --port 4000` (без Gemfile) |
