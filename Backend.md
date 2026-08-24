# UIverse Backend — Complete Backend Prompt

> **Project:** UIverse  
> **Purpose:** AI-powered UI generation and CMS-compatible React section generation  
> **Backend:** Node.js + TypeScript + Express.js  
> **Database:** MongoDB + Mongoose  
> **Frontend:** React + Redux  
> **Theme:** Space / Black / Modern  
> **Source of Truth:** UIverse SRS

---

# 1. Master Backend Instruction

You are the senior backend engineer for a hackathon application called **UIverse**.

You are building the backend specifically for the UIverse SRS. The SRS is the source of truth. Do not invent unrelated functionality or change the terminology and contracts defined by the SRS.

## Technology

Use:

- Node.js 18+
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Multer for file uploads
- Zod for validation
- Babel/parser or another JSX-capable AST parser
- Provider-agnostic LLM service

The backend must work without an LLM API key by using a deterministic fallback/template generation path where possible, or by returning a controlled generation error.

## Core purpose

UIverse accepts:

1. Wireframe image
2. Existing React/JSX code
3. Natural-language prompt
4. Combination of multiple inputs

The backend generates:

1. React section component
2. Section metadata
3. Element records
4. CMS-compatible stable IDs
5. Intermediate Representation (IR)
6. Preview-compatible API response

## Generation modes

Support:

- `wireframe`
- `code`
- `prompt`
- `combined`

At minimum, prompt mode must work. Wireframe and code mode should also work.

## Required APIs

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

## Public identifiers

`sectionId`:

- 10-digit numeric string

`fieldId`:

- 10-digit numeric string

Never use MongoDB ObjectId as the public UIverse identifier.

Never generate IDs with `Math.random()`.

Never let the LLM be authoritative for IDs.

The backend owns all IDs.

IDs must be persisted and stable.

## Section contract

Every section must support:

```text
sectionName
sectionId
variations
path
sectionStatus
wireframes
platform
pageName
isGenerated
cardGridColumns
cardLayoutMode
sectionTextMode
sectionColor
paddings
```

## Element contract

Every element must support:

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

`contentType` must be one of:

```text
Image
Text
Textfield
Button
Cards
```

## Cards

Cards use `loop`.

Each loop item may contain:

```text
field1
fieldType1
fieldId1
field2
fieldType2
fieldId2
```

and may contain additional field/type/id pairs.

Nested field IDs must be unique and persisted.

## Redux compatibility

The backend must support the frontend structure:

```text
state.cms.allSections[pageName][fieldId]
state.cms.allSectionsCss[pageName][fieldId]
state.cms.sectionNames[sectionId]
```

## Security

Never:

- `eval()`
- `new Function()`
- execute user-pasted JSX
- execute generated JSX on the server

Existing React code must be parsed as text/AST.

Sanitize CMS HTML.

Allowed HTML:

```text
b
i
br
span
strong
em
```

Reject/remove:

```text
script
iframe
object
embed
javascript:
onclick
onerror
onload
```

## Reliability

If generation fails:

- Do not persist partial sections.
- Do not create orphan elements.
- Do not consume/reuse IDs incorrectly.

Use:

```text
400 INVALID_INPUT
413 FILE_TOO_LARGE
422 GENERATION_FAILED
500 INTERNAL_ERROR
```

## Privacy

Use fictional demo content only.

Example:

```text
Pulse Fit
sample-brand
```

Do not store real customer information or API keys.

---

# 2. Backend Architecture

Create:

