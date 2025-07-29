# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 18 web application for fijab.se - a Swedish digital agency website. The application features a multi-language blog system with internationalization, admin panel, and content management capabilities.

## Development Commands

- **Start development server**: `npm start` or `ng serve` (runs on http://localhost:4200)
- **Build for production**: `npm run build`
- **Build with localization**: `npm run build_localize` (includes _redirects file copy)
- **Watch mode**: `npm run watch`
- **Run tests**: `npm test` or `ng test`
- **Generate components**: `ng generate component component-name`

## Architecture

### Core Structure
- **Angular 18** with standalone components configuration
- **TypeScript** with strict mode enabled
- **TailwindCSS** for styling with custom color palette (pastel-green, dark-green, beige, etc.)
- **ngx-translate** for internationalization (English/Swedish)
- **Quill** editor for rich text editing in admin panel
- **Strapi CMS** backend at `https://strapi.fijab.se/api`

### Folder Organization
```
src/app/
├── components/     # Reusable UI components (admin-panel, blog-*, header, footer, etc.)
├── pages/         # Route components (main-page, about-page, contact-page, etc.)
├── services/      # Angular services (blog.service, auth.service, data.service)
├── models/        # TypeScript interfaces (blog-post.model, service.model)
├── guards/        # Route guards (auth.guard)
└── assets/        # Static assets including i18n translations
```

### Key Services
- **BlogService**: Manages blog posts via Strapi API with mapping between Strapi response and BlogPost model
- **AuthService**: Handles authentication for admin panel access
- **DataService**: Currently empty service placeholder

### Routing
- Uses Angular Router with route guards for admin protection
- Blog detail pages use dynamic routing (`/blog/:id`)
- Admin routes protected by `authGuard`
- Fallback route redirects to main page

### Internationalization
- Translation files in `src/assets/i18n/` (en.json, sv.json)
- Language switching component available
- xliff format configured for i18n extraction

### Styling
- TailwindCSS with custom theme extending default colors and fonts
- Custom fonts: Josefin Sans, Raleway, Poppins
- Quill editor styles included in build configuration

### Content Management
- Admin panel for creating/editing blog posts
- Rich text editor (Quill) for blog content
- Image and media asset management in assets folder
- Strapi CMS integration for blog data persistence

## Build Configuration
- Production build optimized with bundle size limits (500kb warning, 1mb error)
- Development build includes source maps and no optimization
- Asset copying includes _redirects file for deployment