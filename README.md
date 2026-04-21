# OTT_PLATFORM

This repository contains the frontend and backend for the OTT Platform project, including the PocketBase-powered web app and TMDB import services.

## Project Structure

```text
OTT_PLATFORM/
├── .gitignore
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   │   └── tmdbController.js
│   ├── jobs/
│   │   └── tmdbImportJob.js
│   ├── middleware/
│   ├── models/
│   │   └── Content.js
│   ├── routes/
│   │   └── tmdbRoutes.js
│   ├── services/
│   │   └── tmdbService.js
│   ├── uploads/
│   └── utils/
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   └── apps/
│       └── pocketbase/
│           ├── pb_hooks/
│           │   └── otp-forgot-password.pb.js
│           └── web/
│               ├── components.json
│               ├── index.html
│               ├── main.jsx
│               ├── package.json
│               ├── package-lock.json
│               ├── postcss.config.js
│               ├── tailwind.config.js
│               ├── vite.config.js
│               └── src/
│                   ├── App.jsx
│                   ├── index.css
│                   ├── indec.css
│                   ├── components/
│                   │   ├── ContentCard.jsx
│                   │   ├── FilterSidebar.jsx
│                   │   ├── Footer.jsx
│                   │   ├── Header.jsx
│                   │   ├── LoadingSpinner.jsx
│                   │   ├── ProtectedRoute.jsx
│                   │   ├── ScrollToTop.jsx
│                   │   ├── SearchBar.jsx
│                   │   ├── TopRow.jsx
│                   │   ├── TopTenSection.jsx
│                   │   ├── VideoPlayer.jsx
│                   │   └── ui/
│                   │       ├── accordion.jsx
│                   │       ├── alert-dialog.jsx
│                   │       ├── alert.jsx
│                   │       ├── aspect-ratio.jsx
│                   │       ├── avatar.jsx
│                   │       ├── badge.jsx
│                   │       ├── breadcrumb.jsx
│                   │       ├── button-group.jsx
│                   │       ├── button.jsx
│                   │       ├── calendar.jsx
│                   │       ├── card.jsx
│                   │       ├── carousel.jsx
│                   │       ├── chart.jsx
│                   │       ├── checkbox.jsx
│                   │       ├── collapsible.jsx
│                   │       ├── command.jsx
│                   │       ├── context-menu.jsx
│                   │       ├── dialog.jsx
│                   │       ├── drawer.jsx
│                   │       ├── dropdown-menu.jsx
│                   │       ├── empty.jsx
│                   │       ├── field.jsx
│                   │       ├── form.jsx
│                   │       ├── hover-card.jsx
│                   │       ├── input-group.jsx
│                   │       ├── input-otp.jsx
│                   │       ├── input.jsx
│                   │       ├── item.jsx
│                   │       ├── kbd.jsx
│                   │       ├── label.jsx
│                   │       ├── memubar.jsx
│                   │       ├── navigation-menu.jsx
│                   │       ├── pagination.jsx
│                   │       ├── popover.jsx
│                   │       ├── progress.jsx
│                   │       ├── radio-group.jsx
│                   │       ├── resizable.jsx
│                   │       ├── scroll-area.jsx
│                   │       ├── select.jsx
│                   │       ├── separator.jsx
│                   │       ├── sheet.jsx
│                   │       ├── sidebar.jsx
│                   │       ├── skeleton.jsx
│                   │       ├── slider.jsx
│                   │       ├── sonner.jsx
│                   │       ├── spinner.jsx
│                   │       ├── switch.jsx
│                   │       ├── table.jsx
│                   │       ├── tabs.jsx
│                   │       ├── textarea.jsx
│                   │       ├── toast.jsx
│                   │       ├── toaster.jsx
│                   │       ├── toggle-group.jsx
│                   │       ├── toggle.jsx
│                   │       └── tooltip.jsx
│                   ├── contexts/
│                   │   └── AuthContext.jsx
│                   ├── hooks/
│                   │   ├── use-mobile.jsx
│                   │   └── use-toast.js
│                   ├── lib/
│                   │   ├── apiServerClient.js
│                   │   ├── pocketbaseClient.js
│                   │   └── utils.js
│                   └── pages/
│                       ├── AdminDashboard.jsx
│                       ├── CategoriesPage.jsx
│                       ├── ContentDetailPage.jsx
│                       ├── HistoryPage.jsx
│                       ├── HomePage.jsx
│                       ├── LegalPage.jsx
│                       ├── LoginPage.jsx
│                       ├── PasswordResetPage.jsx
│                       ├── PrivacyPolicyPage.jsx
│                       ├── ProfilePage.jsx
│                       ├── SearchPage.jsx
│                       ├── SignupPage.jsx
│                       ├── TermsOfServicePage.jsx
│                       ├── VideoPlayerPage.jsx
│                       └── WatchlistPage.jsx
└── .sixth/
```

## Notes

- `node_modules/` is intentionally excluded from the tree because it is generated by npm.
- `.git/` is intentionally excluded because it is Git metadata, not project source.
- `src/index.css` is the main stylesheet imported by `main.jsx`.
- `src/indec.css` is an older stylesheet copy that still exists in the project.
- The web app uses PocketBase client files in `src/lib/`.

## OTP Email Auth Setup (Nodemailer)

Manual password-based login/signup is still supported.
OTP-based login and signup confirmation are added as optional flows.

### Backend service

Path: `backend/login part`

1. Copy `.env.example` to `.env`.
2. Fill SMTP and PocketBase values.
3. Install dependencies:

```bash
cd backend/login\ part
npm install
```

4. Run the OTP service:

```bash
npm run dev
```

The service runs on `http://127.0.0.1:4000` by default.

### Frontend

Set this in your frontend env (Vite):

```bash
VITE_API_SERVER_URL=http://127.0.0.1:4000
```

If not set, the frontend now defaults to `http://127.0.0.1:4000` for OTP API calls.
