# TexasLegalAid Application Website

## Project Overview

**TexasLegalAid** is a mobile-first, AMP-compatible national legal aid intake portal that connects individuals seeking legal assistance with appropriate legal aid providers. The platform serves as both a public-facing intake system and a secure provider portal.

**Your Role** You are a world-class programmer and software engineer who is an expert with all the languages, systems and tool used by the TexasLegalAid Application Website. You are detail-oriented, always test your work, consider the full scope of the application and changes, and rather than guess at an answer you ask questions when you don’t know something.



---

## Core Mission & Purpose

TexasLegalAid democratizes access to justice by:
1. **Simplifying intake** — Providing people in need of Legal Aid a single point of entry into the legal aid provider system
1. **Integrate AI** — Using conversational AI to guide users through eligibility determination available 24/7 in many languages
2. **Intelligent matching** — Connecting clients with providers based on geography, legal issue, case status, and provider capacity
3. **Continuous access** — Allowing users to track referrals and case status over time
4. **Provider empowerment** — Giving legal aid organizations tools to define their client profiles and manage referrals

---

## Technical Requirements

### Mobile-First Architecture
- **90% mobile usage expected** — Every decision prioritizes mobile experience
- Touch-friendly interface elements (minimum 44px tap targets)
- Thumb-zone optimization for primary actions
- Swipe gestures for navigation where appropriate
- Progressive Web App (PWA) capabilities for offline access and home screen installation
- WCAG 2.1 AA compliant

### Framework & Styling
- **Tailwind CSS** for utility-first responsive design
- **Bootstrap 5** grid system and components where beneficial
- CSS custom properties for theming and consistency
- Mobile breakpoints: 320px, 375px, 414px, 768px, 1024px+

### AMP Compatibility
- Full AMP HTML compliance for all public-facing pages
- AMP components: `amp-form`, `amp-bind`, `amp-list`, `amp-carousel`, `amp-accordion`
- AMP-compatible conversational interface using `amp-bind` state management
- Valid AMP cache serving for Google Search integration
- Fallback progressive enhancement for non-AMP features

### SEO Implementation
- Semantic HTML5 structure
- Schema.org structured data (LegalService, Organization, FAQPage, HowTo)
- Open Graph and Twitter Card meta tags
- Canonical URLs and hreflang for future localization
- XML sitemap generation, updated as appropriate whenever there is an update to the site
- sitemap.html page containing a link to every other page on the site and updated as appropriate whenever there is an update to the site, with the exception of the `../portal/..` pages, Privacy Policy page, and Terms of Use page
- robots.txt configuration
- Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Performance Targets
- First Contentful Paint: < 1.5s on 3G
- Time to Interactive: < 3.5s on 3G
- Total page weight: < 500KB initial load
- Lazy loading for below-fold content and images

---

## Design System & Aesthetics

### Design Philosophy
**"Accessible Authority"** — Trustworthy, approachable, and empowering. Users seeking legal help are often stressed and vulnerable. The design must feel:
- **Calm** — Reduce anxiety with clear hierarchy and breathing room
- **Trustworthy** — Professional enough to handle serious matters
- **Human** — Warm and supportive, not cold or bureaucratic
- **Clear** — Zero confusion about next steps

### Color Palette
```css
:root {
  /* Primary - Deep Trust Blue */
  --color-primary-900: #0D1B2A;
  --color-primary-700: #1B3A4B;
  --color-primary-500: #2D5A7B;
  --color-primary-300: #5B8FB9;
  --color-primary-100: #B8D4E8;
  
  /* Secondary - Warm Support Gold */
  --color-secondary-500: #D4A853;
  --color-secondary-300: #E8C97D;
  --color-secondary-100: #FBF3E0;
  
  /* Semantic Colors */
  --color-success: #2E7D32;
  --color-warning: #ED6C02;
  --color-error: #D32F2F;
  --color-info: #0288D1;
  
  /* Neutrals */
  --color-neutral-900: #1A1A2E;
  --color-neutral-700: #4A4A5C;
  --color-neutral-500: #6B6B7D;
  --color-neutral-300: #B8B8C4;
  --color-neutral-100: #F5F5F7;
  --color-white: #FFFFFF;
}
```

### Typography
- **Display/Headlines**: "Source Serif 4" — Elegant, readable, authoritative
- **Body/UI**: "IBM Plex Sans" — Humanist, accessible, excellent mobile rendering
- **Monospace (if needed)**: "IBM Plex Mono" — For case numbers, reference codes

### Typography Scale (Mobile-First)
```css
--text-xs: 0.75rem;    /* 12px - captions */
--text-sm: 0.875rem;   /* 14px - secondary text */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.125rem;   /* 18px - emphasized body */
--text-xl: 1.25rem;    /* 20px - section headers */
--text-2xl: 1.5rem;    /* 24px - page headers */
--text-3xl: 2rem;      /* 32px - hero headlines */
--text-4xl: 2.5rem;    /* 40px - display (desktop only) */
```

### Imagery Guidelines
- **Hero images**: Diverse, real people (not stock-looking) in professional but warm settings
- **Illustrations**: Custom line-art style showing legal concepts, pathways, connections
- **Icons**: Phosphor Icons or Heroicons — consistent stroke weight, filled for primary actions
- **Photography style**: Natural lighting, diverse representation, authentic moments of support and relief

### Motion & Interaction
- Subtle entrance animations (fade-up, 200-300ms, ease-out)
- Micro-interactions on buttons (scale 1.02 on hover, tactile feedback on mobile)
- Progress indicators with smooth transitions
- Loading states that feel responsive (skeleton screens, not spinners)

---

## Accessibility Requirements (WCAG 2.1 AA+)

- Color contrast minimum 4.5:1 for text, 3:1 for large text and UI
- Full keyboard navigation
- Screen reader optimized (ARIA labels, live regions for chat)
- Focus indicators visible
- Reduced motion option (`prefers-reduced-motion`)
- Text resizable to 200% without loss
- Touch targets minimum 44x44px
- Captions for any video content
- Plain language throughout

---

## Success Metrics

### User Experience
- Mobile usability score > 95 (Lighthouse)
- Accessibility score > 95 (Lighthouse)

### Technical
- AMP validation: 0 errors
- SEO score > 95 (Lighthouse)
- Performance score > 90 (Lighthouse)
- Core Web Vitals: All "Good"

### Business
- Referral acceptance rate (provider metric)
- Time to first provider response
- Client satisfaction rating

---

## Development Notes

### Testing Requirements
- Cross-browser: Chrome, Safari, Firefox, Edge (mobile & desktop)
- Device testing: iPhone SE, iPhone 14, Pixel 7, Samsung Galaxy, iPad
- Screen reader testing: VoiceOver, TalkBack
- AMP validation on every page
- Lighthouse audits before delivery

### Code Quality
- Semantic HTML5
- BEM or utility-first CSS methodology
- Commented code for complex sections
- Consistent formatting (Prettier)
- Valid W3C HTML