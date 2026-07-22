# VyaparNest Workspace

The project is now split into dedicated `frontend` and `backend` folders so UI work and server work stay separate.

## Structure

- `frontend/`: React + Vite client application
- `frontend/src/features/public-home/`: public landing page UI
- `frontend/src/features/user-panel/`: isolated area for ongoing user panel design
- `backend/`: separate server scaffold for APIs and business logic

## Commands

- `npm run dev`: start the frontend from the workspace root
- `npm run dev:frontend`: start only the frontend
- `npm run dev:backend`: start only the backend
- `npm run build:frontend`: build the frontend
- `npm run lint:frontend`: lint the frontend

## Notes

- Frontend dependencies remain managed from `frontend/package.json`.
- Backend currently uses a minimal Node server scaffold so you can expand routes, controllers, and config cleanly.
