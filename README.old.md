# Darts App

This is a standalone React darts scoring app, extracted from michienzi.dev. It is ready for static hosting on darts.michienzi.dev via Hostfactory.

## Local Development

```bash
npm install
npm start
```

## Build for Production

```bash
npm run build
```

The static files will be output to the `build/` folder.

## Deployment (Hostfactory)

1. **Clone or pull this repo** into your Hostfactory subdomain root (e.g. `public_html/darts.michienzi.dev/`).
2. **On the server:**
   ```bash
   npm install
   npm run build
   cp -r build/* .
   ```
3. Or, upload the contents of `build/` via FTP if you don’t have SSH access.

## Project Structure

- `src/` — All darts app source code
- `public/` — Static assets and HTML
- `build/` — Production output (after build)

## Notes
- The app is self-contained and does not depend on the michienzi.dev portfolio code.
- All Firebase credentials/config must be present in `src/firebase/config.js`.
- Routing assumes `/` as the base path (see `package.json`).

---

For questions or issues, contact [Alain Michienzi](mailto:alain@michienzi.dev).
