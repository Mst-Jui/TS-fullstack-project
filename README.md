# TS Fullstack Project (Next.js + TypeScript + MongoDB)

## 1. Prerequisites
- Node.js v18+ (https://nodejs.org)
- A MongoDB connection string — easiest is a free cluster at https://www.mongodb.com/cloud/atlas
  (or install MongoDB locally and use `mongodb://127.0.0.1:27017/tsproject`)

## 2. Setup (VS Code)
1. Open this folder in VS Code.
2. Open a terminal (Ctrl + `) and run:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your values:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_long_string
   ```
4. Seed demo users + 20 sample items:
   ```
   npm run seed
   ```
5. Start the dev server:
   ```
   npm run dev
   ```
6. Open http://localhost:3000

## 3. Demo Credentials (created by `npm run seed`)
- **User:** user@demo.com / user1234
- **Admin:** admin@demo.com / admin1234

(Use the "Demo User" / "Demo Admin" buttons on the Login page to auto-fill.)

## 4. Project Structure
```
app/
  page.tsx                -> Home page (Hero + 7 sections)
  items/page.tsx          -> Explore/listing page (search, filter, sort, pagination)
  items/[id]/page.tsx     -> Item details page
  items/add/page.tsx      -> Protected: add new item
  items/manage/page.tsx   -> Protected: manage items (view/delete)
  login/page.tsx, register/page.tsx
  about/page.tsx, contact/page.tsx
  api/auth/...            -> register, login, logout, me
  api/items/...           -> list/create/get/delete items
components/               -> Navbar, Footer, Hero, ItemCard, SkeletonCard
lib/                      -> db connection, auth (JWT), Mongoose models, seed script
middleware.ts             -> protects /items/add and /items/manage
```

## 5. What's already implemented (maps to assignment requirements)
- TypeScript everywhere (frontend + API routes)
- Navbar (sticky, responsive, changes links when logged in), Hero (slider), 7 home sections, functional Footer
- Card-based listing with same size/border radius, skeleton loader
- Details page with overview / key info / reviews section
- Explore page: search + category filter + sort + pagination
- Auth: register/login with validation, JWT stored in httpOnly cookie, demo login buttons
- Protected routes via middleware (redirects to /login if not authenticated)
- Add Item + Manage Items (table with View/Delete)
- About + Contact pages

## 6. Things YOU should customize before submitting
- Replace colors in `tailwind.config.ts` if you want a different theme (keep to 3 primary colors).
- Add your own real images (currently uses placehold.co placeholders — replace with real URLs).
- Update Footer contact info / social links.
- Deploy to Vercel (https://vercel.com) for the "Live Website URL" — connect your GitHub repo,
  add MONGODB_URI and JWT_SECRET as Environment Variables in the Vercel dashboard.
- Push this code to a GitHub repository (frontend + backend are combined here since it's
  Next.js full-stack — that satisfies "frontend and backend" repo requirement).

## 7. Submission Checklist (from assignment)
- [ ] Live Website URL (deploy on Vercel)
- [ ] GitHub Repository Link
- [ ] Demo Credentials — User: user@demo.com / user1234, Admin: admin@demo.com / admin1234
- [ ] Confirm no lorem ipsum / placeholder text remains (replace sample text with real content)
- [ ] Test on mobile, tablet, desktop
- [ ] Test protected routes redirect to /login when logged out
