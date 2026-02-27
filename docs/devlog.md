# Devlog

Working notes for the cozy-hotel app. Newest entries are appended as work happens.

## 2026-02-27 09:14:00

Starting this devlog to keep track of what gets worked on in the cozy-hotel app.

## 2026-02-27 10:38:00

The app runs on Express 5.2. Noted the breaking changes worth double-checking: removed app.del, new path route syntax, and req.query behavior.

## 2026-02-27 11:52:00

Went over routes/Auth.js. Local, Google and Facebook strategies are all wired through passport. Next step: re-check the flash messages shown on failed logins.
