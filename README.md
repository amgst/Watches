# Luxury Watch Catalog

A full-stack web application showcasing luxury watches with search and filtering capabilities.

## Tech Stack
- **Frontend**: React with TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Express.js with TypeScript
- **Data**: In-memory storage (loaded from CSV)
- **State Management**: React Query
- **Routing**: Wouter

## Features
- Browse luxury watches from prestigious brands
- Search by brand, name, family, or reference
- Filter by materials, case shapes, and diameter
- Sort by brand, name, or diameter
- View detailed watch information

## Deployment to Vercel

This application is configured for deployment to Vercel:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy the app

The application uses:
- `vercel.json` for deployment configuration
- `npm run build` for building the application
- Express server for both API endpoints and serving static files

## Development

To run locally:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:5000

## API Endpoints

- `GET /api/watches` - Retrieve all watches
- `GET /api/watches/search` - Search and filter watches
- `GET /api/watches/:id` - Get individual watch details

## Data Source

Watch data is loaded from `attached_assets/Pasted-Brand-Family-Name-Reference-Movement-Caliber-Movement-Functions-Limited-Case-Material-Glass-Back-Sha-1762758225904_1762758225905.txt`

## Adding Images

- Place image files under `client/public/images/` (e.g., `client/public/images/patek-nautilus-5711.jpg`).
- In the data source (CSV/text), add a column named `image_url` with the public path (e.g., `/images/patek-nautilus-5711.jpg`). If this column is present, the server will populate `imageUrl` for each watch.
- If `image_url` is not provided, the UI will show a placeholder graphic.
- During development, assets in `client/public` are served at the site root; in production they are bundled to `dist/public` and served by the Express server.

## Vercel Configuration

The application includes specific configuration for Vercel deployment:
- `vercel.json` - Deployment configuration
- `server/vercel.ts` - Entry point for Vercel serverless functions