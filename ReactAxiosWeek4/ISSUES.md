# Known Issues & Notes

- `npx tailwindcss init -p` previously reported an executable detection error on this environment; Tailwind config and PostCSS files were added manually and Tailwind directives were prepended to `src/index.css`.
- Tailwind dev/build should work with Vite; if Tailwind styles do not appear, ensure `postcss` and `autoprefixer` are installed.
- ChessBoard is visual-only: no move handling or game logic implemented yet.
- Axios examples (GET/POST, error handling) are not yet implemented — listed in `TODO.md`.

If you want, I can:
- Add Axios GET/POST examples next and integrate them into the UI.
- Implement piece selection and move handling on the `ChessBoard`.
