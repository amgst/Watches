# Luxury Watch Catalog

## Overview

This is a luxury watch catalog web application that showcases a curated collection of fine timepieces from prestigious brands. The application provides an elegant browsing experience with search, filtering, and detailed product views, inspired by premium e-commerce platforms like Hodinkee and Chrono24.

The application displays watch data parsed from a CSV file, allowing users to explore watches by brand, material, case shape, diameter, and other specifications. The design emphasizes refined elegance with generous whitespace, sophisticated typography, and a premium aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling:**
- React with TypeScript for type safety and component-based architecture
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI Component System:**
- Shadcn UI component library with Radix UI primitives
- Tailwind CSS for styling with a custom design system
- Three font families: Cormorant Garamond (serif headers), Inter (sans-serif body), and Playfair Display (accent)
- Custom color scheme with CSS variables for theming
- Responsive design with mobile-first approach

**Key Pages:**
- Home page with hero section, search/filter controls, and watch grid
- Watch detail page with comprehensive product information
- 404 Not Found page

**State Management:**
- React Query handles server state, caching, and data fetching
- Local component state for UI interactions (filters, search, sorting)
- Filter state includes brands, materials, shapes, and diameter ranges

### Backend Architecture

**Server Framework:**
- Express.js HTTP server
- Custom middleware for JSON request/response logging
- Development mode integrates Vite middleware for HMR

**Data Storage:**
- In-memory storage implementation (MemStorage class)
- Interface-based storage design (IStorage) allows for easy database integration
- Drizzle ORM configured for PostgreSQL (schema defined but not yet connected)
- Watch data loaded from CSV file on server startup

**API Endpoints:**
- `GET /api/watches` - Retrieve all watches
- `GET /api/watches/search` - Search and filter watches with query parameters
- `GET /api/watches/:id` - Get individual watch details

**Data Schema:**
- Watch model includes: brand, family, name, reference, movement details, case specifications, dimensions, and descriptive fields
- Drizzle schema uses PostgreSQL-specific types with UUID primary keys

### Data Processing

**CSV Parser:**
- Custom parser reads semicolon-delimited watch data
- Converts CSV rows into structured InsertWatch objects
- Handles missing/optional fields gracefully
- Data source: luxury watch specifications including Breitling, Patek Philippe, Mido brands

**Search & Filter Implementation:**
- Text search across brand, name, family, and reference fields
- Multi-select filtering by brands, materials, and case shapes
- Diameter range filtering with min/max bounds
- Client-side sorting by brand, name, or diameter

### Design System

**Typography Hierarchy:**
- Display text uses Cormorant Garamond at large sizes (text-6xl to text-7xl)
- Watch names in text-3xl serif
- Brand names in small, uppercase, wide-tracked sans-serif
- Body text in Inter with relaxed leading

**Layout Principles:**
- Full viewport height hero section with background image overlay
- Sticky search/filter bar
- Generous spacing (py-20 to py-32 for sections)
- Max-width containers (max-w-7xl for content, max-w-screen-2xl for grids)
- Card-based watch display with 4:5 aspect ratio placeholders

**Interactive Elements:**
- Hover effects with elevation changes
- Smooth transitions and animations
- Backdrop blur effects for overlays
- Loading skeletons for async content

## External Dependencies

**Core Libraries:**
- `@tanstack/react-query` - Server state management
- `wouter` - Lightweight routing
- `react-hook-form` with `@hookform/resolvers` - Form handling
- `zod` with `drizzle-zod` - Schema validation

**UI Components:**
- `@radix-ui/*` - Accessible component primitives (20+ component packages)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` & `clsx` - Component variant management
- `lucide-react` - Icon library
- `embla-carousel-react` - Carousel functionality

**Database & ORM:**
- `drizzle-orm` - TypeScript ORM
- `drizzle-kit` - Database migrations
- `@neondatabase/serverless` - Neon PostgreSQL driver
- PostgreSQL configured but currently using in-memory storage

**Development Tools:**
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React integration for Vite
- `tsx` - TypeScript execution
- `esbuild` - Production bundler for server code
- Replit-specific plugins for development experience

**Fonts:**
- Google Fonts: Cormorant Garamond, Inter, Playfair Display

**Server:**
- `express` - HTTP server framework
- `connect-pg-simple` - PostgreSQL session store (configured but not active)
- Built-in Node.js modules for file system operations