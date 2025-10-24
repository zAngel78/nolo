# Deployment Instructions

## Environment Variables

### Development (Local)
The `.env` file is already configured for local development:
```
VITE_API_URL=http://localhost:3001
```

### Production
Before deploying to production, update the `.env` file with your production backend URL:

```
VITE_API_URL=https://your-backend-url.com
```

**Example production URLs:**
- Vercel: `https://yu-research-backend.vercel.app`
- Render: `https://yu-research-backend.onrender.com`
- Railway: `https://yu-research-backend.up.railway.app`

## Deployment Steps

### 1. Deploy Backend First
1. Deploy `yu-research-backend` to your hosting service (Render, Railway, etc.)
2. Copy the production URL

### 2. Update Frontend Environment
1. Edit `.env` file in `yu-research-admin`
2. Replace `VITE_API_URL` with your backend production URL
3. Save the file

### 3. Deploy Frontend
```bash
npm run build
```

The frontend will now use the production backend URL.

## Important Notes

- ✅ The Instagram data is stored in `yu-research-backend/public/instagram_data/`
- ✅ Make sure to upload this folder when deploying the backend
- ✅ Run `npm run scrape:yu` before deploying to have fresh data
- ✅ The `.env` file is gitignored for security

## Testing Production URL

To test if the backend is working:
```
https://your-backend-url.com/api/health
https://your-backend-url.com/api/instagram/yeshiva_university
```

## CORS Configuration

The backend is already configured to accept requests from any origin:
```javascript
origin: ['http://localhost:5173', 'http://localhost:5174', 'https://nolo-alpha.vercel.app', '*']
```

If you need to restrict it, update `yu-research-backend/server.js` line 11.
