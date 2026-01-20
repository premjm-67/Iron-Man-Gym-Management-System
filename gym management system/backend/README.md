# Backend setup notes

This project now uses `jsonwebtoken` to issue JWTs for authentication.

After pulling changes, run the following in the `backend` folder:

```bash
npm install
```

Environment variables (optional):
- `JWT_SECRET` - secret used to sign/verify tokens. If not provided, a default development secret is used.

Notes:
- Passwords are hashed using `bcryptjs` — register/login now require a password.

Endpoints added/changed:
- POST `/api/members/login` - now accepts `{ phone, password }` and returns `{ success, member, token }` on success
- POST `/api/members/register` - now accepts `{ firstName, lastName, phone, password, ... }` and returns `{ success, member, token }` on success
- GET `/api/members/me` - protected, requires `Authorization: Bearer <token>`, returns `{ success, member }`
- PUT `/api/members/me` - protected, update profile (optional `password` to change password)

Quick test using curl:

Register (returns token):

```bash
curl -s -X POST http://localhost:5000/api/members/register -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","phone":"12345","password":"secret"}' | jq
```

Login (returns token):

```bash
curl -s -X POST http://localhost:5000/api/members/login -H "Content-Type: application/json" -d '{"phone":"12345","password":"secret"}' | jq
```

Use token with /me:

```bash
curl -s -H "Authorization: Bearer <token>" http://localhost:5000/api/members/me | jq
```

Update profile (example):

```bash
curl -s -X PUT -H "Authorization: Bearer <token>" -H "Content-Type: application/json" http://localhost:5000/api/members/me -d '{"firstName":"New","password":"newpass"}' | jq
```

Be sure to restart the backend after installing dependencies.
