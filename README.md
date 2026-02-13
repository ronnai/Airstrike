# Gilbert Air Strike — Website

Flag football program website for **Gilbert Air Strike** (boys) and **Lady Air Strike** (girls).

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **React 19**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind imports, CSS variables, animations
│   ├── layout.js        # Root layout with fonts & metadata
│   └── page.js          # Home page (composes all sections)
├── components/
│   ├── Navbar.js        # Fixed nav, transparent → solid on scroll
│   ├── Hero.js          # Split-screen hero (GAS left / LAS right)
│   ├── About.js         # Program info, stats bar, values
│   ├── Coaches.js       # Coaching staff cards
│   ├── Gallery.js       # Photo grid
│   ├── Contact.js       # CTA + contact info
│   └── Footer.js        # Footer with wordmark
└── hooks/
    └── useInView.js     # Intersection Observer hook for scroll animations
```

## Images

- `public/images/` — Compressed web-ready images
- `public/images/originals/` — Full-resolution source files

## Deployment

Push to GitHub and connect to [Vercel](https://vercel.com) for automatic deployments.

## Future Additions

- Player evaluation portal (parent PIN access)
- Tryouts / registration page
- Video highlight reel section
- Social media integration