```text
server/
  src/
    app.ts
    server.ts

    config/
      env.ts

    database/
      connection.ts

    routes/
      health.routes.ts
      generate.routes.ts
      sections.routes.ts
      elements.routes.ts

    controllers/
      health.controller.ts
      generate.controller.ts
      sections.controller.ts
      elements.controller.ts

    services/
      generation/
      sections/
      elements/
      storage/
      validation/

    repositories/
      section.repository.ts
      element.repository.ts
      counter.repository.ts

    models/
      section.model.ts
      element.model.ts
      counter.model.ts
      generationJob.model.ts

    middleware/
      error.middleware.ts
      upload.middleware.ts
      validation.middleware.ts

    validators/
      generate.validator.ts
      section.validator.ts
      element.validator.ts

    utils/
      id-generator.ts
      sanitizer.ts
      response.ts

    types/
      section.types.ts
      element.types.ts
      generation.types.ts
      ir.types.ts

    generators/
      prompt.generator.ts
      code.generator.ts
      wireframe.generator.ts
      combined.generator.ts

    parsers/
      jsx.parser.ts
      wireframe.parser.ts

    synthesizer/
      component.synthesizer.ts

    seed/
      seed.ts

  uploads/
    wireframes/

  storage/
    default/
      images/

  tests/

  .env.example
  package.json
  tsconfig.json
```

Do not put business logic inside Express route files.

---

# 3. Environment Configuration

Create:

```text
src/config/env.ts
```

Use:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/hackathon_ui_gen
LLM_API_KEY=
LLM_BASE_URL=
FRONTEND_URL=http://localhost:5173
VITE_STORAGE_URL=http://localhost:4000/storage/
NODE_ENV=development
```

Use `dotenv`.

Validate environment variables at startup.

The server must start without `LLM_API_KEY`.

Never expose:

- MongoDB URI
- LLM API key
- secrets
- stack traces

Create `.env.example`.

Never commit `.env`.

---

# 4. MongoDB Connection

Create:

```text
src/database/connection.ts
```

Implement:

```text
connectDatabase()
disconnectDatabase()
```

Use Mongoose.

Configure sensible:

```text
serverSelectionTimeoutMS
connectTimeoutMS
```

Log:

```text
MongoDB connected
MongoDB disconnected
MongoDB connection error
```

Never log credentials.

Implement graceful shutdown for:

```text
SIGINT
SIGTERM
```

---

# 5. Section Model

Create the Mongoose `sections` collection.

Fields:

```text
sectionName
sectionId
variations
path
sectionStatus
wireframes
platform
createdAt
updatedAt
pageName
isGenerated
cardGridColumns
cardLayoutMode
sectionTextMode
sectionColor
paddings
```

Rules:

```text
sectionId:
required
unique
10 numeric characters
immutable
```

`sectionStatus`:

```text
Pending
Approved
Rejected
```

`cardLayoutMode`:

```text
grid
list
```

`sectionTextMode`:

```text
auto
light
dark
```

Defaults:

```text
pageName = Home
sectionName = Custom
variations = 1
sectionStatus = Pending
isGenerated = true
cardGridColumns = 3
cardLayoutMode = grid
sectionTextMode = auto
```

Create indexes for:

```text
sectionId
pageName
sectionStatus
pageName + sectionName
```

Do not expose MongoDB `_id` as `sectionId`.

---

# 6. Element Model

Create the Mongoose `elements` collection.

Fields:

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
createdAt
updatedAt
```

`contentType` must be:

```text
Image
Text
Textfield
Button
Cards
```

`fieldId`:

```text
required
unique
10 numeric digits
immutable
```

`sectionId`:

```text
required
```

`pageName`:

```text
required
```

`projectName`:

```text
sample-brand
```

For Cards:

```text
loop = array
```

For non-Cards:

```text
loop = null
```

Create indexes:

```text
fieldId unique
sectionId
pageName
sectionId + elementName
pageName + fieldId
```

Do not expose MongoDB `_id` as `fieldId`.

---

# 7. Counter Model and Stable IDs

Create a MongoDB `Counter` model:

```text
key
value
```

`key` must be unique.

Implement atomic allocation with:

```text
findOneAndUpdate()
$inc
```

Required counters:

```text
section
element
nestedCard
```

Starting values:

```text
section = 1000000000
element = 2000000000
nestedCard = 3000000000
```

Every generated identifier must be exactly 10 digits.

Never use:

```text
Math.random()
UUID
timestamp-only IDs
LLM-generated IDs
frontend-generated IDs
```

