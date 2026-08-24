# 🌌 UIverse — AI-Powered UI Generation Studio

> **UIverse** is an AI-assisted UI generation platform that transforms natural-language prompts, wireframes, and existing React/JSX code into **CMS-ready React UI sections** with stable IDs, editable content, responsive previews, and backend/database persistence.

Built for a **hackathon / vibe-coding workflow**, UIverse combines the simplicity of website builders like Wix and WordPress with an AI-powered developer workflow.

---

## ✨ What is UIverse?

UIverse allows users to describe a UI, provide a wireframe, or submit existing code and generate a structured React section.

The generated section is designed to be:

- ⚡ React-based
- 🎨 CMS-ready
- 🧩 Component-oriented
- 📱 Responsive
- 🆔 Stable-ID based
- 🗄️ MongoDB-backed
- ✏️ Editable without regenerating the component
- 🤖 AI-generated
- 🔄 Regeneratable
- 👀 Live-previewable

The UIverse studio uses a futuristic **space-themed interface**, while generated website sections can retain their own generated design.

---

# 🚀 Core Features

## 🤖 AI UI Generation

Generate UI sections from:

- Natural-language prompts
- Wireframe images
- Existing React/JSX code
- Combined inputs

Supported modes:

```text
Prompt
Wireframe
Code
Combine
```

## 🖼️ Wireframe-to-UI

Upload:

```text
PNG
JPG
JPEG
WebP
```

Maximum supported upload size:

```text
8 MB
```

## 💻 Existing Code Input

Paste React/JSX code as an additional generation/reference source.

## ✍️ Natural Language Prompting

Describe the desired UI in natural language and let the generation pipeline produce a CMS-ready section.

Example:

```text
Create a full-width fitness hero section for a brand called Pulse Fit.
Use a two-column desktop layout and stack the content on mobile.
Place an athlete image on the left and a badge, headline, description,
three statistics, and a CTA on the right.
Use a white background with red accents.
Make every editable value CMS-bound.
```

---

# 🎨 UIverse Design

The UIverse studio follows a premium futuristic **space theme**.

| Token | Value |
|---|---|
| Primary background | `#050507` |
| Secondary background | `#0A0A0F` |
| Panel | `#0F1017` |
| Elevated panel | `#151620` |
| Primary text | `#F5F7FA` |
| Muted text | `#8B91A1` |
| Primary accent | `#8B5CF6` |
| Secondary accent | `#22D3EE` |

The studio uses:

- Cosmic gradients
- Subtle stars
- Glass panels
- Soft glows
- Dark surfaces
- Rounded cards
- Smooth hover effects
- Minimal animations

The generated website preview is **not forced to use the studio's black theme**.

---

# 🏗️ Architecture

```text
                ┌───────────────────┐
                │      UIverse      │
                │   React Frontend  │
                └─────────┬─────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
         Wireframe      Code        Prompt
              │           │           │
              └───────────┼───────────┘
                          ▼
                   POST /api/generate
                          │
                          ▼
                 ┌──────────────────┐
                 │ Node.js Backend  │
                 └────────┬─────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
           Vision       Parser       LLM
              │           │           │
              └───────────┼───────────┘
                          ▼
                    Intermediate IR
                          │
                          ▼
                  Stable ID Allocation
                          │
                          ▼
                    JSX Generation
                          │
                          ▼
                     Validation
                          │
                          ▼
                      MongoDB
                    ┌─────┴─────┐
                    ▼           ▼
                 Sections    Elements
                    │           │
                    └─────┬─────┘
                          ▼
                    React Frontend
                          │
                          ▼
                     Redux CMS
                          │
                          ▼
                  Generated Section
                          │
                          ▼
                       Preview
                          │
                    CMS Editing
                          │
                          ▼
                PATCH /api/elements
                          │
                          ▼
                       MongoDB
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | UI framework |
| TypeScript | Type safety |
| Vite | Development/build tooling |
| Tailwind CSS | Styling |
| PrimeReact | UI components |
| Redux Toolkit | CMS/runtime state |
| React Router DOM | Routing |
| Lucide React | Icons |
| Axios / Fetch | API communication |

## Backend

The frontend is designed to communicate with the UIverse backend through REST APIs.

Expected backend stack:

```text
Node.js
Express.js
MongoDB
LLM integration
Vision processing
Generation/validation pipeline
```

---

# 📁 Frontend Structure

```text
client/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── app/
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── api/
│   │   ├── client.ts
│   │   ├── generation.api.ts
│   │   ├── sections.api.ts
│   │   ├── elements.api.ts
│   │   └── health.api.ts
│   ├── redux/
│   │   ├── cmsSlice.ts
│   │   ├── generationSlice.ts
│   │   └── sectionSlice.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── generator/
│   │   ├── preview/
│   │   ├── editor/
│   │   ├── sections/
│   │   ├── common/
│   │   └── ui/
│   ├── pages/
│   │   ├── GeneratePage.tsx
│   │   ├── PreviewPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── sections/
│   │   └── generated/
│   ├── hooks/
│   │   ├── useGeneration.ts
│   │   ├── useCms.ts
│   │   └── useResponsivePreview.ts
│   ├── types/
│   │   ├── section.ts
│   │   ├── element.ts
│   │   ├── generation.ts
│   │   └── cms.ts
│   ├── utils/
│   │   ├── getImage.ts
│   │   ├── sanitizer.ts
│   │   ├── cssOverlay.ts
│   │   ├── responsive.ts
│   │   └── sectionContrast.ts
│   └── data/
│       └── demo.ts
├── public/
├── .env.example
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

