# Setup Instructions for LMS Landing Project

To fully utilize the new animated components, the project needs to be configured with Tailwind CSS, TypeScript, and Shadcn.

## 1. Setup Tailwind CSS (Vite)
If you haven't already, install Tailwind CSS and its dependencies:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Setup TypeScript
To migrate the project to TypeScript:
```bash
npm install -D typescript @types/react @types/react-dom
```
Rename your `.jsx` files to `.tsx` and `.js` files to `.ts` (where applicable).

## 3. Initialize Shadcn UI
Run the Shadcn CLI to set up the project structure:
```bash
npx shadcn-ui@latest init
```
When prompted, use the following:
- Style: New York
- Base color: Slate
- CSS Variables: Yes

## 4. Install Component Dependencies
The new components require the following:
```bash
npm install motion lucide-react clsx tailwind-merge
```

## Importance of `/components/ui`
Maintaining a `/components/ui` folder is a best practice for several reasons:
- **Separation of Concerns**: Keeps primitive, reusable UI components separate from complex feature-based components.
- **Consistency**: Ensures all basic UI elements follow a unified design language.
- **Ecosystem Compatibility**: Many modern UI libraries and CLI tools (like Shadcn) expect this structure by default.