When regenerating:

- Reuse existing field IDs when the semantic element still exists.
- Allocate new IDs for genuinely new elements.
- Never recycle deleted IDs.

---

# 8. Request Validation

Implement validation for:

```text
POST /api/generate
```

Request type:

```text
multipart/form-data
```

Fields:

```text
mode
prompt
code
wireframe
pageName
sectionName
accentColor
```

`mode` is required.

Allowed modes:

```text
wireframe
code
prompt
combined
```

Rules:

```text
wireframe mode:
wireframe required

code mode:
code required

prompt mode:
prompt required

combined:
at least two inputs required
```

Defaults:

```text
pageName = Home
sectionName = Custom
```

Wireframe:

```text
PNG
JPG
JPEG
WebP
```

Maximum:

```text
8 MB
```

Invalid request:

```http
400
```

Response:

```json
{
  "ok": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "..."
  }
}
```

---

# 9. Wireframe Storage

Use Multer.

Store uploads under:

```text
/uploads/wireframes/
```

Accepted:

```text
PNG
JPG
JPEG
WebP
```

Maximum:

```text
8 MB
```

Generate safe filenames.

Never use the original filename directly.

Prevent path traversal:

```text
../
```

Reject executable extensions.

Return relative paths such as:

```text
wireframes/abc123.png
```

Store relative path in `Section.wireframes`.

Expose static storage:

```text
/storage/
```

The frontend can construct:

```text
VITE_STORAGE_URL + relativePath
```

---

# 10. Sections API

Implement:

```http
GET /api/sections
```

Optional query:

```text
pageName
status
isGenerated
```

Response:

```json
{
  "ok": true,
  "sections": []
}
```

Implement:

```http
GET /api/sections/:sectionId
```

Response:

```json
{
  "ok": true,
  "section": {}
}
```

Use `sectionId`, not MongoDB `_id`.

Missing section:

```http
404
```

---

# 11. Elements API

Implement:

```http
GET /api/elements
```

Support:

```text
?sectionId=
?pageName=
?fieldIds=
```

Examples:

```text
GET /api/elements?sectionId=1000000001
GET /api/elements?pageName=Home
GET /api/elements?fieldIds=2000000001,2000000003
```

Response:

```json
{
  "ok": true,
  "elements": []
}
```

For Cards, preserve `loop` as an array.

Do not flatten Cards data.

The response must be directly usable by the Redux CMS layer.

---

# 12. CMS Hydration

Implement:

```text
buildCmsState(pageName)
```

It must produce:

```json
{
  "pageName": "Home",
  "allSections": {
    "Home": {
      "2000000001": "...",
      "2000000002": "...",
      "2000000003": "...",
      "2000000006": []
    }
  },
  "allSectionsCss": {
    "Home": {
      "2000000003": "font-weight: bold;"
    }
  },
  "sectionNames": {
    "1000000001": "Hero"
  }
}
```

The key names must remain:

```text
allSections
allSectionsCss
sectionNames
```

---

# 13. CMS Editing

Implement:

```http
PATCH /api/elements/:fieldId
```

Allowed fields:

```text
content
css
loop
```

Do not allow normal CMS requests to modify:

```text
fieldId
sectionId
elementName
contentType
pageName
projectName
```

Example:

```http
PATCH /api/elements/2000000003
```

```json
{
  "content": "TRAIN WITHOUT LIMITS"
}
```

Also support:

```json
{
  "css": "font-weight:700;font-size:64px;"
}
```

And:

```json
{
  "loop": []
}
```

The endpoint updates MongoDB only.

It must not regenerate JSX.

---

# 14. HTML Sanitization

Sanitize CMS HTML before persistence.

Allowed:

```text
b
i
br
span
strong
em
```

Reject/remove:

```text
script
iframe
object
embed
style
link
form
javascript:
onclick
onload
onerror
```

Apply sanitization to:

- Text
- Textfield
- Button
- Cards loop content

Write XSS tests.

