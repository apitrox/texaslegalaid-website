# TexasLegalAid Application Website

## Project Overview

**TexasLegalAid** is a mobile-first, AMP-compatible national legal aid intake portal that connects individuals seeking legal assistance with appropriate legal aid providers. The platform serves as both a public-facing intake system and a secure provider portal.

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
- XML sitemap generation
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

## Site Architecture & Pages

### Public Pages

#### 1. Homepage (`/`)
- **Hero Section**: Compelling headline, single clear CTA "Get Legal Help Now"
- **Trust Indicators**: Partner logos, statistics (X people helped, X providers)
- **How It Works**: 3-step visual process
- **FAQ Accordion**: Common questions (AMP-accordion)
- **Footer**: Resources, accessibility statement, privacy policy

#### 2. Intake Flow (`/get-help`)
- **Conversational AI Interface**
  - Chat-style UI optimized for mobile
  - Progressive disclosure — one question at a time
  - Quick-reply buttons for common responses
  - Text input for open-ended questions
  - Real-time eligibility feedback
  - Save & resume capability (via secure link/code)

- **Intake Data Collected**:
  - Geographic location (county/state)
  - Legal issue category (family, housing, consumer, immigration, etc.)
  - Case urgency/status (pre-litigation, active case, emergency)
  - Income/household for eligibility
  - Preferred language
  - Contact information

#### 3. My Cases (`/my-cases`)
- **Authentication**: Passwordless login (magic link or SMS code)
- **Dashboard**: List of referrals, status updates, provider contact info
- **Timeline view**: Track progress through referral to resolution
- **Document upload**: Secure file submission to providers
- **Messaging**: In-app communication with assigned provider

#### 4. About / Resources (`/about`, `/resources`)
- Mission and history
- Legal aid provider directory (searchable)
- Self-help resources and legal information
- Language and accessibility options

#### 5. Provider Portal Landing (`/providers`)
- Value proposition for legal aid organizations
- Registration CTA
- Testimonials from partner organizations

### Secure Provider Portal (`/portal/*`)

#### Provider Dashboard (`/portal/dashboard`)
- Pending referrals requiring action
- Active case statistics
- Capacity overview
- Quick actions

#### Referral Management (`/portal/referrals`)
- Incoming referral queue
- Accept/decline with reason
- Client contact information
- Case notes and history
- Status updates

#### Profile & Criteria (`/portal/profile`)
- Organization information
- Service area (geographic boundaries via map interface)
- Legal issue categories served
- Eligibility criteria accepted
- Capacity settings (max cases, pause referrals)
- Operating hours and contact methods

#### Team Management (`/portal/team`)
- Staff accounts with role-based permissions
- Assignment rules
- Activity logs

---

## Conversational AI Specification

### Personality & Tone
- **Name**: Consider a friendly name or keep generic ("Legal Aid Assistant")
- **Tone**: Warm, patient, encouraging, clear
- **Reading level**: 6th-8th grade (accessible to all literacy levels)
- **Empathy triggers**: Recognize stress indicators, offer reassurance

### Conversation Flow Architecture
```
START
  ├── Welcome & language preference
  ├── Geographic location
  │     └── Validate service area
  ├── Legal issue identification
  │     ├── Guided categories with examples
  │     └── "Tell me more" for complex situations
  ├── Urgency assessment
  │     └── Emergency routing if needed
  ├── Eligibility screening
  │     ├── Income questions
  │     └── Household composition
  ├── Summary & confirmation
  └── Referral generation
        ├── Match with providers
        ├── Present options (if multiple)
        └── Submit referral
```

### Error Handling
- Unclear inputs: "I want to make sure I understand. Could you tell me more about..."
- Out of scope: "I'm not able to help with [X], but here are some resources..."
- No matches: "I couldn't find a provider for your specific situation, but let me suggest..."

### Data Privacy in Chat
- No PII displayed after submission
- Session-based until account creation
- Clear data retention disclosures

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

## Security Considerations

### Public Intake
- Rate limiting on submissions
- CAPTCHA alternative (honeypot + timing)
- Input sanitization
- No PII in URLs or logs

### Authenticated Areas
- Passwordless authentication (magic links, SMS OTP)
- Session management with secure cookies
- Role-based access control (RBAC)
- Audit logging for all actions
- Data encryption at rest and in transit

### Provider Portal
- Multi-factor authentication option
- IP allowlisting option for organizations
- Session timeout (30 min inactivity)
- Secure file handling for documents

---

## Prototype Scope (Phase 1)

### Include
- [ ] Responsive homepage with all sections
- [ ] Conversational AI intake flow (functional prototype)
- [ ] My Cases dashboard (UI mockup with sample data)
- [ ] Provider portal login and dashboard (UI mockup)
- [ ] Provider profile/criteria page (functional form)
- [ ] AMP validation on all public pages
- [ ] Full SEO implementation
- [ ] Accessibility compliance

### Defer to Phase 2+
- [ ] Real authentication system
- [ ] Database integration
- [ ] Actual AI/NLP backend
- [ ] Payment processing (if applicable)
- [ ] Provider team management
- [ ] Document upload functionality
- [ ] Real-time messaging
- [ ] Analytics dashboard

---

## File Structure

```
mylegalaid/
├── index.html                 # Homepage (AMP)
├── get-help.html              # Intake flow (AMP)
├── my-cases.html              # User dashboard
├── providers.html             # Provider landing (AMP)
├── about.html                 # About page (AMP)
├── resources.html             # Resources (AMP)
├── portal/
│   ├── index.html             # Provider login
│   ├── dashboard.html         # Provider dashboard
│   ├── referrals.html         # Referral management
│   └── profile.html           # Provider profile
├── css/
│   ├── tailwind.min.css       # Tailwind build
│   ├── custom.css             # Custom styles
│   └── amp-custom.css         # AMP-specific styles
├── js/
│   ├── app.js                 # Main application
│   ├── chat.js                # Conversational AI
│   └── portal.js              # Provider portal
├── images/
│   ├── hero/
│   ├── icons/
│   └── illustrations/
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
├── robots.txt
└── sitemap.xml
```

---

## Image Requirements

### Hero Images (High Priority)
1. **Homepage hero**: Diverse family receiving help at legal aid office — warm, hopeful
2. **Get Help hero**: Person on phone/device with relieved expression
3. **Provider hero**: Legal professionals collaborating, mission-driven energy

### Illustrations Needed
1. How it works — 3-step process icons
2. Legal category icons (family, housing, employment, etc.)
3. Empty states for dashboards
4. Success/confirmation celebration

### Placeholder Strategy
- Use Unsplash/Pexels with proper attribution for prototype
- Note: Replace with custom photography for production
- Optimize all images: WebP format, responsive srcset, lazy loading

---

## Success Metrics

### User Experience
- Intake completion rate > 70%
- Time to complete intake < 5 minutes
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

---

## Prompt Summary

> Build a mobile-first, AMP-compatible national legal aid intake portal called MyLegalAid. The site connects people seeking legal help with appropriate providers through a conversational AI intake process. Include: (1) Public pages — homepage, AI-driven intake flow, user dashboard for tracking cases, resources; (2) Secure provider portal — dashboard, referral management, profile/criteria settings. Use Tailwind CSS and Bootstrap, prioritize 90% mobile usage, implement full SEO with Schema.org markup, ensure WCAG 2.1 AA accessibility, and create a "calm authority" design aesthetic with trust blue and warm gold colors. Phase 1 is a functional prototype with stellar UX and realistic interactions, deferring backend integration. All images should feel authentic and hopeful, never generic stock.
