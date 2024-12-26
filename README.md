# Presets

A modern, feature-rich chat application built with Next.js that supports preset commands, file attachments, and document generation.

## Features

- 🤖 AI-powered chat interface
- ⚡ Slash commands for quick actions
- 📎 File attachment support
- 🎨 Dark/Light mode support
- 📑 Multiple preset templates:
  - Presenter Notes
  - Document Comparison
  - Translation
  - Release Notes
  - Code Review
  - Meeting Minutes
  - Blog Post
  - Data Analysis
- 💻 Real-time command palette
- 📱 Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icon system
- [Shadcn UI](https://ui.shadcn.com/) - UI components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/pyljain/preset_design
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Slash Commands

Type `/` in the chat input to see available commands:
- `/presenter` - Generate presenter notes
- `/compare` - Compare documents
- `/translate` - Translate documents
- `/release` - Create release notes
- `/review` - Code review
- `/minutes` - Generate meeting minutes
- `/blog` - Create blog posts
- `/analyze` - Analyze data

### File Attachments

Click the paperclip icon to attach files to your messages. Supported file types depend on the selected preset.

### Presets

Access presets through:
1. Slash commands in the chat input
2. The preset button (list icon) in the chat interface

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ChatApp.tsx    # Main chat component
│   ├── mockData.ts    # Preset definitions
│   └── ui/           # UI components
└── lib/
    └── utils.ts      # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
