# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A trilingual educational resource website providing comprehensive materials for City University of Hong Kong and Columbia University applications. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **i18n**: next-intl for trilingual support (en, zh-cn, zh-hk)
- **Content**: JSON-based resource management
- **Icons**: Lucide React

### Key Directories
```
src/app/[locale]/     # Localized routes with dynamic locale segments
src/components/       # Reusable React components
src/lib/             # Utilities and resource management
messages/            # Translation files for each locale
content/             # JSON configuration for resources
public/resources/    # Static assets (PDFs, images)
```

### Internationalization
- Uses `next-intl` with locale prefixes in URLs
- Middleware handles locale routing and validation
- Translation messages stored in JSON files
- Dynamic locale parameter in all routes: `[locale]`

### Resource Management
- Resources defined in `content/resources.json`
- Support for PDFs, videos, and external links
- Download tracking via API routes
- Categorized by university (CityU/Columbia)

### Content Structure
Resources are organized by:
- University (cityu/columbia)
- Categories (admission-guides, video-tutorials, etc.)
- Individual resources with multilingual metadata

## Common Tasks

### Adding New Resources
1. Edit `content/resources.json` 
2. Add translations to all locale files in `messages/`
3. Place files in `public/resources/pdfs/` if PDFs

### Adding New Pages
1. Create in `src/app/[locale]/[page]/` structure
2. Use `useTranslations()` hook for i18n
3. Add navigation links and translations

### Component Development  
- Use TypeScript interfaces
- Import translations with `useTranslations()`
- Follow existing component patterns
- Use Tailwind CSS classes consistently

## Important Notes

- All routes must include `[locale]` dynamic segment
- PDF downloads go through API routes for tracking
- Use `useParams()` to get current locale in components
- Translation keys should exist in all three locale files