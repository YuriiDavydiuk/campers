# TravelTrucks

TravelTrucks is a responsive camper rental application built as an educational React project. It
demonstrates how to create a typed frontend, work with a REST API, manage server state, build
validated forms, and test application behavior.

## Features

- Browse campers loaded from a remote API.
- Filter campers by location, body type, engine, and transmission.
- Load additional catalog pages without losing active filters.
- Open a detailed camper page with an image gallery and vehicle specifications.
- Read camper reviews and ratings.
- Submit a validated booking request.
- Handle loading, empty, API error, and 404 states.
- Use the application on mobile, tablet, and desktop screens.

## Technology Stack

- React 19 and TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Formik
- Swiper
- CSS Modules
- Jest and React Testing Library
- ESLint and Prettier

## Getting Started

### Prerequisites

Install a recent Node.js LTS release and npm.

### Installation

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Vite will print the local application URL in the terminal, usually `http://localhost:5173`.

The project does not require environment variables. The API base URL is configured in
`src/api/apiClient.ts`.

## Available Scripts

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | Start the Vite development server.        |
| `npm run build`          | Type-check and create a production build. |
| `npm run preview`        | Preview the production build locally.     |
| `npm run lint`           | Run ESLint.                               |
| `npm run format`         | Format the project with Prettier.         |
| `npm test`               | Run the Jest test suite.                  |
| `npm test -- --coverage` | Run tests and generate a coverage report. |

## Application Routes

| Route             | Description                                         |
| ----------------- | --------------------------------------------------- |
| `/`               | Home page.                                          |
| `/catalog`        | Camper catalog with filters and pagination.         |
| `/catalog/:id`    | Camper details, gallery, reviews, and booking form. |
| Any unknown route | 404 page.                                           |

## Project Structure

```text
src/
├── api/                    # Axios client configuration
├── assets/                 # Images and SVG icons
├── components/             # Shared UI components
├── pages/
│   ├── HomePage/
│   ├── CatalogPage/        # Catalog and page-specific components
│   ├── CamperDetailsPage/  # Details and page-specific components
│   └── NotFoundPage/
├── services/               # API request functions
├── styles/                 # Global styles and CSS variables
├── test/                   # Test helpers, fixtures, and integration tests
├── types/                  # Shared TypeScript types
├── App.tsx                 # Application routes
└── main.tsx                # Application entry point
```

Component tests are stored next to their components. Unit tests for the API layer are stored next to
the related API and service files. Integration tests are located in `src/test/integration`.

## Testing

The test suite includes:

- Unit tests for the Axios client and camper service.
- Component tests for shared and page-specific React components.
- Integration tests for catalog filtering, pagination, camper details, booking, and routing.

Run all tests once:

```bash
npm test -- --runInBand
```

Before submitting changes, run:

```bash
npm test -- --runInBand
npm run lint
npm run build
```

## Responsive Layout

The interface uses a mobile-first layout and is checked at the main breakpoints:

- `320px` — mobile
- `768px` — tablet
- `1158px` — desktop

## API

The application uses the public TravelTrucks API:

```text
https://campers-api.goit.study
```

Catalog filtering and pagination are performed by the backend through query parameters. Booking
requests are submitted to the selected camper endpoint.

## Educational Purpose

This project was created for learning and portfolio purposes. Its main goals are to practise React
architecture, TypeScript, API integration, responsive CSS, form handling, accessibility, and
automated testing.
