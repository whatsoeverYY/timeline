# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 photo timeline gallery application that automatically organizes and displays personal/family photos in a chronological timeline format. The app features a multi-theme system (merry, cutie, summer), dark/light mode support, and responsive design for both desktop and mobile viewing.

## Key Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check first)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

### Image Processing Pipeline
- `npm run organize-old` - Full pipeline for raw images (rename → organize → generate data)
- `npm run organize-source` - Pipeline for pre-processed images (organize → generate data)
- `npm run rename-images-by-exif` - Rename images based on EXIF date data
- `npm run organize-to-public` - Move images to public/image with year/month structure
- `npm run generate-data-from-public` - Generate src/data.ts from public/image folder
- `npm run compress-webp` - Compress images to WebP format

## Architecture

### Core Structure
- **src/data.ts** - Auto-generated image metadata (dates, paths, descriptions)
- **src/components/ThemeContainer.vue** - Theme router that switches between theme implementations
- **src/components/theme-{merry,cutie,summer}/** - Three complete theme implementations
  - Container.vue - Root layout with desktop/mobile responsive switching
  - SideBar.vue - Navigation and month selection with compress page navigation
  - MainContent.vue - Image display with carousel and thumbnails
- **src/components/ui/** - Shared UI components (LampCordToggle, PhotoGrid, PhotoModal)
- **src/composables/** - State management (useTheme, useSelectedDate)
- **src/components/ImageCompress.vue** - Image compression tool with drag-and-drop support
- **public/image/** - Organized photos by year/month structure
- **scripts/** - Image processing automation tools

### Image Workflow
1. Raw images go to `src/assets/old/` → `npm run organize-old`
2. Pre-processed images go to `src/assets/source/` → `npm run organize-source`
3. Final images stored in `public/image/YYYY/MM/` structure
4. Metadata auto-generated in `src/data.ts` with MonthData interface

### Tech Stack
- Vue 3 with Composition API and TypeScript
- Vue Router for navigation with lazy loading
- Tailwind CSS with custom color palette for themes
- VueUse for composables
- Custom fonts (MiSans, Sugar, Sweet, etc.) for theming

### Multi-Theme System
- **Three UI themes**: merry (default), cutie, summer
- **Theme switching** via floating button (top-right corner)
- **Theme persistence** in localStorage with system preference detection
- **Dark/light mode** toggle within each theme
- **Custom color palettes** per theme (tm-*, s-*, dark-* variants)
- **ThemeContainer.vue** acts as theme router, loading appropriate theme components

### Responsive Design
The Container.vue uses Tailwind breakpoints to switch between:
- Desktop: Horizontal layout with fixed 1024px width
- Mobile: Vertical layout with full width

### Routes
- `/` - Main photo gallery timeline via ThemeContainer.vue (theme router)
- `/compress` - Image compression tool for WebP conversion
- `/about` - About page
- `/ai` - AI-powered image captioning tool

Note: The app uses Vue Router with lazy loading. App.vue contains `<router-view />` and ThemeContainer.vue acts as a theme-aware router for the main gallery.

## Configuration Files

- **vite.config.ts** - Build configuration with @ alias (`@` → `src`)
- **eslint.config.js** - Modern flat ESLint config for Vue 3 + TypeScript
- **tailwind.config.js** - Custom color palette definitions for all themes
- **postcss.config.js** - Tailwind CSS + Autoprefixer configuration
- **_redirects** - Netlify SPA routing configuration

## Important Notes

- Image descriptions are extracted from filename patterns (after second underscore)
- Date extraction follows YYYYMMDD pattern in filenames
- The data.ts file is auto-generated - edit descriptions.ts or use the pipeline instead
- All image paths in data.ts are relative to public/ directory
- Theme switching persists user preference and detects system dark mode
- The compress page provides browser-based image compression with:
  - Quality control (10-100%)
  - Format selection (JPEG, WebP, PNG)
  - Maximum width setting (480-3840px) with aspect ratio preservation
  - Drag-and-drop support using Canvas toDataURL API