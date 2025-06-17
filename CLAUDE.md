# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 photo timeline gallery application that automatically organizes and displays personal/family photos in a chronological timeline format. The app features responsive design for both desktop and mobile viewing.

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
- **src/components/theme-merry/** - Main theme components with responsive layout
  - Container.vue - Root layout with desktop/mobile responsive switching
  - SideBar.vue - Navigation and month selection with compress page navigation
  - MainContent.vue - Image display with carousel and thumbnails
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
- Vue Router for navigation
- Tailwind CSS for styling
- VueUse for composables
- Custom fonts (MiSans, Sweet) for theming

### Responsive Design
The Container.vue uses Tailwind breakpoints to switch between:
- Desktop: Horizontal layout with fixed 1024px width
- Mobile: Vertical layout with full width

### Routes
- `/` - Main photo gallery timeline (Container.vue)
- `/compress` - Image compression tool for WebP conversion
- `/about` - About page

Note: The app now uses proper Vue Router routing. App.vue contains `<router-view />` to enable navigation between different pages.

## Important Notes

- Image descriptions are extracted from filename patterns (after second underscore)
- Date extraction follows YYYYMMDD pattern in filenames
- The data.ts file is auto-generated - edit descriptions.ts or use the pipeline instead
- All image paths in data.ts are relative to public/ directory
- The compress page provides browser-based image compression with:
  - Quality control (10-100%)
  - Format selection (JPEG, WebP, PNG)
  - Maximum width setting (480-3840px) with aspect ratio preservation
  - Drag-and-drop support using Canvas toDataURL API