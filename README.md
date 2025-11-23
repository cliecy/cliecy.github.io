# Cliecy's Portfolio

A cool, 3D interactive portfolio website built with React, Three.js (React Three Fiber), and Framer Motion.

## Features

- **3D Scene**: Interactive 3D elements using `@react-three/fiber` and `@react-three/drei`.
- **Animations**: Smooth entrance and hover animations with `framer-motion`.
- **Responsive**: Works on desktop and mobile.

## Project Structure

- `src/components/Scene.tsx`: The 3D scene configuration (Stars, Lights, Meshes).
- `src/components/Overlay.tsx`: The HTML overlay with text and links.
- `src/App.tsx`: Main entry point combining the 3D canvas and the overlay.
- `src/styles/global.css`: Global styles (dark mode, typography).

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm start
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

## Deployment

This project is configured for GitHub Pages.

```bash
npm run deploy
```