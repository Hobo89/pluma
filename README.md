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

## Custom domain — pluma.life

The repo includes a `CNAME` file for **pluma.life**. Configure DNS in Hostinger:

### Hostinger DNS records

In **hPanel → Domains → pluma.life → DNS / DNS Zone**, add:

| Type  | Name | Value               |
|-------|------|---------------------|
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | hobo89.github.io    |

Remove any conflicting A or CNAME records for `@` or `www` first.

### GitHub

1. Open [repo Pages settings](https://github.com/Hobo89/pluma/settings/pages)
2. Under **Custom domain**, enter `pluma.life` and save
3. Wait for DNS to propagate (up to 24 hours, often much faster)
4. Enable **Enforce HTTPS** once the certificate is issued

Site URL: **https://pluma.life**
