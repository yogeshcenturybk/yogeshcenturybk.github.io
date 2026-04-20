# Yogesh Century B.K. — Portfolio

A personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it: `yogeshcenturybk.github.io` *(replace with your GitHub username)*
4. Set to **Public**
5. Click **Create repository**

### Step 2 — Upload the files
**Option A — Via GitHub web interface (easiest):**
1. Open your new repository
2. Click **Add file → Upload files**
3. Drag and drop ALL the files (keep the folder structure: `css/`, `js/`, `index.html`)
4. Commit changes

**Option B — Via Git CLI:**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository **Settings**
2. Scroll to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose branch: `main`, folder: `/ (root)`
5. Click **Save**

### Step 4 — Your site is live! 🎉
After ~2 minutes, visit:
`https://YOUR_USERNAME.github.io`

---

## 📁 File Structure
```
portfolio/
├── index.html          ← Main HTML (single page)
├── css/
│   └── style.css       ← All styles & responsive design
├── js/
│   └── main.js         ← Animations, interactions, routing
└── README.md
```

## 🖼️ Adding Your Photo
Replace the placeholder in the **About** section:
1. Add your photo to the project root (e.g., `photo.jpg`)
2. In `index.html`, find the `.photo-placeholder` div and replace with:
```html
<img src="photo.jpg" alt="Yogesh Century B.K." class="profile-photo" />
```
3. In `css/style.css`, add:
```css
.profile-photo {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
```

## 🌐 Custom Domain (Later)
1. Buy your domain (e.g., `yogeshbk.com`)
2. In repo root, create a file named `CNAME` with content: `yogeshbk.com`
3. Point your domain's DNS to GitHub Pages IPs

---
Made with ❤️ from Nepal 🇳🇵
