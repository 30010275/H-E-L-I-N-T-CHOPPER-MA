# Helint Fleet Management Backend

## Setup & Run

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Set your MongoDB URI in `.env` (default is local):
   ```env
   MONGODB_URI=mongodb://localhost:27017/helint
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Fleet
- `GET    /api/fleet` — List all helicopters
- `POST   /api/fleet` — Create helicopter
- `GET    /api/fleet/:id` — Get helicopter details
- `PUT    /api/fleet/:id` — Update helicopter
- `DELETE /api/fleet/:id` — Delete helicopter

### Maintenance Logs
- `GET    /api/maintenance` — List all maintenance logs
- `POST   /api/maintenance` — Create maintenance log
- `GET    /api/maintenance/:id` — Get maintenance log details
- `PUT    /api/maintenance/:id` — Update maintenance log
- `DELETE /api/maintenance/:id` — Delete maintenance log
- `POST /api/maintenance/:id/comment` — Add a comment to a maintenance log

## Authentication
- `POST /api/auth/register` — Register a new user (admin/technician)
- `POST /api/auth/login` — Login and receive JWT token

### Usage
- Send `Authorization: Bearer <token>` header for protected endpoints (aircraft/maintenance create, update, delete, comment)

#### Example: Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "username": "admin", "password": "yourpassword", "role": "admin" }'
```

#### Example: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "username": "admin", "password": "yourpassword" }'
```

#### Example: Authenticated Request
```bash
curl -X POST http://localhost:5000/api/fleet \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "name": "AW139", "type": "Executive Class", "capacity": 12, "status": "active" }'
```

## Example MongoDB Schema
See `models/Helicopter.js` for full schema.

## Example Requests

### Create Helicopter
```bash
curl -X POST http://localhost:5000/api/fleet \
  -H "Content-Type: application/json" \
  -d '{
    "name": "AW139",
    "type": "Executive Class",
    "imageUrl": "https://...",
    "capacity": 12,
    "status": "active"
  }'
```

### Get All Helicopters
```bash
curl http://localhost:5000/api/fleet
```

### Get One Helicopter
```bash
curl http://localhost:5000/api/fleet/<id>
```

### Update Helicopter
```bash
curl -X PUT http://localhost:5000/api/fleet/<id> \
  -H "Content-Type: application/json" \
  -d '{ "status": "maintenance" }'
```

### Delete Helicopter
```bash
curl -X DELETE http://localhost:5000/api/fleet/<id>
```

## Example Requests (Maintenance)

### Create Maintenance Log
```bash
curl -X POST http://localhost:5000/api/maintenance \
  -H "Content-Type: application/json" \
  -d '{
    "registration": "5Y-HLI",
    "date": "2025-08-04",
    "technician": "John Mwangi",
    "description": "Routine check - no issues found",
    "hours": 1205
  }'
```

### Get All Maintenance Logs
```bash
curl http://localhost:5000/api/maintenance
```

### Get One Maintenance Log
```bash
curl http://localhost:5000/api/maintenance/<id>
```

### Update Maintenance Log
```bash
curl -X PUT http://localhost:5000/api/maintenance/<id> \
  -H "Content-Type: application/json" \
  -d '{ "description": "Replaced rotor blade" }'
```

### Delete Maintenance Log
```bash
curl -X DELETE http://localhost:5000/api/maintenance/<id>
```

### Add Comment to Maintenance Log
```bash
curl -X POST http://localhost:5000/api/maintenance/<id>/comment \
  -H "Content-Type: application/json" \
  -d '{ "text": "Rotor replaced", "author": "Grace Kamau" }'
```

### Audit Trail
- `createdBy` and `updatedBy` fields are tracked for each log.