---

# 15. Intermediate Representation

Create an IR for generation.

Example:

```json
{
  "sectionType": "split-hero",
  "platform": "Website",
  "layout": {
    "direction": "row",
    "breakpoint": "md"
  },
  "theme": {},
  "elements": []
}
```

The IR must be validated before persistence.

Validate:

```text
sectionType
platform
layout
elements
layout.direction
layout.breakpoint
theme
element definitions
content types
card count
```

The backend owns IDs. The model cannot define authoritative IDs.

---

# 16. Prompt Generation

Implement prompt-only generation.

Input:

```text
mode=prompt
prompt=...
```

Analyze the prompt and create IR.

Identify, where relevant:

```text
heroImage
brandBadge
headlineMain
headlineSub
description
statBadges
ctaButton
```

When the prompt specifies:

- number of cards: use exactly that number
- CTA text: use it
- colors: use them
- layout: preserve it

Default card count:

```text
3
```

Always provide fallback content.

---

# 17. LLM Provider Abstraction

Create:

```text
LLMProvider
```

Methods:

```text
generateStructuredIR()
generateComponentCode()
```

Implement an OpenAI-compatible provider using:

```text
LLM_BASE_URL
LLM_API_KEY
```

The application must not depend directly on one vendor.

If no API key exists:

```text
use deterministic fallback generation
```

If the LLM returns malformed output:

1. Parse response.
2. Validate JSON.
3. Validate IR.
4. Retry once.
5. If still invalid, use deterministic fallback.

Never crash the Node process.

---

# 18. Component Synthesizer

Implement the React component synthesizer.

Input:

```text
validated IR
section metadata
element records
```

Output:

```text
valid React JSX
```

Every generated component must:

1. Declare an IDs object.
2. Accept `pageName = "Home"`.
3. Fetch element data on mount.
4. Read CMS state.
5. Use persisted field IDs.
6. Add DOM IDs to editable elements.
7. Provide fallback content.
8. Render Cards.loop.
9. Use responsive Tailwind classes.
10. Apply dynamic styles.
11. Provide image fallback.
12. Export default component.
13. Never use Math.random().
14. Never hard-code production URLs.
15. Never import unavailable proprietary helpers.
16. Never execute generated JSX on the backend.

Example:

```jsx
const ids = {
  heroImage: "2000000001",
  brandBadge: "2000000002",
  headlineMain: "2000000003"
};
```

---

# 19. JSX Validation

Before returning generated JSX:

Parse it with a JSX-capable AST parser.

Verify:

```text
React import
component declaration
ids object
field IDs
default export
balanced JSX
valid syntax
```

Reject:

```text
eval
new Function
script injection
unknown executable imports
hardcoded secrets
production URLs
```

If parsing fails:

- retry once
- then use deterministic fallback

The API must never knowingly return invalid JSX.

---

# 20. Existing Code Mode

Input:

```text
mode=code
code=<React JSX>
```

Treat code as untrusted text.

Never execute it.

Parse it as AST.

Extract:

```text
text nodes
images
buttons
headings
paragraphs
repeating children
existing ids
Tailwind classes
layout structure
```

Convert hard-coded content into Elements.

Detect existing valid field IDs and reuse them.

Allocate new IDs for new editable elements.

Detect repeating structures and convert them to:

```text
contentType = Cards
loop = [...]
```

Preserve Tailwind layout classes where possible.

Validate generated JSX before returning.

---

# 21. Wireframe Mode

Input:

```text
mode=wireframe
wireframe=image
```

Analyze visual structure.

Detect:

```text
media region
badge/eyebrow
primary heading
subheading
description
repeating stats/cards
primary CTA
```

Convert detected regions into:

```text
heroImage
brandBadge
headlineMain
headlineSub
description
statBadges
ctaButton
```

If vision analysis is unavailable, use deterministic fallback.

If confidence is low, continue with inferred elements and warnings where appropriate.

---

# 22. Combined Mode

When wireframe + prompt + code are supplied, use this precedence:

