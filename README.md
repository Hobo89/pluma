# Pluma

Static site boilerplate for [GitHub Pages](https://pages.github.com/).

## Local preview

Open `index.html` in a browser, or run a simple server:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `pluma`).
2. Push this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial Pluma boilerplate"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pluma.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages**
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**
5. Choose branch **main** and folder **/ (root)**
6. Save. Your site will be live at `https://YOUR_USERNAME.github.io/pluma/`

## Project structure

```
pluma/
├── index.html      # Main page
├── css/style.css   # Styles
├── js/main.js      # Scripts
├── .nojekyll       # Tells GitHub Pages not to use Jekyll
└── README.md
```

## Custom domain (optional)

Add a `CNAME` file with your domain, then configure DNS in your registrar.
