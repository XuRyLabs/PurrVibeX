# 🚀 PurrVibeX Deployment Setup Guide

## GitHub Actions Secrets Required

Workflow CI/CD cần các secrets để deploy. Sau khi setup xong, mỗi lần merge vào `main` (GitHub tạo push mới trên `main`) sẽ tự động deploy.

### 1. Firebase Service Account (Required for frontend deploy)

```bash
# Step 1: Get service account JSON
# Go to: https://console.firebase.google.com
# - Select project: purrvibex
# - Settings → Service Accounts → Generate New Private Key
# - Download JSON file

# Step 2: Encode it and add as GitHub secret
bash setup-firebase-secret.sh
# Follow prompts, copy the output, then:

# Go to: https://github.com/XuRyCodeDao/PurrVibeX/settings/secrets/actions
# - Click "New repository secret"
# - Name: FIREBASE_SERVICE_ACCOUNT
# - Value: Paste the encoded JSON
```

### Important: Base64 Encoding

The `FIREBASE_SERVICE_ACCOUNT` secret **MUST be base64 encoded** (one continuous line, no line breaks). The GitHub Actions workflow will:

1. Decode the base64 string back to JSON
2. Validate that the JSON is valid
3. Pass the JSON to Firebase Hosting deploy action

**⚠️ Do NOT paste the raw JSON directly.** The helper script `setup-firebase-secret.sh` handles encoding automatically.

Troubleshooting decode errors:
- If you see `SyntaxError: Unexpected token 'e'`, the secret was pasted as raw JSON instead of base64.
- Re-run `bash setup-firebase-secret.sh`, carefully copy the entire base64 block (no line breaks), and update the secret.

### 2. Firebase Project Secrets

| Secret | Value | Source |
|--------|-------|--------|
| `FIREBASE_PROJECT_ID` | `purrvibex` | Firebase Console → Project settings |
| `VITE_FIREBASE_API_KEY` | From Firebase config | Firebase Console → Project settings → Your apps |
| `VITE_FIREBASE_AUTH_DOMAIN` | `purrvibex.firebaseapp.com` | Firebase Console |
| `VITE_FIREBASE_STORAGE_BUCKET` | `purrvibex.firebasestorage.app` | Firebase Console |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID | Firebase Console |
| `VITE_FIREBASE_APP_ID` | Your app ID | Firebase Console |

**Note**: These 6 Firebase config secrets can be found in your `frontend/.env` or Firebase Console under "Project settings" → "Your apps" → "Web app settings".

### 3. Backend API Secrets

| Secret | Value | Example |
|--------|-------|---------|
| `VITE_API_URL` | Your Railway backend URL | `https://your-app.up.railway.app` |
| `VITE_PUSHER_APP_KEY` | Pusher app key | From Pusher dashboard |
| `VITE_PUSHER_CLUSTER` | Pusher cluster | `ap1` |
| `VITE_PUSHER_HOST` | Optional hostname | Leave empty for default |
| `VITE_PUSHER_PORT` | `443` | Standard |
| `VITE_PUSHER_SCHEME` | `https` | Standard |

### 4. Railway Deploy Secrets

| Secret | Value | Source |
|--------|-------|--------|
| `RAILWAY_TOKEN` | Your Railway API token | Railway → Account → API Tokens |
| `RAILWAY_PROJECT_ID` | Recommended: Railway project id | Railway project settings |
| `RAILWAY_ENVIRONMENT_ID` | Optional: target environment id | Railway environment settings |
| `BACKEND_HEALTHCHECK_URL` | Optional | `https://your-app.up.railway.app/health` |

---

## ✅ Verify Setup

After adding all secrets, test deploy:

```bash
# 1. Go to GitHub Actions
# 2. Select workflow: "Deploy Frontend → Firebase Hosting"
# 3. Click "Run workflow"
# 4. Monitor logs

# If successful: ✅ Frontend deployed to Firebase
# If failed: Check logs for missing secrets
```

---

## 🔧 Local Build Test

Before pushing, verify build works locally:

```bash
cd frontend
cp .env.example .env
npm install
npm run build
# Should create dist/ folder without errors

cd ../backend
cp .env.example .env
php artisan test
# Should pass all tests
```

---

## 🚨 Troubleshooting

### "firebaseServiceAccount required and not supplied"
→ Missing `FIREBASE_SERVICE_ACCOUNT` secret. Run `bash setup-firebase-secret.sh`

### Build fails with "VITE_FIREBASE_API_KEY undefined"
→ Missing Firebase secrets. Double-check all 6 VITE_FIREBASE_* secrets are set.

### "RAILWAY_TOKEN invalid"
→ Token expired / wrong account / no access vào Railway project. Regenerate token và nếu cần thì thêm `RAILWAY_PROJECT_ID` để workflow target đúng project.

### "Failed to authenticate, have you run firebase login?" / "SyntaxError: Unexpected token 'e'"
→ Firebase service account secret is in wrong format.
   - **Check**: Was Base64 encoding applied? Re-run `bash setup-firebase-secret.sh` and confirm the output is a long single line (base64 encoded), not JSON with `{` and `}`.
   - **Check**: Is the entire base64 string copied to secret? No partial copy, no line breaks, no extra spaces.
   - **If still failing**: Manually decode to check format:
	 ```bash
	 echo "your_base64_string_here" | base64 -d | python3 -m json.tool
	 ```
	 If this fails, your base64 is corrupted or not properly encoded.

### Frontend build fails with "esbuild: command not found"
→ Missing `frontend/node_modules`. The workflow runs `npm ci` to install dependencies. Check that `package-lock.json` or `yarn.lock` is committed.

---

## 📋 Quick Checklist

- [ ] Created `FIREBASE_SERVICE_ACCOUNT` secret (base64 encoded JSON)
- [ ] Added 6 VITE_FIREBASE_* secrets
- [ ] Added VITE_API_URL pointing to Railway backend
- [ ] Added 5 VITE_PUSHER_* secrets
- [ ] Added RAILWAY_TOKEN for backend deploys
- [ ] Added RAILWAY_PROJECT_ID (recommended)
- [ ] Verified FIREBASE_SERVICE_ACCOUNT is base64 encoded (not raw JSON)
- [ ] Tested frontend build locally (`npm run build`)
- [ ] Tested backend (`php artisan test`)
- [ ] Ran workflow manually from GitHub Actions tab

