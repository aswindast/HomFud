## Welcome to HomFud Local Eats Hub

A modern React application for connecting local chefs with customers, built with Vite, TypeScript, and Tailwind CSS.

## Project info

**Repository**: https://github.com/aswindast/HomFud
**URL**: (local development)

## How can I edit this code?

There are several ways to edit this application.

**Use your preferred IDE**

Clone the repo and edit the source files locally.

The only requirement is having Node.js & npm installed.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/aswindast/HomFud.git

# Step 2: Navigate to the project directory.
cd homfud-local-eats-hub

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Deployment

This project is configured for deployment on Vercel.

### Deploy to Vercel

1. Connect your GitHub account to Vercel
2. Import the `HomFud` repository from GitHub
3. Vercel will automatically detect the Vite configuration and deploy
4. Your app will be available at a Vercel domain (e.g., `homfud.vercel.app`)

The `vercel.json` file is already configured with the correct build settings.

## Progressive Web App (PWA)

HomFud is fully configured as a Progressive Web App with the following features:

- **Installable**: Users can install the app on their devices
- **Offline Support**: Basic caching for improved performance
- **Native App Experience**: Standalone display mode with custom icons
- **Cross-platform**: Works on desktop, mobile, and tablets

### PWA Features

- Web App Manifest (`public/manifest.json`)
- Service Worker (`public/sw.js`) for caching
- Responsive icons in multiple sizes
- Theme color integration (#f97316)
- Apple Touch icons for iOS devices

### Icon Setup

The PWA requires custom icons. Please replace the placeholder files in `public/icons/` with actual PNG icons:

1. Visit `public/icons/README.md` for detailed instructions
2. Generate icons using online tools or design software
3. Replace placeholder files with actual PNG images
4. Test the PWA installation on your device

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Deploy this project using your preferred hosting provider. Build it with `npm run build` and serve the static output.

## Can I connect a custom domain to my project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: use your hosting provider's domain setup documentation.