# 🔗 Routes

| Route | Purpose |
|---|---|
| `/` | Redirects to generator |
| `/generate` | AI generation studio |
| `/preview/:pageName` | Generated section preview |
| `/sections` | Optional generated sections gallery |
| `/settings` | Optional settings |
| `*` | Not found page |

---

# 🔌 API Contract

The frontend expects:

```text
GET    /api/health
POST   /api/generate
GET    /api/sections
GET    /api/sections/:sectionId
GET    /api/elements
GET    /api/elements?sectionId=:sectionId
GET    /api/elements?pageName=:pageName
PATCH  /api/elements/:fieldId
POST   /api/sections/:sectionId/regenerate
```

---

# 🧬 CMS Data Flow

Persisted data follows:

```text
MongoDB
   ↓
Backend API
   ↓
React API Service
   ↓
Redux CMS State
   ↓
Generated React Section
   ↓
Preview
```

Editing follows:

```text
CMS Editor
    ↓
Redux update
    ↓
PATCH /api/elements/:fieldId
    ↓
Backend validation
    ↓
MongoDB
    ↓
Redux synchronization
    ↓
Live Preview
```

Normal CMS editing does **not** regenerate the entire JSX component.

---

# 🆔 Stable IDs

The backend/database owns:

```text
sectionId
fieldId
nested field IDs
```

The frontend must never create persistent IDs using:

```js
Math.random()
```

These IDs connect:

```text
Generated UI
      ↓
CMS field
      ↓
MongoDB element
      ↓
Redux state
      ↓
Rendered DOM
```

---

# 🧩 CMS Element Types

UIverse supports:

```text
Image
Text
Textfield
Button
Cards
```

Element records contain the relevant fields:

```text
sectionId
elementName
fieldId
content
contentType
css
loop
projectName
pageName
```

---

# 🃏 Cards

Cards use a loop structure:

```json
{
  "contentType": "Cards",
  "loop": [
    {
      "value": "1000+",
      "label": "Community Members"
    },
    {
      "value": "40+",
      "label": "Fitness Programmes"
    },
    {
      "value": "150+",
      "label": "Fitness Channels"
    }
  ]
}
```

Nested card fields also use stable IDs.

---

# 🖼️ Image Handling

Supported sources include:

```text
Uploaded files
Relative storage paths
Blob URLs
Default placeholders
```

Example fallback:

```text
default/images/hero-placeholder.jpg
```

Storage URL is configured with:

```env
VITE_STORAGE_URL=http://localhost:4000/storage/
```

---

# 🎛️ Live CMS Editing

Users can edit:

```text
Text
Textfield
Button labels
Images
Cards
CSS overrides
```

Example:

```text
CHALLENGE YOUR LIMITS
        ↓
TRAIN WITHOUT LIMITS
```

The frontend persists the change through:

```http
PATCH /api/elements/:fieldId
```

and updates the preview without regenerating the section.

---

# 📱 Responsive Preview

Supported modes:

```text
Desktop
Tablet
Mobile
```

Approximate preview widths:

```text
Desktop → 1280px
Tablet  → 768px
Mobile  → 375px
```

Zoom:

```text
50% – 150%
```

---

# 🔄 Generation Lifecycle

