# Simulated frontend for Wedding API

A minimal HTML page that simulates your frontend: sign in with Clerk, then call the API with the session token.

## Setup

1. **Get your Clerk script tag**  
   In [Clerk Dashboard](https://dashboard.clerk.com) → **API Keys** → **Quick copy** → choose **JavaScript**. You get a `<script>` tag with your publishable key and Frontend API URL.

2. **Paste it into `index.html`**  
   Replace the placeholder `<script>` in `index.html` (the one with `REPLACE_WITH_YOUR_PUBLISHABLE_KEY` and `REPLACE_WITH_YOUR_FAPI_URL`) with the full script tag from the dashboard.

3. **Start the API** (if not already running):
   ```bash
   yarn dev
   ```
   API runs at `http://localhost:3000`.

4. **Open the page**  
   Either:
   - Open `index.html` in the browser (double‑click or `open dev-frontend/index.html`), or
   - Serve it with a local server to avoid some `file://` limitations:
     ```bash
     npx serve dev-frontend
     ```
     Then open the URL shown (e.g. `http://localhost:3000` — use another port if your API is on 3000).

## Usage

1. Open the page → Clerk sign-in UI appears.
2. Sign in or sign up (use your Clerk app’s allowed methods).
3. After sign-in, the **Call API** section appears.
4. Click **Call API** to send `GET /users/me` with your Bearer token. The response (your user from the API) is shown below the button.

If the API is on a different host or port, change `API_BASE` in the `<script>` in `index.html` (default is `http://localhost:3000`).
