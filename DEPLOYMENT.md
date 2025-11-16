# 🚀 Deployment Instructions

## Step 1: Push to GitHub

```bash
cd d:\Program\Website\purple
git push origin main
```

✅ Changes committed. Now push to GitHub.

## Step 2: Deploy Backend to Render

1. Go to https://dashboard.render.com/
2. Select your Purple Player Backend service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for build to complete (2-3 minutes)
5. Check deployment logs for success

### Expected Logs:
```
✅ MongoDB Connected
🎵 Purple Player server running on port 10000
🔌 Socket.IO enabled
```

## Step 3: Test Registration Locally

Before going live, test with these credentials:

### Test 1: Valid Registration
```
Name:     Test User
Email:    test@example.com
Password: test123          ✅ (6 chars, letter + number)
Avatar:   (optional)
```

Expected result: Registration succeeds ✅

### Test 2: Invalid Password
```
Password: test             ❌ (only 4 chars)
```

Expected error: "Password must be at least 6 characters"

### Test 3: Login
```
Email:    test@example.com
Password: test123
```

Expected result: Login succeeds ✅

## Step 4: Test on Production

Once deployed to Render:

1. Open frontend: https://purple-player-for-my-purple.netlify.app/
2. Try registering with new password rules
3. Try logging in
4. Check Socket.IO connection in DevTools → Network
5. Test real-time sync: Open 2 browser windows, add song in one

## Rollback If Issues

If deployment fails:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or check logs on Render dashboard
# Click "Logs" tab to see error details
```

---

## What's New in This Deployment

✅ Password validation simplified
✅ Better error messages
✅ Bcrypt security explained
✅ Socket.IO real-time sync ready
✅ Group-based user isolation

---

Made with 💜 by Abdul Rahman for Samra Khan
