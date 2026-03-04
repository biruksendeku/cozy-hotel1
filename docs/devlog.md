# Devlog

Working notes for the cozy-hotel app. Newest entries are appended as work happens.

## 2026-02-27 09:14:00

Starting this devlog to keep track of what gets worked on in the cozy-hotel app.

## 2026-02-27 10:38:00

The app runs on Express 5.2. Noted the breaking changes worth double-checking: removed app.del, new path route syntax, and req.query behavior.

## 2026-02-27 11:52:00

Went over routes/Auth.js. Local, Google and Facebook strategies are all wired through passport. Next step: re-check the flash messages shown on failed logins.

## 2026-02-27 14:05:00

Sketched the cart flow end to end: add item from the food menu, cart.ejs summary, then checkout. Cart totals still need a tax line.

## 2026-02-27 16:27:00

Brainstormed admin panel improvements: order stats page, food item CRUD, and cleaner table sorting.

## 2026-02-27 19:41:00

multer and cloudinary are already in the dependency list. Wrote down the plan to move food item image uploads into a dedicated middleware.

## 2026-02-27 21:03:00

Good day overall. Devlog habit feels sustainable. Tomorrow: middlewares audit.

## 2026-02-28 10:22:00

Listed every middleware in middlewares/ and where it is mounted. Found two that are only used by admin routes.

## 2026-02-28 11:47:00

express-rate-limit is set up for auth endpoints. Noted that the login limiter should probably also cover the password reset route.

## 2026-02-28 13:31:00

express-session currently defaults to MemoryStore in dev. connect-mongo is installed, so production should use it. Added this to the checklist.

## 2026-02-28 15:09:00

Looked at views/partials. Header and footer are fine, but the flash message partial could use a nicer fade-out.

## 2026-02-28 17:44:00

helmet is enabled. Consider loosening the CSP for cloudinary-hosted images only, instead of disabling it wholesale.

## 2026-02-28 20:18:00

Shorter session today but the middleware audit was worth it. Next week: models and data layer.

## 2026-03-03 09:41:00

Went through models/. User, Food and Order schemas look consistent. The timestamps option is only enabled on some of them; noting it for cleanup.

## 2026-03-03 12:16:00

express-validator covers the signup flow. Food item creation relies on manual checks for now; worth migrating to the same validator style.

## 2026-03-03 15:38:00

controllers/OrderStat.js tracks order states. Wrote down the intended transitions: placed, preparing, delivered, cancelled.

## 2026-03-03 18:52:00

controllers/Email.js sends via nodemailer. Plan: extract the HTML into views/partials so templates are editable without touching logic.

## 2026-03-04 08:57:00

Reading routes/Api.js top to bottom this morning. Response shapes are inconsistent: some endpoints wrap data, some do not.

## 2026-03-04 10:11:00

Decided on a standard response envelope: success, message, data. Older endpoints get migrated gradually.

## 2026-03-04 11:46:00

Went through routes/Admin.js and Admin2.js. The split is confusing; noting that Admin2 should eventually fold into Admin behind role middleware.

## 2026-03-04 13:24:00

Wrote down filter ideas for the public menu: category, price range, vegetarian flag, and search by name.

## 2026-03-04 15:07:00

compression middleware is mounted app-wide. Verified that images served from public/ are not double-compressed.

## 2026-03-04 17:39:00

Drafted deployment steps: set MONGO_URI and SMTP env vars, run npm ci, enable the connect-mongo session store, then smoke-test checkout.

## 2026-03-04 20:45:00

Long but productive day. API standard is decided and a deployment draft exists. Tomorrow: finish the API review.
