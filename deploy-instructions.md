# Cloudflare Pages Deployment Instructions

## Prerequisites
1. Cloudflare account with domain `fijab.se` configured
2. GitHub repository connected to Cloudflare Pages
3. Domain DNS pointing to Cloudflare

## Automated Deployment Steps

### 1. Connect Repository to Cloudflare Pages
```bash
# Go to Cloudflare Dashboard > Pages
# Click "Create a project" > "Connect to Git"
# Select your GitHub repository: pontus/fijab.se
```

### 2. Configure Build Settings
```
Framework preset: Angular
Build command: npm run build_localize
Build output directory: dist/fijab-web/browser
Root directory: /
```

### 3. Environment Variables
Set these in Cloudflare Pages settings:
```
NODE_VERSION=18
NPM_FLAGS=--production=false
```

### 4. Custom Domain Setup
```
# In Cloudflare Pages > Custom domains
# Add: fijab.se
# Add: www.fijab.se
```

## Manual Deployment (Alternative)

### Using Wrangler CLI
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build_localize

# Deploy to Cloudflare Pages
wrangler pages publish dist/fijab-web/browser --project-name=fijab-se
```

## SEO & Performance Optimizations

### Cloudflare Settings
1. **Speed > Optimization**
   - Auto Minify: CSS, HTML, JavaScript ✓
   - Brotli ✓
   - Early Hints ✓

2. **Caching > Configuration**
   - Browser Cache TTL: 4 hours
   - Cloudflare Cache TTL: Respect existing headers

3. **Security > Settings**
   - Security Level: Medium
   - Challenge Passage: 30 minutes

### Page Rules for SEO
```
Pattern: fijab.se/*
Settings:
- Always Use HTTPS: On
- Browser Cache TTL: 4 hours
- Cache Level: Standard

Pattern: *.fijab.se/blog/*
Settings:
- Browser Cache TTL: 4 hours
- Edge Cache TTL: 2 hours
```

## Performance Monitoring

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Expected Performance (Swedish market)
- **Mobile PageSpeed**: 85+ score
- **Desktop PageSpeed**: 90+ score
- **TTI (Time to Interactive)**: < 5s

## Revenue Tracking Setup

### 1. Google Analytics 4
Add to `src/index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Conversion Goals
- Contact form submissions
- Phone clicks
- Email clicks  
- Blog article engagement

### 3. Revenue Attribution
Track these events for monetization:
```javascript
// Contact form submission
gtag('event', 'generate_lead', {
  'value': 1500, // Average project value
  'currency': 'SEK'
});

// Phone call
gtag('event', 'phone_call', {
  'value': 2000,
  'currency': 'SEK'
});
```

## Swedish SEO Specific Settings

### hreflang Implementation
Add to Angular components:
```html
<link rel="alternate" hreflang="sv" href="https://fijab.se/" />
<link rel="alternate" hreflang="en" href="https://fijab.se/en/" />
<link rel="alternate" hreflang="x-default" href="https://fijab.se/" />
```

### Local Business Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "FIJAB - Webbyrå i Östersund",
  "description": "Digital byrå specialiserad på webbdesign, SEO och marknadsföring i Jämtland",
  "url": "https://fijab.se",
  "telephone": "+46-XXX-XXX-XX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street",
    "addressLocality": "Östersund", 
    "addressRegion": "Jämtland",
    "postalCode": "83XXX",
    "addressCountry": "SE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 63.1792,
    "longitude": 14.6357
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "15000-50000 SEK"
}
```

## Post-Deployment Checklist
- [ ] Domain resolves to Cloudflare Pages
- [ ] SSL certificate active
- [ ] _redirects file working for SPA routing
- [ ] Blog articles accessible
- [ ] Contact forms functional
- [ ] Google Analytics tracking
- [ ] Mobile responsiveness verified
- [ ] Swedish content displaying correctly
- [ ] Site speed > 85 on PageSpeed Insights