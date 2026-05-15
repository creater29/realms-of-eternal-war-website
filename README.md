# Realms of Eternal War — Website

## File Structure
```
realms-of-eternal-war/
├── index.html          (main website)
├── style.css           (all styling)
├── netlify.toml        (Netlify config)
├── js/
│   └── main.js         (all interactivity)
└── images/
    ├── map.png         (Aethelgard full map)
    ├── poster.png      (hero background)
    ├── logo.png        (ADD THIS — extract from PDF)
    ├── avaloria.png
    ├── azuremere.png
    ├── emberhold.png
    ├── engineer.png
    ├── frostpeak.png
    ├── knight.png
    ├── medival_style.png
    ├── shadowvale.png
    ├── stone_heart.png
    ├── sunreach.png
    ├── verdentia.png
    ├── wildlands.png
    └── windspire.png

## ONE MISSING FILE — ADD BEFORE DEPLOYING
You need to add: images/logo.png
Extract the logo from the PDF using:
- Open Realms_of_Eternal_War_.pdf in Preview
- Take a screenshot of the logo
- Save as images/logo.png with transparent background
- Recommended size: 800x600px minimum

## DEPLOY TO NETLIFY — EXACT STEPS

### Step 1 — GitHub
1. Go to github.com → New repository
2. Name it: realms-of-eternal-war-website
3. Set to Private
4. Create repository

### Step 2 — Upload Files
Option A (Drag and Drop — easiest):
1. Go to your new GitHub repo
2. Click "Add file" → "Upload files"
3. Drag the entire realms-of-eternal-war folder contents
4. Commit changes

Option B (Git commands):
```bash
cd realms-of-eternal-war
git init
git add .
git commit -m "Initial website launch"
git remote add origin https://github.com/YOURUSERNAME/realms-of-eternal-war-website.git
git push -u origin main
```

### Step 3 — Netlify
1. Go to netlify.com → Log in
2. Click "Add new site" → "Import an existing project"
3. Select GitHub → Authorise Netlify
4. Select realms-of-eternal-war-website repo
5. Build settings: Leave everything blank (static site)
6. Click "Deploy site"
7. Site goes live in 60 seconds

### Step 4 — Get Your URL
Netlify gives you: something-random-123.netlify.app
To customise: Site settings → Domain management → Options → Edit site name
Change to: realms-of-eternal-war.netlify.app

### Step 5 — Custom Domain (When Ready)
1. Register realmsofetternalwar.com on namecheap.com ($12/year)
2. In Netlify: Domain settings → Add custom domain
3. In Namecheap: Point nameservers to Netlify's
4. Done — custom domain live in 24 hours

## UPDATING THE WEBSITE
Every time you want to add content:
1. Edit the file on your computer
2. Push to GitHub (drag and drop or git push)
3. Netlify automatically redeploys in 30 seconds

## WHAT TO ADD NEXT
- images/logo.png (extract from PDF — urgent)
- Update Instagram handle in index.html if different
- Add race images as you generate them
- Add dev log entries every 2 weeks
- Update progress percentage in index.html (search for "4%")
