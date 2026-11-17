# Keepsake Landing (Vite + Pug + SCSS)

Лендінг Keepsake з лабораторної роботи №7, перенесений на сучасний робочий процес фронтенд-розробки: Pug-шаблони, модульна SCSS-архітектура, PostCSS (Autoprefixer), оптимізовані зображення (AVIF/WebP/JPEG), автоматичний контроль якості коду та деплой на GitHub Pages.

**Демо:** https://Oleh-0-0.github.io/landing-keepsake-vite/

## Вимоги до середовища

- Node.js LTS, версія не нижче 20 (`node -v`)
- npm (`npm -v`)
- Git

## Команди

| Команда           | Призначення                                            |
| ----------------- | ------------------------------------------------------ |
| `npm install`     | Встановлення залежностей                               |
| `npm run dev`     | Сервер розробки Vite з гарячим оновленням              |
| `npm run build`   | Продакшн-збірка у папку `dist`                         |
| `npm run preview` | Локальний перегляд зібраного сайту                     |
| `npm run images`  | Генерація AVIF/WebP/JPEG у кількох ширинах (sharp)     |
| `npm run format`  | Форматування всього проєкту Prettier                   |
| `npm run lint`    | Перевірка стилів (Stylelint) і форматування (Prettier) |

## Структура проєкту

```text
landing-keepsake-vite/
├── .husky/
│   └── pre-commit
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── assets/
│   │   ├── images/          # AVIF, WebP, JPEG у кількох ширинах
│   │   └── fonts/           # WOFF2
│   ├── components/          # header.pug, footer.pug, sections/*.pug
│   ├── data/                # дані секцій (масиви об'єктів)
│   ├── includes/            # head, meta, fonts, svg-спрайт
│   ├── layouts/
│   │   └── main.pug         # базовий макет
│   ├── mixins/              # Pug-міксини
│   ├── pages/
│   │   └── index.pug
│   └── styles/
│       ├── abstracts/       # змінні, функції, міксини (_index.scss з @forward)
│       ├── base/            # reset, типографіка, шрифти
│       ├── layout/          # контейнер, секції, header, footer
│       ├── components/      # один БЕМ-блок: один файл
│       └── main.scss        # єдина точка входу
├── .browserslistrc
├── .prettierrc
├── .prettierignore
├── .stylelintrc.json
├── postcss.config.js
├── vite.config.js
└── package.json
```

> Якщо фактична структура відрізняється, відкоригуйте дерево вище.

## Архітектура

### Pug

- **Макет** `layouts/main.pug` містить блоки `meta`, `title`, `styles`, `content`, `scripts`. Сторінка `pages/index.pug` успадковує його через `extends` і перевизначає блоки; додатковий вміст додається через `append` / `prepend`.
- **Компоненти**: шапка, футер і кожна секція лендінгу це окремі файли, підключені через `include`.
- **Дані** (навігація, категорії фільтра, роботи, послуги, статистика, записи журналу, посилання футера, соцмережі) винесені в `src/data/` у вигляді масивів об'єктів і виводяться через `each item, i in items`. Розмітка кожної картки пишеться один раз.
- **Міксини** (`src/mixins/`): `+btn`, `+icon`, `+picture`, `+work-card`. Вони використовують `block`, `&attributes`, `if` / `unless` та `case` / `when`.
- Службові коментарі пишуться як `//-` і не потрапляють у HTML.

### SCSS

- Лише `@use` і `@forward`; `@import` не використовується. Кожна папка має `_index.scss`, що реекспортує partials. `main.scss` єдина точка входу, підключена в `layouts/main.pug`.
- Дизайн-токени (кольори, шрифти, відступи, брейкпоінти) оголошені як SCSS-змінні та map-и в `abstracts/`. Кольори генеруються у CSS custom properties в `:root` через `@each`.
- Міксин `mq()` приймає значення з map-а брейкпоінтів, підхід mobile first (лише `min-width`).
- Власні функції (наприклад, `rem()` на базі `sass:math`) та допоміжні міксини.
- Іменування за БЕМ: `block__element--modifier`, один блок один файл. Вкладеність не глибша 3 рівнів, без `id` та `!important`.
- Вендорні префікси вручну не пишуться: їх додає Autoprefixer.

## Використані інструменти

| Інструмент                      | Для чого                                                       |
| ------------------------------- | -------------------------------------------------------------- |
| Vite                            | Dev-сервер і збирання проєкту                                  |
| Vituum + Pug plugin             | Генерація HTML із Pug-шаблонів                                 |
| Pug                             | Шаблонізатор (extends, include, mixins, each)                  |
| Sass (Dart Sass)                | Препроцесор CSS, модульна архітектура                          |
| PostCSS + Autoprefixer          | Автоматичні вендорні префікси                                  |
| Browserslist                    | Опис цільових браузерів для Autoprefixer                       |
| sharp                           | Генерація AVIF/WebP/JPEG у кількох розмірах (`npm run images`) |
| Prettier + @prettier/plugin-pug | Єдине форматування коду, включно з `.pug`                      |
| Stylelint                       | Перевірка SCSS, правила БЕМ і обмеження вкладеності            |
| husky + lint-staged             | Pre-commit хук: перевірка та форматування лише змінених файлів |
| GitHub Actions                  | Автоматична збірка і публікація на GitHub Pages                |

## Цільові браузери (Browserslist)

```text
<вставте вміст .browserslistrc, наприклад:>
last 2 Chrome versions
last 2 Firefox versions
last 2 Edge versions
last 2 Safari versions
last 2 iOS versions
```

Фактичний список браузерів можна переглянути командою `npx browserslist`.

## Оптимізація

Порівняння розміру ресурсів (до / після оптимізації):

| Ресурс             | До оптимізації (оригінальні JPEG) | Після оптимізації (AVIF / WebP / адаптивні розміри) |
| ------------------ | --------------------------------- | --------------------------------------------------- |
| Портфоліо (робота) | ~1.2 MB – 2.5 MB (JPEG)           | ~45 KB (AVIF 400w) / ~110 KB (AVIF 800w)            |
| Прев'ю журналу     | ~800 KB (JPEG)                    | ~30 KB (AVIF) / ~50 KB (WebP)                       |
| CSS-файли          | ~45 KB (немініфіковані)           | ~11 KB (мініфіковані Vite / esbuild)                |

Мініфікацію CSS під час `npm run build` виконує Vite (esbuild), а вендорні префікси додає Autoprefixer.

## Контроль якості коду

Перед кожним комітом хук `pre-commit` запускає `lint-staged`:

- `*.scss`: `stylelint --fix` і `prettier --write`
- `*.{pug,js,json,md}`: `prettier --write`

Коміт із помилкою Stylelint (наприклад, клас `.Card_Title` або порожній блок) блокується.

## Деплой

Сайт публікується на GitHub Pages через GitHub Actions (`.github/workflows/deploy.yml`) при кожному пуші в гілку `main`. Папка `dist` у репозиторій не комітиться, її збирає workflow.

У `vite.config.js` вказано `base: '/landing-keepsake-vite/'`, щоб стилі та зображення правильно завантажувалися на GitHub Pages.

Налаштування: **Settings → Pages → Source: GitHub Actions**.
