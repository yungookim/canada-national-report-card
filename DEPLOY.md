# Deployment Guide

Your project is built and ready for deployment! The `dist` folder contains all the files needed to host your website.

Here are three easy ways to deploy:

## Option 1: Netlify Drop (Easiest)
1.  Locate the `dist` folder in your project directory: `/Users/dgyk/.gemini/antigravity/scratch/canada-2025-dashboard/dist`
2.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3.  Drag and drop the entire `dist` folder onto the page.
4.  Netlify will instantly deploy your site and give you a live URL!

## Option 2: Vercel
1.  Install Vercel CLI (optional but recommended):
    ```bash
    npm i -g vercel
    ```
2.  Run the deploy command:
    ```bash
    vercel
    ```
3.  Follow the prompts to link your project and deploy.

## Option 3: GitHub Pages
1.  Initialize a git repository if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a repository on GitHub.
3.  Push your code to GitHub.
4.  Go to your repository Settings > Pages.
5.  Select `gh-pages` branch (or configure a workflow to build and deploy).
    *Tip: Since this is a Vite app, you might need a specific GitHub Action for seamless deployment.*

## Local Preview
To test the production build locally before deploying:
```bash
npm run preview
```
