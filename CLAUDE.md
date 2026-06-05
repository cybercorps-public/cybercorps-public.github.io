# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static volunteer community website supporting GUR MO Ukraine, hosted on **GitHub Pages**. Trusted volunteers manage all page content by editing Markdown files directly — no code changes required for content updates. The site is built with **Jekyll** (GitHub Pages' native SSG).

## Design language

Style used by the community — military tactical green aesthetic:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a1a10` | Page background |
| `--bg-card` | `#101e14` | Card/panel surfaces |
| `--bg-elevated` | `#162a1a` | Elevated elements, code blocks |
| `--border` | `#1e3222` | All borders and dividers |
| `--accent-gold` | `#c8a028` | Primary accent, headings, labels |
| `--accent-blue` | `#3a5a30` | Buttons, active nav background (olive green) |
| `--accent-blue-light` | `#4a9a78` | Secondary accent, teal highlights |
| `--text` | `#d0dcc8` | Body text (slight green tint) |
| `--text-muted` | `#7a9a7e` | Secondary text |

- Font: `Inter` or system sans-serif
- Active nav item: olive green background + gold left border (matches CyberOwl sidebar)
- No heavy shadows, minimal decorative clutter

## Site structure

```
corp_site/
├── _config.yml          # Jekyll config — set telegram_url and baseurl here
├── _layouts/
│   ├── default.html     # Shell: nav, footer, CSS link
│   └── page.html        # Inherits default; adds page-hero + .page-content wrapper
├── _data/
│   └── contributors.yml # Top-5 list — edit to update rankings
├── index.md             # Home — mission, goals, Telegram CTA
├── tools.md             # Two-tab guide: beginners / technical
├── contributors.md      # Renders _data/contributors.yml
├── assets/
│   ├── css/main.css     # All styles — single file, no preprocessor
│   └── img/             # Logo, contributor avatars
└── Gemfile              # Only used by GitHub Pages CI, not local dev
```

## Content management by volunteers

All editable content lives in Markdown files or YAML data — no HTML or Jekyll knowledge needed:

| Page | File to edit |
|---|---|
| Home (mission / goals / Telegram link) | `index.md` |
| Tools & instructions | `tools.md` |
| Top-5 contributors | `_data/contributors.yml` |

Volunteers edit these files directly on GitHub (web UI or git). Push to `main` auto-deploys via GitHub Pages.

## Local development

The `Gemfile` is for GitHub Pages CI only. Local dev uses the system-installed Jekyll directly — **do not use `bundle exec`**.

```bash
# From corp_site/ directory:
jekyll serve --port 4000     # hot-reload server at http://localhost:4000
jekyll build                 # static output to _site/
```

**Note on this machine:** `ruby-dev` is not installed, so `bundle install` fails on native gem extensions. The workaround is to run Jekyll without a Gemfile — copy the site to a temp dir (sans Gemfile) or set `BUNDLE_GEMFILE` to a non-existent path. GitHub Pages handles the full gem install in CI.

## GitHub Pages deployment

- Branch: `main` (configure in repo Settings → Pages)
- No CI config needed — GitHub Pages builds Jekyll automatically on push
- Set `baseurl: "/repo-name"` in `_config.yml` for `username.github.io/repo-name`, or `baseurl: ""` for a custom domain

## Key conventions

- All pages use front matter: `layout: page`, `title:`, optional `subtitle:`
- `index.md` uses `layout: default` (custom hero section, not the generic page-hero)
- `_data/contributors.yml` fields: `name`, `handle`, `contributions` (int), `avatar` (URL or empty), `link` (URL or empty)
- `site.telegram_url` from `_config.yml` is the single source of truth for the Telegram link — used in nav, hero CTA, and footer
- All CSS in `assets/css/main.css` — edit design tokens in `:root` to retheme the whole site
