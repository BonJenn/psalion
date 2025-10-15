# Psalion Capital Website

A modern, professional website for Psalion Capital built with Next.js, TypeScript, and TailwindCSS.

## Features

- **Modern Design**: Clean, professional design matching the original Psalion website
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Interactive Components**: Smooth animations and transitions using Framer Motion
- **Professional Investor Gate**: Access control for restricted content
- **Contact Forms**: Server-side form handling with email notifications
- **CMS Integration**: Sanity CMS integration for dynamic content management
- **SEO Optimized**: Proper metadata and structured data
- **Performance**: Optimized images and fast loading times

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **CMS**: Sanity (for dynamic content management)
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **CMS**: Sanity
- **Email**: Resend
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account (for CMS)
- Resend account (for email)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd psalion
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token

# Email Service (Resend)
RESEND_API_KEY=your-resend-api-key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── contact/           # Contact page
│   ├── legal/             # Legal pages (Privacy, Terms, Cookies)
│   ├── psalion-yield/     # Psalion Yield product page
│   ├── psalion-vc/        # Psalion VC product page
│   ├── bespoke-services/  # Bespoke services page
│   ├── clients/           # Clients page
│   ├── press/             # Press mentions page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   ├── navigation.tsx    # Main navigation
│   ├── footer.tsx        # Footer component
│   ├── hero-section.tsx  # Homepage hero
│   ├── product-cards.tsx # Product showcase
│   ├── portfolio-grid.tsx # VC portfolio
│   ├── clients-section.tsx # Clients overview
│   ├── press-mentions.tsx # Press mentions
│   ├── contact-form.tsx  # Contact form
│   └── investor-gate-modal.tsx # Access control
└── lib/                  # Utilities and configurations
    ├── actions.ts        # Server actions
    ├── sanity.ts         # Sanity CMS integration
    └── utils.ts          # Utility functions
```

## Pages

### Homepage (`/`)
- Hero section with company overview
- Product cards showcasing investment solutions
- Key statistics and achievements

### Psalion Yield (`/psalion-yield`)
- Fixed income and credit strategies
- Performance metrics and investment focus
- Professional investor access gate

### Psalion VC (`/psalion-vc`)
- Venture capital portfolio
- Investment focus and stage breakdown
- Portfolio company showcase

### Bespoke Services (`/bespoke-services`)
- Custom investment solutions
- Service offerings and process
- Client testimonials

### Clients (`/clients`)
- Global client base overview
- Regional distribution
- Client type breakdown

### Press (`/press`)
- Press mentions and media coverage
- Categorized news and analysis
- External links to full articles

### Contact (`/contact`)
- Contact form with validation
- Office information and map
- Response time expectations

### Legal Pages
- Privacy Policy (`/legal/privacy`)
- Terms of Service (`/legal/terms`)
- Cookie Policy (`/legal/cookies`)

## CMS Integration

The website includes Sanity CMS integration for dynamic content management:

### Content Types
- **Mention & Featured Content**: Press mentions with publisher logos, article titles, and optional interview information
- **Press Mentions**: News articles and media coverage
- **Portfolio Companies**: VC portfolio companies
- **Page Sections**: Customizable page content
- **Homepage Content**: Hero and product information

### Setup Sanity
1. Create a new Sanity project
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Initialize project: `sanity init`
4. Configure schemas in `src/lib/sanity.ts`
5. Deploy studio: `sanity deploy`

## Email Integration

Contact forms use Resend for email delivery:

1. Create a Resend account
2. Generate an API key
3. Add to environment variables
4. Configure sender domains

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Styling
- Modify `tailwind.config.js` for design system changes
- Update `src/app/globals.css` for global styles
- Component-specific styles use Tailwind classes

### Content
- Update static content in component files
- Use Sanity CMS for dynamic content
- Modify server actions for form handling

### Branding
- Update logo and colors in components
- Modify metadata in `layout.tsx`
- Customize email templates in `actions.ts`

## Performance

The website is optimized for performance:
- Next.js Image optimization
- Automatic code splitting
- Static generation where possible
- Optimized fonts and assets

## SEO

SEO features include:
- Proper meta tags and Open Graph
- Structured data markup
- Sitemap generation
- Optimized page titles and descriptions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Psalion Capital.

## Support

For technical support or questions, contact the development team.