```text
User Input
    ↓
Input Validation
    ↓
Upload / FormData
    ↓
POST /api/generate
    ↓
AI / Vision / Parser
    ↓
Intermediate Representation
    ↓
Stable ID Allocation
    ↓
JSX Generation
    ↓
Validation
    ↓
MongoDB Persistence
    ↓
Generation Response
    ↓
Frontend Preview
```

---

# ♻️ Regeneration

Endpoint:

```http
POST /api/sections/:sectionId/regenerate
```

After regeneration the frontend:

1. Receives the generated section.
2. Refreshes metadata.
3. Refreshes elements.
4. Hydrates Redux.
5. Updates the preview.

The frontend does not allocate persistent IDs.

---

# ⚙️ Installation

## Prerequisites

Install:

- Node.js
- npm
- MongoDB
- Git

The UIverse backend must also be available.

## Clone

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd UIverse
```

If frontend is inside a client directory:

```bash
cd client
```

## Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create:

```text
.env
```

Add:

```env
VITE_API_URL=http://localhost:4000/api
VITE_STORAGE_URL=http://localhost:4000/storage/
```

Never expose:

```text
MONGODB_URI
LLM_API_KEY
LLM_BASE_URL
```

to the frontend.

---

# ▶️ Run

```bash
npm run dev
```

Open:

```text
http://localhost:5173/generate
```

Backend health check:

```text
http://localhost:4000/api/health
```

---

# 🏗️ Production Build

```bash
npm run build
```

Then:

```bash
npm run preview
```

---

# 🔒 Security

UIverse follows these rules:

- No MongoDB credentials in frontend
- No LLM API keys in frontend
- No direct MongoDB connection
- No arbitrary `eval()`
- No `new Function()` for generated JSX
- No arbitrary JavaScript execution
- Validate uploaded files
- Restrict file types and size
- Sanitize editable HTML
- Backend remains the final security boundary

Generated JSX should only be rendered through a trusted/validated component pipeline.

---

# ♿ Accessibility

The interface should support:

- Keyboard navigation
- Visible focus states
- Accessible labels
- Semantic buttons
- Image alt text
- Form labels
- Error messages
- Reduced motion
- Responsive layouts

---

# 🧪 Testing

Recommended tests:

```text
Generator
Wireframe upload
Prompt input
Code input
Combined mode
CMS hydration
Element editing
CSS editing
Cards rendering
Image fallback
Responsive preview
API errors
Regeneration
```

Critical integration flow:

```text
POST /api/generate
        ↓
GET /api/elements
        ↓
Render preview
        ↓
PATCH /api/elements/:fieldId
        ↓
Update Redux
        ↓
Update preview
```

---

# 🏆 Hackathon Demo Flow

### 1. Prompt → UI

```text
Natural language
        ↓
Generated React section
```

### 2. Wireframe → UI

```text
Wireframe
        ↓
AI interpretation
        ↓
Generated layout
```

### 3. Stable CMS IDs

Show:

```text
fieldId
elementName
contentType
```

### 4. Live Editing

Change a headline and show the preview update without regenerating.

### 5. Responsive Preview

Switch:

```text
Desktop
→ Tablet
→ Mobile
```

### 6. Regeneration

Show:

```text
Variation 1
→ Regenerate
→ Variation 2
```

---

# 🧭 Development Principles

## Do

```text
Use TypeScript
Keep API logic separate
Use Redux for CMS runtime state
Use stable backend IDs
Keep components reusable
Handle loading/error states
Keep generated UI isolated
```

## Do not

```text
Connect frontend directly to MongoDB
Generate persistent IDs in React
Expose API secrets
Use eval()
Hard-code production API URLs
Regenerate JSX for normal CMS edits
Create fake successful API responses
```

---

# 📌 Project Status

UIverse is being developed as a **hackathon project** focused on an end-to-end AI-powered UI generation workflow.

Target pipeline:

```text
Prompt / Wireframe / Code
        ↓
AI Generation
        ↓
React UI
        ↓
CMS Binding
        ↓
MongoDB
        ↓
Live Editing
        ↓
Responsive Preview
```

---

# 📄 Related Documentation

Recommended repository files:

```text
README.md
UIverse_Frontend.md
UIverse_Backend.md
Database.md
SRS.pdf
```

Keep frontend, backend, and database API contracts synchronized.

---

# 🌌 UIverse

### **Describe it. Generate it. Edit it. Ship it.**

```text
       ✦
   .       .
      UIverse
   .   ✦       .
       ╱╲
      ╱  ╲
     ╱____╲

 AI → React → CMS → Preview
```

