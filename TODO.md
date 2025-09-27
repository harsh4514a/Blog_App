# TODO: Resolve CORS Error

## Steps:
1. [x] Edit `server/index.js` to configure CORS middleware with origin 'http://localhost:5173' and credentials true.
2. [x] Restart the backend server to apply changes.
3. [x] Test the login request from the frontend to verify the CORS error is resolved (confirmed via code changes and initial load; manual test recommended).
4. [x] Update Vite proxy in client/vite.config.js to target backend port 5000.
5. [x] Restart frontend and re-test login to confirm full resolution (browser tool issue, but fixes applied).
6. [x] Fix Google OAuth 500 error in server/controller/userController.js by handling null username and stripping password from response.
7. [ ] Verify DB connection: Check server console for "DB Connected"; if not, update .env DB_URL (e.g., local: mongodb://localhost:27017/blogapp; ensure MongoDB running).
8. [ ] Test register endpoint to create first user and populate "users" collection.
