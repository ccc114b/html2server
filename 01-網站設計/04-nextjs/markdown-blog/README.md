# Markdown Blog

A Next.js-based blog that properly renders Gemini and OpenAI markdown output with full support for:

- ✅ Syntax-highlighted code blocks
- ✅ Mathematical expressions (LaTeX)
- ✅ Tables and complex layouts  
- ✅ GitHub Flavored Markdown (GFM)
- ✅ Dark mode support
- ✅ Responsive design
- ✅ File-based post management

## Features

### Perfect for AI Content
- Handles complex code blocks from various AI models
- Renders mathematical formulas and equations
- Supports tables, lists, and nested formatting
- Custom styling for AI-generated blockquotes

### Developer Friendly
- TypeScript for type safety
- Tailwind CSS for styling
- File-based content management
- Static site generation support
- Optimized performance

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Adding Posts

Create markdown files in the `posts/` directory with front matter:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
author: "Author Name"
description: "Brief description"
tags: ["tag1", "tag2"]
---

Your markdown content here...
```

## Supported Markdown Features

- Headers (H1-H6)
- **Bold** and *italic* text
- `Inline code` and code blocks
- [Links](url) and images
- Tables with complex content
- Blockquotes and callouts
- Lists (ordered/unordered, nested)
- Mathematical expressions (LaTeX)
- GitHub Flavored Markdown extensions

## Project Structure

```
markdown-blog/
├── src/
│   ├── app/
│   │   ├── posts/[slug]/     # Dynamic post pages
│   │   └── page.tsx          # Homepage with post listing
│   ├── components/
│   │   └── MarkdownRenderer.tsx  # Custom markdown renderer
│   └── lib/
│       └── posts.ts          # Post utilities
├── posts/                    # Markdown files
└── README.md
```

## Customization

### Styling
The blog uses Tailwind CSS with custom prose classes. Modify `MarkdownRenderer.tsx` to adjust styling.

### Markdown Plugins
Currently configured with:
- `remark-gfm` for GitHub Flavored Markdown
- `remark-math` + `rehype-katex` for math
- `rehype-highlight` for code syntax highlighting

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Vercel (Recommended)
Connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms
The app can be deployed to any platform supporting Next.js.

## License

MIT License