### Prompt wins for

```text
copy
color
CTA behavior
```

### Wireframe wins for

```text
spatial layout
columns
ordering
alignment
```

### Existing code wins for

```text
technical patterns
Redux selectors
helper names
class conventions
```

unless the prompt explicitly requests a change.

Merge inputs into one validated IR.

Do not create duplicate semantic elements.

Do not create duplicate IDs.

---

# 23. Complete `/api/generate`

Implement:

```http
POST /api/generate
Content-Type: multipart/form-data
```

Accepted:

```text
mode
prompt
code
wireframe
pageName
sectionName
accentColor
```

Pipeline:

```text
Request
↓
Validation
↓
Input normalization
↓
Wireframe/code/prompt analysis
↓
IR generation
↓
IR validation
↓
Stable ID allocation
↓
Element generation
↓
Content sanitization
↓
JSX synthesis
↓
JSX AST validation
↓
MongoDB transaction
↓
Section persistence
↓
Element persistence
↓
API response
```

Success response:

```json
{
  "ok": true,
  "sectionId": "1000000001",
  "pageName": "Home",
  "componentFile": "src/sections/generated/HeroSection.jsx",
  "elementIds": [
    "2000000001",
    "2000000002"
  ],
  "warnings": [],
  "ir": {
    "sectionType": "split-hero"
  }
}
```

Never expose MongoDB `_id`.

Generation failures:

```http
422
```

Do not persist partial records.

---

# 24. MongoDB Transaction Safety

Generation must be atomic.

Either:

```text
Section
+
all Elements
+
generation metadata
```

are persisted,

or:

```text
nothing
```

is persisted.

Never allow:

- Section without Elements
- Elements without Section
- Partial generation
- Corrupted ID state

Use MongoDB session transactions.

---

# 25. Regeneration

Implement:

```http
POST /api/sections/:sectionId/regenerate
```

Behavior:

1. Load original section.
2. Load all elements.
3. Load previous generated component/IR if available.
4. Generate a new variation.
5. Reuse stable field IDs for semantic elements that remain.
6. Generate new IDs for new elements.
7. Never recycle deleted IDs.
8. Preserve original variation.
9. Store new variation.
10. Increment `variations`.
11. Return new artifact.

Response:

```json
{
  "ok": true,
  "sectionId": "...",
  "variation": 2,
  "elementIds": [],
  "warnings": []
}
```

Do not overwrite variation 1.

---

# 26. Optional GenerationJob

Create an optional `GenerationJob` model:

```text
jobId
mode
pageName
sectionName
status
startedAt
completedAt
sectionId
warnings
errorCode
errorMessage
```

Statuses:

```text
queued
processing
completed
failed
```

This may support frontend states such as:

```text
Uploading
Analysing
Generating
Validating
Saving
Completed
Failed
```

Do not make GenerationJob the CMS source of truth.

---

# 27. Health Endpoint

Implement:

```http
GET /api/health
```

Healthy:

```json
{
  "ok": true,
  "service": "uiverse-api",
  "database": "connected"
}
```

Database unavailable:

```http
503
```

```json
{
  "ok": false,
  "service": "uiverse-api",
  "database": "disconnected"
}
```

Do not expose credentials, paths, or stack traces.

---

# 28. Error Handling

Use one global error handler.

All responses:

