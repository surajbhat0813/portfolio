# Portfolio Website

A modern, dark, and minimalistic portfolio website built with Next.js, featuring smooth scroll animations and an Apple-inspired design.

## Features

- **Dark & Minimalistic Design**: Clean black background with white text and minimal colors
- **Smooth Scroll Animations**: Apple-style scroll effects with Framer Motion
- **Responsive Design**: Fully responsive across all device sizes
- **Section-Based Layout**: 
  - About (Hero section)
  - Experience (Timeline)
  - Projects (Card grid)
  - Skills (Categorized)
  - Contact (Form)
- **Interactive Navigation**: Sticky navbar with active section highlighting
- **Scroll Progress Indicator**: Visual scroll progress on desktop

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Update Personal Information

1. **About Section** (`components/sections/About.tsx`):
   - Update the hero text with your name
   - Modify the description paragraphs

2. **Experience Section** (`components/sections/Experience.tsx`):
   - Update the `experiences` array with your work history

3. **Projects Section** (`components/sections/Projects.tsx`):
   - Update the `projects` array with your projects
   - Add GitHub and live URLs

4. **Skills Section** (`components/sections/Skills.tsx`):
   - Update the `skillCategories` array with your skills

5. **Contact Section** (`components/sections/Contact.tsx`):
   - Update the email address
   - Configure form submission (currently uses a placeholder)

6. **Metadata** (`app/layout.tsx`):
   - Update the title and description in the metadata object

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

The site will be live at `your-project.vercel.app`

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── sections/           # Section components
│   ├── ui/                 # UI components (Navbar, etc.)
│   └── animations/         # Animation components
└── lib/
    └── utils.ts            # Utility functions
```

## License

MIT
