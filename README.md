# Mark Daniel Ferdinandaz (MXRKDXNL) — Cybersecurity Portfolio

A static, modern, and high-performance cybersecurity portfolio landing site and case study showcase for **Mark Daniel Ferdinandaz** (known professionally as **Daniel** / **MXRKDXNL**), final-year BSc (Hons) Cyber-Security student at Staffordshire University (via APIIT Sri Lanka).

---

## 🛡️ Identity & Verified Scope

- **Preferred Introduction Name:** Mark
- **Full Legal Name:** Mark Daniel Ferdinandaz
- **Online Identity:** MXRKDXNL
- **Domain:** [mxrkdxnl.com](https://mxrkdxnl.com)
- **Location:** Negombo, Sri Lanka
- **Current Academic Status:** Final-year BSc (Hons) Cyber-Security student (Staffordshire University | APIIT Sri Lanka)
- **Target Roles:** Entry-level Cybersecurity Analyst, Junior SOC Analyst, SOC Intern opportunities

*Note on Professional Ethics:* This portfolio strictly uses verified facts and does not fabricate certifications, employment titles, client testimonials, or security guarantees.

---

## 🚀 Tech Stack

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS (custom `#0C0C0C` dark theme, Google Font *Kanit*)
- **Routing:** React Router v7 (`react-router-dom`)
- **Animations:** Framer Motion (magnetic hover tilt, smooth fade-in reveals)
- **Icons:** Lucide React
- **Architecture:** 100% static client-side single page application (SPA), no external database or server required.

---

## 📁 Project Structure

```text
├── public/
│   ├── favicon.svg          # Custom MD monogram SVG favicon
│   ├── mark-portrait.png    # Transparent 3D avatar of Mark
│   ├── robots.txt           # Crawler instructions
│   └── sitemap.xml          # Search engine sitemap
├── src/
│   ├── assets/
│   │   └── mark-portrait.png
│   ├── components/
│   │   ├── FadeIn.tsx       # Framer Motion view-transition wrapper
│   │   ├── Footer.tsx       # Verified contact info & links
│   │   ├── Magnet.tsx       # Mouse-tracking magnetic avatar effect
│   │   ├── Navbar.tsx       # Responsive navigation with active route highlights
│   │   └── ScrollToTop.tsx  # Scroll position reset on navigation
│   ├── data/
│   │   └── portfolioData.ts # Central source of truth for all content
│   ├── pages/
│   │   ├── HomePage.tsx     # Hero section with 3D avatar & focus preview
│   │   ├── AboutPage.tsx    # Education, experience, skills & work philosophy
│   │   ├── ProjectsPage.tsx # Project listings and status
│   │   ├── AltriumCaseStudyPage.tsx # Detailed case study & QA audit notes
│   │   ├── LabsPage.tsx     # Lab write-up framework & draft entries
│   │   ├── ContactPage.tsx  # Direct email, location & channels
│   │   └── NotFoundPage.tsx # Custom 404 page
│   ├── App.tsx              # Router configuration
│   ├── index.css            # Global styles, Kanit font, .hero-heading gradient
│   └── main.tsx             # React entry point
└── README.md
```

---

## 💻 Local Development

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### 2. Installation
Clone or navigate to the repository folder:
```bash
cd MxrkDxnl
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

---

## 📦 Production Build

To create an optimized production bundle:
```bash
npm run build
```
The compiled, minified output will be created in the `dist/` directory.

You can preview the production build locally with:
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

Because this portfolio is built as a static Single Page Application (SPA), it can be deployed on any modern static hosting provider with zero monthly cost:

### Deploy to Vercel (Recommended)
1. Link your repository on [vercel.com](https://vercel.com) or run `npx vercel`.
2. The included [`vercel.json`](file:///c:/Users/user/Desktop/MxrkDxnl/vercel.json) comes pre-configured with:
   - Full OWASP Security Headers (HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Permissions-Policy).
   - SPA deep link routing rewrites (`/(.*)` -> `/index.html`).

### Deploy to Netlify
1. Connect via Git on [netlify.com](https://netlify.com) or drag-and-drop the build output.
2. The pre-configured [`public/_headers`](file:///c:/Users/user/Desktop/MxrkDxnl/public/_headers) and [`public/_redirects`](file:///c:/Users/user/Desktop/MxrkDxnl/public/_redirects) automatically apply security headers and client-side routing on publish.

### Deploy to GitHub Pages
1. Install `gh-pages`: `npm i -D gh-pages`
2. Add a `deploy` script to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run `npm run deploy`.

---

## 🔒 Security Architecture (RFC 9116 & OWASP)
- **RFC 9116 Compliance**: Security disclosure policy available at `/.well-known/security.txt`.
- **Content Security Policy (CSP)**: Strict origin whitelisting restricting untrusted script execution.
- **Clickjacking Protection**: `X-Frame-Options: SAMEORIGIN` and CSP `frame-ancestors 'self'` preventing unauthorized external iframe embedding while allowing internal Operator previews.
- **MIME Sniffing Prevention**: `X-Content-Type-Options: nosniff`.
- **Reverse Tabnabbing Safeguards**: All outbound links enforce `rel="noopener noreferrer"`.
- **Form Sanitization**: Client-side input bounds and encoding on inquiries.

---

## 📝 Information Still Required from Mark

With GitHub, LinkedIn, social profiles, campus logos, and your official CV PDF now successfully integrated, the remaining items to finalize are:

1. **Altrium Project Assets**:
   - Screenshots of the application interface (dashboard, review forms, PDP/PIP)
   - Repository URL (if public/shareable)
   - Live demo URL (if hosted)
2. **Altrium Project Contribution Confirmation**:
   - Confirmation on authorship attribution vs. confirmed Sprint 1 Scrum Master / QA deliverables.
3. **Cybersecurity Lab Details**:
   - Specific write-up texts, findings, tools used, and flags captured for the DC 1–9 series and CyberSploit labs to publish beyond draft status.

---

## 📄 License
© 2026 Mark Daniel Ferdinandaz (MXRKDXNL). All rights reserved.
