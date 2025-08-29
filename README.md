# CityU Columbia Resources

A trilingual educational resource website providing comprehensive materials for City University of Hong Kong and Columbia University applications.

## Features

- **Multilingual Support**: English, Simplified Chinese, Traditional Chinese
- **Resource Management**: PDF downloads, video links, and educational materials
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Internationalization**: Built-in i18n with next-intl
- **Responsive Design**: Mobile-first design approach
- **SEO Optimized**: Meta tags and structured data

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **next-intl** for internationalization
- **Lucide React** for icons

### Content Management
- JSON-based resource configuration
- Static file hosting for PDFs
- Markdown support ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd CityuColumbiaResources
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Add video background (required):**
   - Place your `background1.mov` file in `public/videos/`
   - The video should be optimized for web (recommended: H.264, reasonable file size)
   - Without this file, the hero section will show a black background

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── api/               # API endpoints
│   │   ├── cityu/             # CityU resource pages
│   │   ├── columbia/          # Columbia resource pages
│   │   └── page.tsx           # Home page
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
├── components/                # React components
│   ├── Navigation.tsx         # Main navigation
│   ├── Hero.tsx              # Homepage hero
│   ├── ResourceList.tsx      # Resource display
│   └── ...
├── lib/                      # Utility functions
│   └── resources.ts          # Resource management
├── i18n.ts                   # Internationalization config
└── middleware.ts             # Next.js middleware

content/
└── resources.json            # Resource configuration

messages/
├── en.json                   # English translations
├── zh-cn.json               # Simplified Chinese
└── zh-hk.json               # Traditional Chinese

public/
└── resources/
    ├── pdfs/                # PDF files
    └── images/              # Image assets
```

## Content Management

### Adding Resources

Edit `content/resources.json` to add new resources:

```json
{
  "cityu": {
    "categories": [
      {
        "id": "admission-guides",
        "title": {
          "en": "Admission Guides",
          "zh-cn": "申请指南",
          "zh-hk": "申請指南"
        },
        "resources": [
          {
            "id": "unique-resource-id",
            "title": {
              "en": "Resource Title",
              "zh-cn": "资源标题",
              "zh-hk": "資源標題"
            },
            "description": {
              "en": "Resource description",
              "zh-cn": "资源描述",
              "zh-hk": "資源描述"
            },
            "type": "pdf",
            "file": "/resources/pdfs/file.pdf"
          }
        ]
      }
    ]
  }
}
```

### Adding PDFs

1. Place PDF files in `public/resources/pdfs/`
2. Reference them in `resources.json` with the path `/resources/pdfs/filename.pdf`

### Adding Translations

Update the respective JSON files in the `messages/` directory:
- `en.json` - English
- `zh-cn.json` - Simplified Chinese  
- `zh-hk.json` - Traditional Chinese

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms

Build the project:
```bash
npm run build
```

The `out/` directory can be served by any static hosting provider.

## Domain Migration from Wix

### Prerequisites
- Domain access in Wix dashboard
- New hosting provider account

### Steps

1. **Export Content**: Manually copy content from Wix site
2. **Download Media**: Export images/PDFs from Wix Media Manager
3. **Deploy Site**: Deploy to your chosen hosting provider
4. **Update DNS**: Point your domain to new hosting
5. **Test**: Verify all functionality works

### DNS Configuration

Update your domain's DNS settings:
- **A Record**: Point to your hosting provider's IP
- **CNAME**: Point `www` to your hosting provider's domain

## License

Private project - All rights reserved.

## Contact

For questions or support, contact: contact@cityucolumbia.com