🛩️ 1. Aircraft Management
Manage and track helicopters in your fleet.

✅ What it does:

Allows the admin to add new aircraft (e.g., AW139, MD500).

Stores aircraft details like:

Model name

Registration number

Total flight hours

Enables admins to edit or update aircraft information as flying hours increase or aircraft details change.

💡 Why it matters: Helps you track maintenance intervals based on flight hours.

🧾 2. Maintenance Logs
Record all work done on each aircraft.

✅ What it does:

Lets you log maintenance events:

Date of maintenance

Description of work done (e.g., "Replaced rotor blade")

Engineer's name

Parts used or replaced

Shows a maintenance history per aircraft.

💡 Why it matters: Maintains proper records for compliance, audits, and safety checks.

⏰ 3. Upcoming Maintenance Alerts
Notifies admins when maintenance is due.

✅ What it does:

Sets rules like:

"Every 100 flight hours"

"Every 3 months"

Compares current flight hours and last maintenance date

Shows alerts like:

“⚠️ MD500 due for inspection in 20 hours”

“🚨 AW139 overdue for 3-month check”

💡 Why it matters: Prevents missed servicing, keeps helicopters safe and compliant.

🔐 4. Admin Login
Restricts access to authorized users only.

✅ What it does:

Only logged-in admins (via username + password) can:

Add/edit aircraft

Add/edit maintenance logs

Export reports

Others can't access dashboard without logging in.

💡 Why it matters: Protects sensitive maintenance data and ensures authorized handling.

📄 5. Reports
Generate summaries and printable logs.

✅ What it does:

Allows exporting PDF reports of:

Aircraft maintenance history

Upcoming due checks

Monthly or yearly summaries

Useful for:

Sharing with regulatory bodies

Internal audits

Maintenance team reviews

💡 Why it matters: Improves accountability and simplifies compliance with aviation authorities.

✅ Summary:
This MVP helps track helicopter health, ensure timely servicing, and maintain audit-ready records, all behind secure admin access.





























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



