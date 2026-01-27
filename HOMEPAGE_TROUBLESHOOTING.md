# Homepage Not Opening - Troubleshooting Guide

## समस्या (Problem)
Homepage उघडत नाही, फक्त navbar icons दिसत आहेत आणि page redirect होतोय.

## केलेले बदल (Changes Made)

### 1. BestSeller Component - Better Error Handling
- API fail झाली तर page crash होणार नाही
- Loading state मध्ये काहीही show होणार नाही
- Products नसतील तर section hide होईल

### 2. Fallback Mechanism
- API error आली तर empty array use होईल
- Error UI show होणार नाही (page crash prevent करण्यासाठी)

## तुम्ही करा (Steps to Fix)

### Option 1: Browser Hard Refresh
1. Browser उघडा: `http://localhost:5173`
2. **Hard Refresh** करा:
   - **Chrome/Edge**: `Ctrl + Shift + R` किंवा `Ctrl + F5`
   - **Firefox**: `Ctrl + Shift + R`
3. Cache clear करा:
   - `Ctrl + Shift + Delete`
   - "Cached images and files" select करा
   - "Clear data" click करा
4. Page reload करा

### Option 2: Dev Server Restart
```bash
# Frontend folder मध्ये जा
cd e:\thecasawood\frontend

# Dev server stop करा (Ctrl + C)
# Dev server पुन्हा start करा
npm run dev
```

### Option 3: Check Console Errors
1. Browser मध्ये `F12` press करा
2. "Console" tab वर जा
3. काही errors आहेत का ते बघा
4. Errors असतील तर screenshot घ्या

### Option 4: Check Network Tab
1. Browser मध्ये `F12` press करा
2. "Network" tab वर जा
3. Page reload करा (`F5`)
4. कोणत्या requests fail होत आहेत ते बघा:
   - Red color = Failed requests
   - 404 = File not found
   - 500 = Server error

## तपासा (Verify)

### Backend Running?
```bash
# Terminal मध्ये run करा
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing
```
**Expected Output:** `{"status":"OK","message":"Casawood API is running"}`

### Frontend Running?
```bash
# Terminal मध्ये run करा
netstat -ano | findstr :5173
```
**Expected Output:** Port 5173 वर connection दिसायला हवा

### Products Available?
```bash
# Terminal मध्ये run करा
Invoke-WebRequest -Uri "http://localhost:5000/api/products?limit=5" -UseBasicParsing
```
**Expected Output:** Products list with pagination info

## Common Issues & Solutions

### Issue 1: CORS Error
**Symptom:** Console मध्ये "CORS policy" error
**Solution:** 
- Backend `.env` file तपासा
- `FRONTEND_URL=http://localhost:5173` असायला हवं
- Backend restart करा

### Issue 2: API Connection Failed
**Symptom:** Console मध्ये "Network Error" किंवा "ERR_CONNECTION_REFUSED"
**Solution:**
- Backend server चालू आहे का तपासा
- Port 5000 वर काही चालू आहे का तपासा
- Backend logs तपासा

### Issue 3: Component Crash
**Symptom:** Page blank आहे, काहीही दिसत नाही
**Solution:**
- Browser console errors तपासा
- React DevTools install करा
- Component error boundaries तपासा

### Issue 4: Old Cache
**Symptom:** Changes दिसत नाहीत
**Solution:**
- Hard refresh करा (`Ctrl + Shift + R`)
- Browser cache clear करा
- Incognito mode मध्ये try करा

## Expected Behavior

जेव्हा page properly load होईल:

1. ✅ Navbar icons (location, profile, wishlist, cart)
2. ✅ Hero banner slider (3 images)
3. ✅ Policies section
4. ✅ Popular Categories (6 categories)
5. ✅ Style Inspiration
6. ✅ Featured Collection
7. ✅ Best Sellers (4 products) - या section ला API call होतो
8. ✅ Interior Solutions
9. ✅ Modern Luxury
10. ✅ Craftsmanship
11. ✅ Testimonials
12. ✅ Footer

## Debug Commands

### Check if frontend is building correctly:
```bash
cd e:\thecasawood\frontend
npm run build
```

### Check for JavaScript errors:
```bash
# Browser console मध्ये type करा
console.clear()
# Then reload page and check for errors
```

### Test API directly:
```bash
# Browser मध्ये directly open करा
http://localhost:5000/api/products
```

## Next Steps

1. **पहिला** Hard refresh try करा
2. **दुसरा** Console errors तपासा
3. **तिसरा** Network tab तपासा
4. **चौथा** Dev server restart करा

## मदत हवी असल्यास

जर अजूनही issue आहे तर:
1. Browser console screenshot घ्या
2. Network tab screenshot घ्या
3. Terminal errors copy करा
4. मला errors send करा

---

**Last Updated:** January 27, 2026 at 13:26 IST
**Status:** Troubleshooting in progress
