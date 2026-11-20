# Automation-CI-CD

Playwright test project with a demo Login and Home page, hosted on GitHub Pages.

- Site source: `site/` (index.html = Login, home.html = Home). Demo login: `admin` / `admin123`
- Page objects: `pages/`
- Tests: `tests/`
- CI: `.github/workflows/ci-pages.yml` runs tests, then deploys `site/` to GitHub Pages.

## Run locally
```
npm install
npx playwright install chromium
npm test
npm run report
```

## Test the hosted site
```
set BASE_URL=https://tankhoa1611.github.io/Automation-CI-CD/
npx playwright test
```
