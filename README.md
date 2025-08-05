# HELINT Fleet Management Frontend

A modern React + Vite + TypeScript dashboard for managing helicopter fleets and maintenance logs. Connects to the HELINT backend API for live data, authentication, and CRUD operations.

--

## Features
- Multi-page SPA: Dashboard, Aircraft List, Maintenance Logs, Add/Edit Aircraft, Add/Edit Maintenance, Login
- REST API integration (Node.js/Express/MongoDB backend)
- User authentication (JWT, admin/technician roles)
- Comments and audit trail on maintenance logs
- Advanced search, filtering, sorting, and CSV export
- Responsive, professional UI with loading spinners
- Role-based access for protected actions

---

## Getting Started

### Prerequisites
- Node.js & npm
- Backend API running (see `/server/README.md`)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start frontend:
   ```bash
   npm run dev
   ```
3. Access the app at `http://localhost:5173` (default Vite port)

---

## Usage
- **Login:** Authenticate as admin/technician to access protected features
- **Dashboard:** View fleet stats, recent activity, and fleet highlights
- **Aircraft List:** View, add, edit, delete helicopters (admin only)
- **Maintenance Logs:** View, add, edit, delete logs; add comments; see audit trail
- **Add/Edit Pages:** Forms for creating or updating aircraft/logs
- **Export:** Download CSV of aircraft or maintenance logs
- **Mobile Friendly:** UI adapts for mobile and desktop

---

## Environment Variables
No frontend .env required for local development. API endpoint is hardcoded as `http://localhost:5000` (update in source if needed).

---

## Project Structure
```
src/
  App.tsx         # Main app layout and routing
  pages/          # All main page components
  assets/         # Images and static assets
  App.css         # Global styles
```

---

## License
MIT