```json
{
  "ok": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

Use:

```text
400 INVALID_INPUT
404 NOT_FOUND
409 DUPLICATE_RESOURCE
413 FILE_TOO_LARGE
422 GENERATION_FAILED
422 INVALID_GENERATED_DATA
500 INTERNAL_ERROR
```

Never return raw MongoDB, LLM, filesystem errors, or stack traces.

---

# 29. CORS

Configure CORS using:

```text
FRONTEND_URL
```

Default development origin:

```text
http://localhost:5173
```

Allow required methods:

```text
GET
POST
PATCH
OPTIONS
```

Support multipart/form-data.

Do not use wildcard origins when credentials are involved.

---

# 30. Security Middleware

Use:

- Helmet
- CORS
- request size limits
- JSON body limits
- multipart limits
- Zod validation
- NoSQL injection protection
- path traversal protection
- safe filenames
- HTML sanitization
- rate limiting for `/api/generate`

Do not add authentication, SSO, payments, or unrelated user-management features unless the SRS explicitly requires them.

---

# 31. Default Image Fallback

Create:

```text
/storage/default/images/hero-placeholder.jpg
```

For missing images, return:

```text
default/images/hero-placeholder.jpg
```

Use relative paths.

The frontend prepends:

```text
VITE_STORAGE_URL
```

Serve:

```text
GET /storage/default/images/hero-placeholder.jpg
```

---

# 32. Deterministic Hero Fallback

When no LLM is available, generate the reference Hero:

```text
sectionName:
Hero

pageName:
Home

platform:
Website
```

Elements:

```text
heroImage
brandBadge
headlineMain
headlineSub
description
statBadges
ctaButton
```

Default content:

```text
brandBadge:
PULSE FIT

headlineMain:
CHALLENGE YOUR LIMITS

headlineSub:
Be a part of the tribe that's limitless.

description:
Join trainer-led workout sessions designed to kickstart your fitness journey, at your convenience.

CTA:
FIND A WORKOUT
```

Cards:

```text
1000+
Community<br />Members

40+
Fitness<br />Programmes

