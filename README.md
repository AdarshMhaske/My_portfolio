# Adarsh Mhaske — Interactive Personal Portfolio

A sleek, responsive, and interactive portfolio website showcasing projects, skills, and work experience. Built as a fully static, single-page website with dynamic background canvas animations and custom color themes.

Live URL: *(Deploy to GitHub Pages to display your site link here)*

---

## Features
- **Logo Loader Shutter:** Modern preloader that fills up and slides out of view.
- **Canvas Particles Mesh:** High-performance background animation that interacts with mouse hovering and cursor proximity tracking.
- **Floating Theme Switcher:** Swap between **Crimson**, **Teal**, **Violet**, and **Emerald** themes instantly. Selected preferences are saved in `localStorage`.
- **Responsive Layout:** Beautiful typography and animations scaled for mobile and desktop screens.
- **Direct Mail Contact Form:** Fully integrated text elements and submit button fallback.

---

## File Structure
- `index.html` - HTML document and semantic layout containers.
- `style.css` - Custom style parameters, CSS variables, and layout animation keyframes.
- `script.js` - Canvas physics model and color switcher handlers.
- `assets/` - Holds your customized avatar badge image.
- `favicon.svg` - Site tab logo icon.

---

## Local Setup & Deployment

### Run Locally
Since this project uses static assets, you do not need to install `npm` or run active servers:
1. Open `index.html` directly in any web browser.
2. Or use a simple HTTP web extension (like VS Code's *Live Server*) to run it.

### Host on GitHub Pages
1. Go to your repository settings page on GitHub.
2. Scroll to the **Pages** menu on the left side.
3. Under **Build and deployment**, set the Source branch to `main` and Folder to `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repository-name>/` in a few minutes!
