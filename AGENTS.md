# Meetly Development Guide

This document provides essential information for agentic coding agents working on the Meetly project - a React frontend with Flask API and SQLite backend.

## Project Structure

- **Frontend**: `frontend/` - React + Vite SPA with routing via `react-router-dom`
- **Backend**: `server/` - Flask API with SQLite database
- **Database**: SQLite file at `server/database.db`

## Essential Commands

### Frontend Development
- **Install dependencies**: `cd frontend && npm install`
- **Start development server**: `cd frontend && npm run dev` (runs on localhost:5173)
- **Build for production**: `cd frontend && npm run build`
- **Preview production build**: `cd frontend && npm run preview`
- **Lint code**: `cd frontend && npm run lint` (ESLint with React hooks rules)

### Backend Development
- **Install dependencies**: `cd server && pip install -r requirements.txt`
- **Start API server**: `cd server && python app.py` (runs on localhost:5000)
- **Database setup**: Set `build_database = True` in `server/config.py` to recreate tables

### Testing
- No test runner currently configured in the repository
- Manual testing via browser required for UI changes
- API testing via HTTP client for backend changes

## Architecture Overview

### Frontend Architecture
- **Entry point**: `frontend/src/main.jsx` → `frontend/src/App.jsx`
- **Routing**: Centralized in `frontend/src/App.jsx` using `react-router-dom`
- **State management**: Local component state + `profilemanager.js` for user profiles
- **Data persistence**: `localStorage` via `frontend/src/data/profilemanager.js`

### Backend Architecture
- **Framework**: Flask with CORS enabled for frontend
- **Database**: SQLite with basic relational schema
- **API endpoints**: `/api/health`, `/api/createhangout`
- **Database schema**: `hangouts`, `hangout_locations`, `hangout_attendees` tables

## Code Style Guidelines

### File Naming & Organization
- **Components**: PascalCase (e.g., `LetterAvatar.jsx`)
- **Pages**: PascalCase (e.g., `Home.jsx`, `CreateHangout.jsx`)
- **Styles**: Component-pairing (e.g., `Home.css` alongside `Home.jsx`)
- **Data files**: camelCase (e.g., `profilemanager.js`, `useProfile.js`)

### Import Conventions
```jsx
// React imports first
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Component imports next
import Home from "./pages/Home/Home.jsx"
import Profile from "./pages/Profile/Profile.jsx"

// Relative imports for internal modules
import { getProfile, updateFirstName } from '../data/profilemanager.js'
```

### Component Patterns
- **Functional components only** - no class components
- **Props interface**: Keep props minimal and well-typed
- **State management**: Prefer `useState` for local state
- **Side effects**: Use `useEffect` for subscriptions and API calls

### CSS Guidelines
- **Component-scoped**: CSS files live next to their components
- **Simple selectors**: Avoid nested selectors beyond 2-3 levels
- **Flexbox/Grid**: Prefer modern layout methods
- **Global styles**: Define in `frontend/src/styles/global.css`
- **Colors**: Use palette from `frontend/src/constants/pallete.css`

### Data Management Patterns
- **Profile data**: Use `profilemanager.js` for localStorage persistence
- **Subscriptions**: Use the subscription pattern for reactive updates
- **API calls**: Use fetch API with proper error handling
- **Loading states**: Implement loading indicators for async operations

### Backend Patterns
- **Database operations**: Use `get_db()` helper for connection management
- **Error handling**: Return structured JSON responses with status codes
- **CORS**: Configure allowed origins in app.py
- **Environment**: Use `config.py` for configuration management

## Key Files to Understand

### Frontend Core
- `frontend/src/App.jsx` - Routing and main application structure
- `frontend/src/data/profilemanager.js` - User profile state management
- `frontend/src/data/useProfile.js` - React hook for profile data
- `frontend/src/components/Navbar/Navbar.jsx` - Navigation component

### Backend Core
- `server/app.py` - Flask application and API endpoints
- `server/config.py` - Database and application configuration
- `server/database.db` - SQLite database file

### Styling
- `frontend/src/styles/global.css` - Global styles and resets
- `frontend/src/constants/pallete.css` - Color palette and design tokens

## Development Workflow

### Making UI Changes
1. Run `cd frontend && npm run dev` for hot reloading
2. Make changes in `frontend/src/` directories
3. Test changes in browser at localhost:5173
4. Run linting: `cd frontend && npm run lint`

### Making Backend Changes
1. Run `cd server && python app.py` to start API server
2. Test endpoints via HTTP client or frontend integration
3. Database changes may require setting `build_database = True` in config.py

### Adding New Features
1. **New pages**: Add route in `App.jsx`, create component in `pages/`
2. **New components**: Add to `components/` directory with accompanying CSS
3. **New API endpoints**: Add routes in `app.py`, update database schema if needed

## Important Constraints

- **No testing framework**: Do not add test infrastructure without explicit direction
- **Minimal dependencies**: Keep frontend lightweight with existing stack
- **SQLite limitations**: Manual database migrations required
- **Environment**: Development environment uses localhost URLs, production may need CORS updates

## Common Patterns to Follow

### Profile Data Updates
```jsx
import { updateFirstName } from '../data/profilemanager.js'

const handleNameChange = (newName) => {
  updateFirstName(newName) // Automatically saves to localStorage
}
```

### API Integration
```jsx
const createHangout = async (data) => {
  try {
    const response = await fetch('http://localhost:5000/api/createhangout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (error) {
    console.error('API error:', error)
    throw error
  }
}
```

### Component Structure
```jsx
import { useState } from 'react'
import './MyComponent.css'

function MyComponent({ prop1, prop2 }) {
  const [localState, setLocalState] = useState(initialValue)
  
  return (
    <div className="my-component">
      {/* JSX content */}
    </div>
  )
}

export default MyComponent
```