150+
Fitness<br />Channels
```

Image:

```text
default/images/hero-placeholder.jpg
```

Use the ID service. Never hard-code IDs.

---

# 33. Database Seed

Create:

```text
npm run db:seed
```

Seed:

```text
Home Hero
```

with:

- Section
- 7 top-level elements
- 3 Cards loop items
- 6 nested card fields

The seed must be idempotent.

Use fictional data only.

Print:

```text
Database connected
Section created/found
Elements created/found
Cards created
Seed complete
```

---

# 34. Optional ZIP Export

If implemented:

```http
GET /api/sections/:sectionId/export
```

ZIP contents:

```text
Component.jsx
section.json
elements.json
```

Never include:

```text
.env
API keys
MongoDB URI
credentials
real customer data
```

---

# 35. Frontend Compatibility Audit

Inspect the existing React frontend before changing anything.

Find:

```text
API base URL
fetch calls
axios calls
Redux thunks
generation calls
PATCH calls
preview route
pageName usage
fieldId usage
```

Verify:

```text
POST /api/generate
GET /api/sections
GET /api/sections/:sectionId
GET /api/elements
GET /api/elements?sectionId=
GET /api/elements?pageName=
PATCH /api/elements/:fieldId
POST /api/sections/:sectionId/regenerate
GET /api/health
```

If frontend response expectations differ slightly, adapt the backend response while preserving the SRS terminology.

Do not create a second competing API contract.

---

# 36. End-to-End Tests

Test the complete flow.

## Test 1 — Startup

- Start MongoDB.
- Start Node API.
- Start React frontend.

## Test 2 — Prompt Generation

Generate through:

```text
/generate
```

Verify:

- request received
- section persisted
- elements persisted
- JSX returned
- preview works

## Test 3 — DOM IDs

Verify:

- headlineMain has 10-digit fieldId
- heroImage has 10-digit fieldId
- CTA has 10-digit fieldId
- nested card fields have fieldIds

## Test 4 — Content PATCH

Change:

```text
CHALLENGE YOUR LIMITS
```

to:

```text
TRAIN WITHOUT LIMITS
```

Verify preview changes without regenerating JSX.

## Test 5 — CSS PATCH

Update CSS and verify it appears in:

```text
allSectionsCss
```

## Test 6 — Cards

Verify three cards.

Every loop item contains:

```text
field1
fieldType1
fieldId1
field2
fieldType2
fieldId2
```

## Test 7 — Image Fallback

Break the image path and verify placeholder behavior.

## Test 8 — Stable IDs

Generate again and verify semantic elements retain IDs.

## Test 9 — Missing LLM

Remove LLM key and verify deterministic fallback or controlled error.

## Test 10 — Invalid Input

Verify:

```http
400
```

## Test 11 — Oversized Image

Verify:

```http
413
```

## Test 12 — Generation Failure

Verify:

```http
422
```

and no partial database records.

## Test 13 — Malicious JSX

Verify the backend never executes it.

## Test 14 — Malicious HTML

Verify sanitization.

Produce a PASS/FAIL report.

---

# 37. Performance

Test:

```text
GET /api/elements?pageName=Home
POST /api/generate
PATCH /api/elements/:fieldId
GET /api/sections
GET /api/health
```

Optimize MongoDB queries with indexes.

Use `.lean()` for read-only queries where appropriate.

Avoid N+1 queries.

Target:

```text
Preview first paint: approximately under 2 seconds locally after caching
Generation: approximately under 60 seconds
```

Do not add unnecessary infrastructure.

---

# 38. Security Audit

Search the backend for:

```text
eval(
new Function(
child_process execution
unsafe dynamic import
hardcoded API keys
hardcoded MongoDB URIs
real production URLs
path traversal
NoSQL injection
HTML injection
XSS
unsafe file uploads
unbounded request sizes
```

Verify:

- pasted React code is only parsed
- generated JSX is never executed on the backend
- uploaded images are restricted
- 8MB limit works
- HTML allow-list works
- no secrets are committed

Fix every critical and high-risk issue.

---

# 39. Final SRS Compliance Audit

Audit:

## Technology

```text
Node.js
TypeScript
Express
MongoDB
```

## Required endpoints

```text
GET /api/health
POST /api/generate
GET /api/sections
GET /api/sections/:sectionId
GET /api/elements
GET /api/elements?sectionId=
GET /api/elements?pageName=
PATCH /api/elements/:fieldId
POST /api/sections/:sectionId/regenerate
```

## Generation modes

```text
Prompt
Code
Wireframe
Combined
```

## Section contract

Check:

```text
sectionName
sectionId
variations
path
sectionStatus
wireframes
platform
pageName
isGenerated
cardGridColumns
cardLayoutMode
sectionTextMode
sectionColor
paddings
```

## Element contract

Check:

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

## Content types

```text
Image
Text
Textfield
Button
Cards
```

## IDs

Verify:

- sectionId is exactly 10 digits
- fieldId is exactly 10 digits
- nested IDs are exactly 10 digits
- no Math.random()
- no frontend-generated IDs
- no LLM-authoritative IDs
- IDs are persisted
- IDs are stable
- IDs are never recycled

## Cards

Verify:

- Cards.loop works
- nested field IDs exist
- requested card counts work
- default three cards work

## Redux

Verify:

```text
state.cms.allSections[pageName][fieldId]
state.cms.allSectionsCss[pageName][fieldId]
state.cms.sectionNames[sectionId]
```

## PATCH

Verify:

- content update
- CSS update
- Cards.loop update
- preview updates without JSX regeneration

## Generated JSX

Verify:

- ids object
- pageName
- CMS integration
- DOM IDs
- fallback content
- image fallback
- Cards.loop
- dynamic styling
- responsive classes
- no secrets
- no unsafe imports
- no invalid JSX

## Code input

Verify:

- AST parsing
- no execution
- text extraction
- image extraction
- button extraction
- repeating structure detection
- ID reuse

## Wireframe

Verify:

- upload
- supported image types
- 8MB limit
- media detection
- heading detection
- badge detection
- stats detection
- CTA detection

## Prompt

Verify:

- copy control
- color control
- CTA control
- card count control
- layout control

## Combined input

Verify:

```text
Prompt wins copy/color/CTA
Wireframe wins spatial layout
Code wins technical patterns
```

## Storage

Verify:

- local wireframe storage
- relative paths
- placeholder image
- no production storage URLs

## Errors

Verify:

```text
400
404
413
422
500
```

## Reliability

Verify:

- LLM failure causes no partial section
- no orphan elements
- no corrupted IDs
- generation transaction works

## Security

Verify:

- no secrets
- no eval
- no Function
- no user-code execution
- HTML sanitized
- XSS prevented
- NoSQL injection prevented
- path traversal prevented

---

# 40. Final Backend Folder Structure

```text
server/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── database/
│   │   └── connection.ts
│   │
│   ├── models/
│   │   ├── section.model.ts
│   │   ├── element.model.ts
│   │   ├── counter.model.ts
│   │   └── generationJob.model.ts
│   │
│   ├── routes/
│   │   ├── health.routes.ts
│   │   ├── generate.routes.ts
│   │   ├── sections.routes.ts
│   │   └── elements.routes.ts
│   │
│   ├── controllers/
│   │   ├── health.controller.ts
│   │   ├── generate.controller.ts
│   │   ├── sections.controller.ts
│   │   └── elements.controller.ts
│   │
│   ├── services/
│   │   ├── generation/
│   │   ├── sections/
│   │   ├── elements/
│   │   ├── storage/
│   │   └── validation/
│   │
│   ├── repositories/
│   │   ├── section.repository.ts
│   │   ├── element.repository.ts
│   │   └── counter.repository.ts
│   │
│   ├── generators/
│   │   ├── prompt.generator.ts
│   │   ├── code.generator.ts
│   │   ├── wireframe.generator.ts
│   │   └── combined.generator.ts
│   │
│   ├── parsers/
│   │   ├── jsx.parser.ts
│   │   └── wireframe.parser.ts
│   │
│   ├── synthesizer/
│   │   └── component.synthesizer.ts
│   │
│   ├── validators/
│   │   ├── generate.validator.ts
│   │   ├── section.validator.ts
│   │   └── element.validator.ts
│   │
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rate-limit.middleware.ts
│   │
│   ├── utils/
│   │   ├── id-generator.ts
│   │   ├── sanitizer.ts
│   │   └── response.ts
│   │
│   ├── types/
│   │   ├── section.types.ts
│   │   ├── element.types.ts
│   │   ├── generation.types.ts
│   │   └── ir.types.ts
│   │
│   └── seed/
│       └── seed.ts
│
├── uploads/
│   └── wireframes/
│
├── storage/
│   └── default/
│       └── images/
│           └── hero-placeholder.jpg
│
├── tests/
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

# 41. Recommended Development Order

Do not give the entire specification to a coding agent in one giant request.

Implement in this order:

```text
1. Master backend instruction
2. Project architecture
3. Environment configuration
4. MongoDB connection
5. Section model
6. Element model
7. Counter model / ID generation
8. Validation
9. Wireframe storage
10. Sections API
11. Elements API
12. CMS hydration
13. CMS editing
14. Sanitization
15. IR
16. Prompt generation
17. LLM abstraction
18. JSX synthesizer
19. JSX validation
20. Code mode
21. Wireframe mode
22. Combined mode
23. /api/generate
24. Transactions
25. Regeneration
26. Health/error/CORS/security
27. Fallback generation
28. Seed
29. Frontend integration
30. End-to-end testing
31. Performance
32. Security audit
33. Final SRS audit
```

Do not move to the next stage until the current stage compiles and its tests pass.

---

# 42. Final Acceptance Flow

The most important UIverse backend flow is:

```text
User Input
    ↓
Prompt / Code / Wireframe
    ↓
Input Validation
    ↓
Analysis
    ↓
Intermediate Representation
    ↓
IR Validation
    ↓
Stable ID Allocation
    ↓
Element Generation
    ↓
Content Sanitization
    ↓
React JSX Synthesis
    ↓
JSX AST Validation
    ↓
MongoDB Transaction
    ↓
Section Persistence
    ↓
Element Persistence
    ↓
API Response
    ↓
Redux CMS State
    ↓
React Preview
    ↓
PATCH Content / CSS
    ↓
Updated Preview
```

The backend is considered complete only when this entire path works reliably and the final SRS audit passes.
