# AdVantage-Gen — Complete Project Documentation

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Dependencies & Their Usage](#2-dependencies--their-usage)
3. [Frontend — Components, Location & Logic](#3-frontend--components-location--logic)
4. [Backend — Components, Location & Logic](#4-backend--components-location--logic)

---

## 1. Tech Stack

| Layer                   | Technology                          | Purpose                                                       |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------- |
| **Frontend Framework**  | React 19                            | Building the user interface with component-based architecture |
| **Build Tool**          | Vite 6                              | Fast development server and production bundler                |
| **3D Graphics**         | Three.js + React Three Fiber + Drei | Rendering the 3D phone model on the home page                 |
| **Animations**          | Framer Motion                       | Page transitions, hover effects, scroll animations            |
| **Routing**             | React Router DOM v7                 | Client-side navigation between pages                          |
| **HTTP Client**         | Axios                               | Making API requests from frontend to backend                  |
| **Styling**             | Vanilla CSS + CSS Variables         | Custom design system with glassmorphism, gradients            |
| **Backend Runtime**     | Node.js                             | Server-side JavaScript execution                              |
| **Backend Framework**   | Express.js                          | REST API server, routing, middleware                          |
| **Database**            | MongoDB Atlas (via Mongoose)        | Storing generated ads (prompt, image URL, tags, tagline)      |
| **Image Storage**       | Cloudinary                          | Cloud hosting for generated ad images                         |
| **AI Image Generation** | Stability AI API                    | Generating advertisement images from text prompts             |
| **Environment Config**  | dotenv                              | Loading secrets (API keys, DB URI) from `.env` file           |

---

## 2. Dependencies & Their Usage

### Frontend Dependencies (`frontend/package.json`)

| Package              | Version  | What It Does in This Project                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react`              | ^19.1.0  | Core library — provides `useState`, `useRef`, component lifecycle. Every `.jsx` file uses React to define UI components.                                                                                                                                                                                                                                                                                                                             |
| `react-dom`          | ^19.1.0  | Renders React components into the browser DOM. Used in `main.jsx` via `createRoot().render()` to mount the `<App />` component.                                                                                                                                                                                                                                                                                                                      |
| `react-router-dom`   | ^7.13.0  | Client-side routing. Used in `App.jsx` for `<Router>`, `<Routes>`, `<Route>`. Used in `Navbar.jsx` for `<Link>` navigation. Used in `GenerateAds.jsx` for `useNavigate()` to redirect to results page. Used in `Results.jsx` for `useLocation()` to read passed data.                                                                                                                                                                                |
| `@react-three/fiber` | ^9.5.0   | React renderer for Three.js. Used in `PhoneCanvas.jsx` — the `<Canvas>` component creates a WebGL context and renders the 3D scene.                                                                                                                                                                                                                                                                                                                  |
| `@react-three/drei`  | ^10.7.7  | Helper components for React Three Fiber. Used in `PhoneCanvas.jsx` for `<Environment>`, `<OrbitControls>`, `<Stars>`. Used in `PhoneModel.jsx` for `<RoundedBox>`, `<Text>`, `<Float>`.                                                                                                                                                                                                                                                              |
| `three`              | ^0.183.0 | The underlying 3D library. Provides geometries (`boxGeometry`, `planeGeometry`), materials (`meshStandardMaterial`, `meshPhysicalMaterial`), and lights (`ambientLight`, `pointLight`).                                                                                                                                                                                                                                                              |
| `framer-motion`      | ^12.34.2 | Animation library. Used in `HeroSection.jsx` for fade-in/slide-up on load. Used in `MarqueeBanner.jsx` for infinite scrolling animation. Used in `TeamCard.jsx` for scroll-triggered reveal. Used in `NavLink.jsx` for the active underline animation (`layoutId`). Used in `PromptForm.jsx`, `LoadingSpinner.jsx`, `ImagePreview.jsx`, `TaglineDisplay.jsx`, `TagsDisplay.jsx`, `GenerateAnotherButton.jsx` for enter animations and hover effects. |
| `axios`              | ^1.13.5  | HTTP client. Used in `services/api.js` to make POST requests to the backend (`/api/ads/generate`) to generate ads.                                                                                                                                                                                                                                                                                                                                   |
| `lucide-react`       | ^0.574.0 | Icon library (installed but icons are currently rendered as inline SVGs in the components).                                                                                                                                                                                                                                                                                                                                                          |
| `tailwindcss`        | ^4.1.18  | CSS utility framework (installed but the project primarily uses custom vanilla CSS in `index.css`).                                                                                                                                                                                                                                                                                                                                                  |
| `@tailwindcss/vite`  | ^4.1.18  | Vite plugin for Tailwind CSS integration.                                                                                                                                                                                                                                                                                                                                                                                                            |

### Frontend Dev Dependencies

| Package                       | Version | What It Does                                                                                        |
| ----------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `vite`                        | ^6.3.5  | Development server with hot reload + production bundler. Run via `npm run dev` and `npm run build`. |
| `@vitejs/plugin-react`        | ^4.4.1  | Vite plugin that enables JSX transformation, Fast Refresh for React.                                |
| `eslint`                      | ^9.25.0 | JavaScript linter for code quality checks.                                                          |
| `eslint-plugin-react-hooks`   | ^5.2.0  | ESLint rules for React hooks (e.g., warns about missing deps in `useEffect`).                       |
| `eslint-plugin-react-refresh` | ^0.4.19 | ESLint rules for React Fast Refresh compatibility.                                                  |
| `globals`                     | ^16.0.0 | Provides global variable definitions for ESLint (browser, node, etc.).                              |
| `@types/node`                 | ^25.2.3 | TypeScript type definitions for Node.js (for IDE autocompletion).                                   |
| `@types/react`                | ^19.1.2 | TypeScript type definitions for React (for IDE autocompletion).                                     |
| `@types/react-dom`            | ^19.1.2 | TypeScript type definitions for ReactDOM (for IDE autocompletion).                                  |
| `@eslint/js`                  | ^9.25.0 | ESLint's recommended JavaScript configuration presets.                                              |

### Backend Dependencies (`backend/package.json`)

| Package      | Version | What It Does in This Project                                                                                                                                                                                                                                   |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `express`    | ^4.18.2 | Web framework. Creates the HTTP server, handles routing (`app.use`, `router.post`, `router.get`), parses JSON request bodies, and sends responses. Used in `server.js` and `routes/adRoutes.js`.                                                               |
| `mongoose`   | ^8.1.1  | MongoDB ODM (Object Document Mapper). Used in `config/db.js` to connect to MongoDB Atlas. Used in `models/Ad.js` to define the Ad schema (prompt, imageUrl, tags, tagline, createdAt). Used in `controllers/adController.js` to create and query Ad documents. |
| `cors`       | ^2.8.5  | Cross-Origin Resource Sharing middleware. Used in `server.js` — `app.use(cors())` allows the frontend (running on `localhost:5173`) to make API requests to the backend (running on `localhost:5000`).                                                         |
| `dotenv`     | ^16.4.1 | Loads environment variables from `.env` file into `process.env`. Used in `server.js` and `config/cloudinary.js`. Loads `PORT`, `MONGO_URI`, `CLOUDINARY_*`, and `STABILITY_API_KEY`.                                                                           |
| `axios`      | ^1.13.5 | HTTP client. Used in `services/stabilityAI.js` to make POST requests to the Stability AI API (`https://api.stability.ai/v2beta/stable-image/generate/core`).                                                                                                   |
| `form-data`  | ^4.0.5  | Constructs `multipart/form-data` payloads. Used in `services/stabilityAI.js` to build the request body for the Stability AI API (appending the prompt and output format).                                                                                      |
| `cloudinary` | ^2.0.1  | Cloudinary Node SDK. Used in `config/cloudinary.js` to configure the Cloudinary client with credentials. Used in `services/cloudinaryUpload.js` to upload base64-encoded images via `cloudinary.uploader.upload()`.                                            |

### Backend Dev Dependencies

| Package   | Version | What It Does                                                                                           |
| --------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `nodemon` | ^3.0.3  | Auto-restarts the server when file changes are detected. Used via `npm run dev` (`nodemon server.js`). |

---

## 3. Frontend — Components, Location & Logic

### Project Structure

```
frontend/src/
├── main.jsx                        ← App entry point
├── App.jsx                         ← Router + layout
├── index.css                       ← Global styles + design system
├── components/
│   ├── Navbar.jsx                  ← Top navigation bar
│   ├── NavLink.jsx                 ← Individual nav link with active indicator
│   ├── Footer.jsx                  ← Page footer
│   ├── HeroSection.jsx            ← Hero title + CTA
│   ├── PhoneCanvas.jsx            ← 3D phone scene
│   ├── PhoneModel.jsx             ← 3D phone geometry
│   ├── MarqueeBanner.jsx          ← Scrolling text banner
│   ├── TeamSection.jsx            ← Team grid container
│   ├── TeamCard.jsx               ← Individual team member card
│   ├── PromptForm.jsx             ← Ad generation form
│   ├── LoadingSpinner.jsx         ← Loading state UI
│   ├── ImagePreview.jsx           ← Generated ad image display
│   ├── TaglineDisplay.jsx         ← Generated tagline display
│   ├── TagsDisplay.jsx            ← Generated tags/hashtags display
│   └── GenerateAnotherButton.jsx  ← Button to generate a new ad
├── pages/
│   ├── Home.jsx                   ← Home page (composes Hero, Phone, Marquee, Team)
│   ├── GenerateAds.jsx            ← Ad generation page (composes PromptForm, LoadingSpinner)
│   └── Results.jsx                ← Results page (composes Image, Tagline, Tags, Button)
├── services/
│   └── api.js                     ← Centralized API calls
└── data/
    └── team.js                    ← Team members data array
```

---

### `main.jsx` — Entry Point

**Location:** `frontend/src/main.jsx`

```javascript
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**Logic:** This is the very first file that runs. It finds the `<div id="root">` in `index.html`, creates a React root, and renders the `<App />` component inside `<StrictMode>` (which enables extra development warnings).

---

### `App.jsx` — Router & Layout

**Location:** `frontend/src/App.jsx`

**Logic:** Sets up the entire application layout:

1. Wraps everything in `<Router>` (BrowserRouter) for client-side routing
2. Creates a flex column layout with `<Navbar>` at top, `<main>` in the middle, `<Footer>` at bottom
3. Defines 3 routes:
   - `/` → `<Home />`
   - `/generate` → `<GenerateAds />`
   - `/result` → `<Results />`

---

### `Navbar.jsx` — Top Navigation Bar

**Location:** `frontend/src/components/Navbar.jsx`

**Logic:**

1. Uses `useLocation()` from React Router to get the current URL path
2. Renders the brand name "AdVantage-Gen" as a link to `/` with a gradient text effect
3. Renders two `<NavLink>` components for "Home" (`/`) and "Generate Ads" (`/generate`)
4. Has a glassmorphism background (`glass-nav` CSS class) with a fixed position at the top

---

### `NavLink.jsx` — Active Navigation Link

**Location:** `frontend/src/components/NavLink.jsx`

**Props:** `to` (URL path), `children` (link text), `currentPath` (current URL)

**Logic:**

1. Compares `currentPath === to` to determine if this link is active
2. If active: changes text color to `--secondary-color` and renders an animated underline using Framer Motion's `layoutId="underline"` — this creates a smooth sliding animation when switching between nav items
3. If inactive: renders with `--text-secondary` color, no underline

---

### `Footer.jsx` — Page Footer

**Location:** `frontend/src/components/Footer.jsx`

**Logic:** Simple static footer that displays the copyright year (dynamically via `new Date().getFullYear()`) and the brand name. Styled with a top border and semi-transparent background.

---

### `HeroSection.jsx` — Hero Title & Call-to-Action

**Location:** `frontend/src/components/HeroSection.jsx`

**Logic:**

1. Uses Framer Motion `initial={{ opacity: 0, y: -50 }}` → `animate={{ opacity: 1, y: 0 }}` to fade in and slide down on page load
2. Renders the main headline "Generate Digital Magic" with gradient text on "Digital Magic"
3. Renders a subtitle describing the app
4. Renders a "Start Creating" CTA button that links to `/generate`

---

### `PhoneCanvas.jsx` — 3D Scene Container

**Location:** `frontend/src/components/PhoneCanvas.jsx`

**Logic:**

1. Creates a Three.js `<Canvas>` with camera positioned at `[0, 0, 9]` with a 40° field of view
2. Sets up lighting: one ambient light (0.5 intensity), two colored point lights (purple `#7C3AED` and pink `#DB2777`)
3. Wraps 3D content in `<Suspense>` for async loading
4. Renders `<PhoneModel>` at 1.2x scale
5. Adds `<Environment preset="city">` for realistic reflections
6. Adds `<Stars>` — 5000 star particles in the background
7. Adds `<OrbitControls>` — auto-rotates the scene at 0.8 speed, zoom disabled, vertical rotation limited

---

### `PhoneModel.jsx` — 3D Phone Geometry

**Location:** `frontend/src/components/PhoneModel.jsx`

**Logic:** Builds a 3D phone model entirely from code (no external 3D file):

1. **Body:** `<RoundedBox>` (2.8 × 5.8 × 0.3) with dark metallic material (`#0f172a`, roughness 0.2, metalness 0.9)
2. **Side Buttons:** Two small `<mesh>` boxes on the left and right edges
3. **Camera Strip:** A box on the back simulating a camera module
4. **Front Screen:** A `<planeGeometry>` with glossy physical material (low roughness, black)
5. **Screen Text:** Two `<Text>` elements — "AdVantage" in white and "Gen" in magenta (`#d946ef`)
6. **Float Animation:** The entire phone is wrapped in `<Float>` which adds a gentle bobbing motion

---

### `MarqueeBanner.jsx` — Scrolling Text Banner

**Location:** `frontend/src/components/MarqueeBanner.jsx`

**Logic:**

1. Creates a full-width container with `overflow: hidden` and `whiteSpace: nowrap`
2. Uses Framer Motion to animate the text from `x: 0` to `x: -1000` infinitely with linear easing over 25 seconds
3. The text reads: "GENERATE ADS • CREATE • INSPIRE" repeated 3 times
4. Background has a purple tint with glassmorphism borders

---

### `TeamSection.jsx` — Team Grid Container

**Location:** `frontend/src/components/TeamSection.jsx`

**Logic:**

1. Imports team members data from `data/team.js`
2. Renders a heading "Meet the Team" with gradient text
3. Creates a responsive CSS Grid (`repeat(auto-fit, minmax(280px, 1fr))`) with 3rem gap
4. Maps over `teamMembers` array and renders a `<TeamCard>` for each member

---

### `TeamCard.jsx` — Individual Team Member Card

**Location:** `frontend/src/components/TeamCard.jsx`

**Props:** `member` (object with name, role, image), `index` (for animation delay)

**Logic:**

1. Uses `whileInView` animation — card fades in and slides up when scrolled into view (`viewport={{ once: true }}` ensures it only plays once)
2. Each card has a staggered delay (`index * 0.2` seconds)
3. Renders the member's avatar image with a glowing gradient blur effect behind it
4. Displays name and role with styled typography

---

### `PromptForm.jsx` — Ad Generation Form

**Location:** `frontend/src/components/PromptForm.jsx`

**Props:** `prompt` (current text), `setPrompt` (state setter), `onSubmit` (form handler)

**Logic:**

1. Animates in with a scale-up effect (`scale: 0.95 → 1`)
2. Has a decorative gradient line at the top (5px gradient bar)
3. Renders a `<textarea>` with glassmorphism styling for entering the ad description
4. Renders a submit button "Generate Magic" with an upward arrow SVG icon
5. The form is fully controlled — `prompt` state and `setPrompt` come from the parent

---

### `LoadingSpinner.jsx` — Loading State UI

**Location:** `frontend/src/components/LoadingSpinner.jsx`

**Logic:**

1. Fades in when rendered
2. Shows a CSS spinner (the `.loader` class in `index.css` creates a rotating border animation)
3. Displays "Weaving Pixels..." heading and a subtitle message

---

### `ImagePreview.jsx` — Generated Ad Image Display

**Location:** `frontend/src/components/ImagePreview.jsx`

**Props:** `imageUrl` (URL of the generated image from Cloudinary)

**Logic:**

1. Slides in from the left (`x: -50 → 0`) with a fade effect
2. Renders the image inside a glassmorphism panel with rounded corners
3. Image fills the full width of the panel

---

### `TaglineDisplay.jsx` — Generated Tagline Display

**Location:** `frontend/src/components/TaglineDisplay.jsx`

**Props:** `tagline` (the generated tagline string)

**Logic:**

1. Slides in from the right (`x: 50 → 0`) with a 0.2s delay
2. Has a 4px vertical accent bar on the left side
3. Shows "TAGLINE" as an uppercase label
4. Displays the tagline in large italic text with quotes

---

### `TagsDisplay.jsx` — Generated Tags/Hashtags Display

**Location:** `frontend/src/components/TagsDisplay.jsx`

**Props:** `tags` (array of hashtag strings like `["#premium", "#running"]`)

**Logic:**

1. Slides in from the right with a 0.4s delay
2. Shows "TARGETED TAGS" as an uppercase label
3. Maps over the `tags` array and renders each tag as a pill-shaped badge
4. Each tag has a hover scale effect (`whileHover={{ scale: 1.05 }}`)
5. Tags use the accent color with a subtle border and transparent background

---

### `GenerateAnotherButton.jsx` — Regenerate Button

**Location:** `frontend/src/components/GenerateAnotherButton.jsx`

**Logic:**

1. Fades in with a 0.6s delay (appears last on the results page)
2. Renders a `<Link>` to `/generate` styled as a primary button
3. Includes a refresh/retry SVG icon next to the text "Generate Another"

---

### `services/api.js` — Centralized API Calls

**Location:** `frontend/src/services/api.js`

```javascript
const API_BASE_URL = "http://localhost:5000/api";

export async function generateAd(prompt) {
  const response = await axios.post(`${API_BASE_URL}/ads/generate`, { prompt });
  return response.data;
}
```

**Logic:**

1. Defines the API base URL in one place (easy to change for production)
2. Exports `generateAd(prompt)` — sends a POST request with the prompt to the backend
3. Returns the response data (contains `prompt`, `imageUrl`, `tags`, `tagline`)

---

### `data/team.js` — Team Members Data

**Location:** `frontend/src/data/team.js`

**Logic:** Exports an array of team member objects, each with `name`, `role`, and `image` (using DiceBear API for avatar generation). Currently has 3 members: Tushar (Developer), Kavita (Designer), Yajurva (Manager).

---

### Page Composition — How Pages Use Components

#### `Home.jsx`

```
Home
├── HeroSection        → Title + CTA button
├── PhoneCanvas        → 3D phone with stars
├── MarqueeBanner      → Scrolling text
└── TeamSection        → Team grid
    └── TeamCard (×3)  → Individual cards
```

#### `GenerateAds.jsx`

```
GenerateAds
├── Header (inline)    → "Create Your Campaign" title
├── PromptForm         → Textarea + submit (when not loading)
└── LoadingSpinner     → Spinner + message (when loading)
```

**Flow:** User types prompt → clicks "Generate Magic" → `handleSubmit` calls `generateAd(prompt)` from `api.js` → shows `LoadingSpinner` → on success, navigates to `/result` passing the data via React Router state.

#### `Results.jsx`

```
Results
├── Header (inline)        → "Your Masterpiece" title
├── ImagePreview          → Generated ad image
├── TaglineDisplay        → AI-generated tagline
├── TagsDisplay           → AI-generated hashtags
└── GenerateAnotherButton → Link back to /generate
```

**Flow:** Reads `imageUrl`, `tags`, `tagline` from `location.state` (passed by `GenerateAds` via navigation). If no state exists, shows placeholder defaults.

---

## 4. Backend — Components, Location & Logic

### Project Structure

```
backend/
├── server.js                      ← App entry point + Express setup
├── .env                           ← Environment variables (secrets)
├── config/
│   ├── db.js                      ← MongoDB connection
│   └── cloudinary.js              ← Cloudinary SDK configuration
├── models/
│   └── Ad.js                      ← Mongoose schema for ads
├── controllers/
│   └── adController.js            ← Route handler logic
├── routes/
│   └── adRoutes.js                ← API route definitions
├── utils/
│   ├── extractKeywords.js         ← Keyword extraction from prompts
│   ├── generateTagline.js         ← Tagline generation
│   └── generateTags.js            ← Hashtag generation
└── services/
    ├── stabilityAI.js             ← Stability AI image generation
    └── cloudinaryUpload.js        ← Cloudinary image upload
```

---

### `server.js` — Application Entry Point

**Location:** `backend/server.js`

```javascript
dotenv.config(); // Load .env variables
const app = express(); // Create Express app
connectDB(); // Connect to MongoDB
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use("/api/ads", adRoutes); // Mount ad routes
app.listen(PORT); // Start server on port 5000
```

**Logic — Step by Step:**

1. `dotenv.config()` — Reads the `.env` file and loads all key-value pairs into `process.env`
2. Creates an Express application instance
3. Calls `connectDB()` from `config/db.js` to establish MongoDB connection
4. `cors()` middleware — Allows cross-origin requests (frontend on port 5173 can call backend on port 5000)
5. `express.json()` middleware — Parses incoming JSON request bodies so `req.body` contains the parsed data
6. Mounts all ad-related routes under `/api/ads` prefix
7. Starts the HTTP server on the configured PORT (default 5000)

---

### `config/db.js` — MongoDB Connection

**Location:** `backend/config/db.js`

```javascript
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
}
```

**Logic:**

1. Uses `mongoose.connect()` with the connection string from `MONGO_URI` environment variable
2. The URI points to MongoDB Atlas cluster (`cluster0.d0ceqhq.mongodb.net/ad_generator`)
3. If connection fails, logs the error and exits the process with code 1 (crash — prevents running without DB)

---

### `config/cloudinary.js` — Cloudinary Configuration

**Location:** `backend/config/cloudinary.js`

```javascript
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

**Logic:**

1. Imports Cloudinary v2 SDK
2. Configures it with 3 credentials from environment variables: cloud name, API key, API secret
3. Exports the configured instance so other files can use it for uploading

---

### `models/Ad.js` — Database Schema

**Location:** `backend/models/Ad.js`

**Schema Fields:**

| Field       | Type     | Default    | Description                                       |
| ----------- | -------- | ---------- | ------------------------------------------------- |
| `prompt`    | String   | _required_ | The user's input text describing the ad they want |
| `imageUrl`  | String   | `''`       | Cloudinary URL of the generated ad image          |
| `tags`      | [String] | `[]`       | Array of hashtags like `["#premium", "#running"]` |
| `tagline`   | String   | `''`       | Generated marketing tagline                       |
| `createdAt` | Date     | `Date.now` | Timestamp of when the ad was created              |

**Logic:** Defines a Mongoose schema and exports it as the `Ad` model. This tells Mongoose the shape of documents in the `ads` collection. Each time `new Ad({...}).save()` is called, a new document is created in MongoDB.

---

### `routes/adRoutes.js` — API Route Definitions

**Location:** `backend/routes/adRoutes.js`

```javascript
router.post("/generate", generateAd); // POST /api/ads/generate
router.get("/:id", getAdById); // GET  /api/ads/:id
```

**Logic:**

1. Creates an Express Router
2. Maps `POST /api/ads/generate` → `generateAd` controller (creates a new ad)
3. Maps `GET /api/ads/:id` → `getAdById` controller (fetches an ad by its MongoDB ID)
4. Exports the router (mounted in `server.js` under `/api/ads`)

---

### `utils/extractKeywords.js` — Keyword Extraction

**Location:** `backend/utils/extractKeywords.js`

```javascript
function extractKeywords(prompt) {
  return prompt
    .toLowerCase() // "A Premium SHOE" → "a premium shoe"
    .replace(/[^a-z0-9\s]/g, "") // Remove punctuation
    .split(/\s+/) // Split into words
    .filter((word) => word.length > 2 && !stopWords.has(word)); // Remove short/filler words
}
```

**Logic — Step by Step:**

1. **Lowercase** — Normalizes casing so "Premium" and "premium" are treated the same
2. **Remove special characters** — Strips punctuation, symbols, keeping only letters, numbers, spaces
3. **Split into words** — Breaks the string on whitespace into an array of words
4. **Filter** — Removes words that are:
   - 2 characters or less (like "a", "is", "to")
   - Present in the `stopWords` set (80+ common English filler words like "the", "and", "for", "with", etc.)
5. **Result:** An array of meaningful keywords, e.g., `["premium", "running", "shoe", "athletes"]`

The `stopWords` set contains words like: a, an, the, is, are, was, were, have, has, do, does, will, would, could, should, to, of, in, for, on, with, at, by, from, but, and, or, if, etc.

---

### `utils/generateTagline.js` — Tagline Generation

**Location:** `backend/utils/generateTagline.js`

**Logic — Step by Step:**

1. Calls `extractKeywords(prompt)` to get meaningful words
2. Takes the **first 2 keywords** and capitalizes each word's first letter:
   - `["premium", "running", "shoe"]` → `"Premium Running"`
   - If no keywords found, falls back to `"Your Product"`
3. Picks a **random template** from 15 pre-written marketing phrases:
   - `"Discover the Best {keyword} Experience"`
   - `"Unleash the Power of {keyword}"`
   - `"{keyword}: Beyond Expectations"`
   - `"The Future of {keyword} is Here"`
   - etc.
4. Replaces `{keyword}` in the template with the capitalized keywords
5. **Example:** Prompt "premium running shoes" → Keywords: `["premium", "running"]` → Main keyword: `"Premium Running"` → Template: `"Elevate Your Life with {keyword}"` → **Result: `"Elevate Your Life with Premium Running"`**

---

### `utils/generateTags.js` — Hashtag Generation

**Location:** `backend/utils/generateTags.js`

**Logic — Step by Step:**

1. Calls `extractKeywords(prompt)` to get meaningful words
2. **Deduplicates** using `new Set()` — removes repeated keywords
3. Takes up to **4 keywords** and prefixes each with `#`:
   - `["premium", "running", "shoe"]` → `["#premium", "#running", "#shoe"]`
4. If less than 5 tags, **fills remaining slots** with random generic marketing tags from this pool:
   - `#ad`, `#trending`, `#premium`, `#bestdeal`, `#musthave`, `#newlaunch`, `#quality`
   - Checks for duplicates before adding
5. Returns exactly **5 tags**
6. **Example:** Prompt "premium running shoes" → `["#premium", "#running", "#shoes", "#trending", "#bestdeal"]`

---

### `services/stabilityAI.js` — AI Image Generation

**Location:** `backend/services/stabilityAI.js`

**Logic — Step by Step:**

1. Creates a `FormData` object and appends:
   - `prompt`: The user's text wrapped in a professional photography context: `"Professional product advertisement photo of ${prompt}, studio lighting, high quality, 4k"`
   - `output_format`: `"webp"` (modern compressed image format)
2. Makes a **POST request** to `https://api.stability.ai/v2beta/stable-image/generate/core`:
   - `Authorization: Bearer ${STABILITY_API_KEY}` header
   - `Accept: image/*` header (expects raw image bytes back)
   - `responseType: arraybuffer` (treats response as binary data, not text)
   - `validateStatus: () => true` (prevents Axios from throwing on non-200 responses)
3. **Error handling:** If status is not 200, reads the error body from the buffer and throws a descriptive error
4. **Returns** the raw image buffer (binary data of the generated WebP image)

---

### `services/cloudinaryUpload.js` — Image Upload to Cloud

**Location:** `backend/services/cloudinaryUpload.js`

**Logic — Step by Step:**

1. Receives the raw image buffer from `stabilityAI.js`
2. Converts it to a **base64 data URI**: `data:image/webp;base64,<base64-encoded-data>`
3. Calls `cloudinary.uploader.upload()` with:
   - The base64 data URI as the image source
   - `folder: "ad_generator"` — organizes uploads in a folder on Cloudinary
4. Cloudinary stores the image permanently and returns a response with `secure_url`
5. **Returns** the `secure_url` (the public HTTPS URL where the image is hosted)

---

### `controllers/adController.js` — Route Handlers

**Location:** `backend/controllers/adController.js`

#### `generateAd(req, res)` — POST /api/ads/generate

This is the **main orchestrator** that ties everything together:

```
Request: { prompt: "a premium running shoe" }
        ↓
Step 1: generateTagline(prompt)  → "Elevate Your Life with Premium Running"
Step 2: generateTags(prompt)     → ["#premium", "#running", "#shoe", "#trending", "#bestdeal"]
Step 3: generateImage(prompt)    → <raw image buffer from Stability AI>
Step 4: uploadImage(buffer)      → "https://res.cloudinary.com/.../image.webp"
Step 5: new Ad({...}).save()     → Saved to MongoDB
        ↓
Response: { _id, prompt, imageUrl, tags, tagline, createdAt }
```

**Logic — Step by Step:**

1. Extracts `prompt` from `req.body`. Returns 400 error if missing.
2. Calls `generateTagline(prompt)` — gets a marketing tagline
3. Calls `generateTags(prompt)` — gets 5 hashtags
4. Calls `generateImage(prompt)` — sends prompt to Stability AI, gets back image bytes
5. Calls `uploadImage(imageBuffer)` — uploads to Cloudinary, gets back a URL
6. Creates a new `Ad` document with all the data and saves to MongoDB
7. Responds with `201 Created` and the full ad object (JSON)
8. **Error handling:** Wraps everything in try/catch; any failure returns 500 with error message

#### `getAdById(req, res)` — GET /api/ads/:id

**Logic:**

1. Extracts the `:id` parameter from the URL
2. Calls `Ad.findById(id)` to query MongoDB
3. If not found, returns 404 with "Ad not found" message
4. If found, returns the full ad document as JSON

---

## Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                                                                 │
│  User types prompt ──→ PromptForm ──→ handleSubmit()           │
│                                           │                     │
│                                    api.generateAd(prompt)       │
│                                           │                     │
│                               POST /api/ads/generate            │
└───────────────────────────────────┬─────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Express + Node)                    │
│                                                                 │
│  adController.generateAd()                                      │
│       │                                                         │
│       ├── extractKeywords(prompt)                               │
│       │       └── Removes stop words, returns keyword array     │
│       │                                                         │
│       ├── generateTagline(prompt)                               │
│       │       └── Picks random template + fills with keywords   │
│       │                                                         │
│       ├── generateTags(prompt)                                  │
│       │       └── Creates 5 hashtags from keywords + generics   │
│       │                                                         │
│       ├── generateImage(prompt)  ──→  Stability AI API          │
│       │       └── Returns raw image buffer (WebP)               │
│       │                                                         │
│       ├── uploadImage(buffer)  ──→  Cloudinary                  │
│       │       └── Returns permanent image URL                   │
│       │                                                         │
│       └── Ad.save()  ──→  MongoDB Atlas                         │
│               └── Stores { prompt, imageUrl, tags, tagline }    │
│                                                                 │
│  Response: { _id, prompt, imageUrl, tags, tagline, createdAt }  │
└───────────────────────────────────┬─────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                                                                 │
│  navigate('/result', { state: data })                           │
│       │                                                         │
│       └── Results Page renders:                                 │
│               ├── ImagePreview   → shows imageUrl               │
│               ├── TaglineDisplay → shows tagline                │
│               ├── TagsDisplay    → shows tags array             │
│               └── GenerateAnotherButton → link to /generate     │
└─────────────────────────────────────────────────────────────────┘
```

---

### Environment Variables (`.env`)

| Variable                | Purpose                         |
| ----------------------- | ------------------------------- |
| `PORT`                  | Server port (default: 5000)     |
| `MONGO_URI`             | MongoDB Atlas connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name         |
| `CLOUDINARY_API_KEY`    | Cloudinary API public key       |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret key       |
| `STABILITY_API_KEY`     | Stability AI authentication key |
