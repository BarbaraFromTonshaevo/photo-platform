# Photo Platform — CLAUDE.md

## О проекте
Платформа фотографа с клиентским кабинетом.
Портфолио проект, стек: Nuxt 4 + TypeScript + FSD.

## Стек
- Nuxt 4, Vue 3, TypeScript
- FSD архитектура (Feature-Sliced Design)
- Pinia — стейт менеджмент
- GSAP + Lenis — анимации
- @nuxt/image — оптимизация изображений
- Storybook — документация компонентов
- Vitest — unit тесты
- Supabase — Auth + Database
- Cloudflare R2 — хранилище фото (S3-совместимый)
- Vercel — деплой

## Архитектура FSD
src/
├── app/          # layouts, plugins, styles
├── pages/        # роутинг
├── widgets/      # крупные блоки (AlbumGallery, Lightbox)
├── features/     # фичи (select-photo, download-archive)
├── entities/     # сущности (photo, album, client, order)
└── shared/       # ui, lib, config, styles

## Правила импортов FSD
- Импорт только сверху вниз: pages → widgets → features → entities → shared
- Никогда не импортировать из вышестоящего слоя
- Между слайсами одного слоя импорты запрещены

## Соглашения по коду
- Все компоненты на TypeScript, Options API не используем
- Composables начинаются с use (usePhoto, useAlbum)
- Компоненты именуются PascalCase
- Файлы и папки kebab-case
- CSS только через SCSS и CSS custom properties из дизайн-системы
- Никаких inline стилей

## Дизайн-система
Цвета, типографика и отступы через CSS custom properties.
Все переменные в app/styles/tokens.scss.
Светлая и тёмная тема через [data-theme="dark"].

## Команды
npm run dev          # локальный сервер
npm run build        # продакшн сборка
npm run storybook    # запуск Storybook
npm run lint         # проверка линтером
npm run test         # запуск тестов
npm run format       # форматирование

## Текущий статус
- [x] Главная страница с анимациями
- [x] Деплой на Vercel
- [ ] Оптимизация изображений и Lighthouse
- [ ] Страница публичной фотосессии
- [ ] Storybook компоненты
- [ ] Supabase + R2
- [ ] Клиентский кабинет
- [ ] Админка