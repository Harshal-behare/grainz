This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Delete Account Site

This is a production-ready Next.js site that allows users to sign in with Google (via Supabase Auth) and request deletion of their account and all associated data via a Supabase Edge Function.

## Features
- Landing page at `/delete-account`
- Google sign-in via Supabase Auth
- If signed in, shows user email and a "Delete My Account" button
- Calls your Supabase Edge Function to delete the account and all data
- Responsive, clean UI with Tailwind CSS

## Setup Instructions

### 1. Install Dependencies
```
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
Replace with your actual Supabase project credentials.

### 3. Supabase Setup
- Ensure your Supabase project is configured for Google Auth (in the Supabase dashboard, enable Google provider and set up credentials).
- Deploy your Edge Function to the provided endpoint (see code for endpoint URL).

### 4. Run Locally
```
npm run dev
```
Visit [http://localhost:3000/delete-account](http://localhost:3000/delete-account)

### 5. Deploy
You can deploy to Vercel, Netlify, or any platform that supports Next.js. Make sure to set the same environment variables in your deployment platform.

## Project Structure
- `/src/app/delete-account/page.tsx` - Main page logic
- `/src/utils/supabaseClient.ts` - Supabase client utility
- `.env.local` - Environment variables (not committed)

## Notes
- The delete function calls your Supabase Edge Function at `https://zsmslciskgzvzqvwceos.supabase.co/functions/v1/delete-account` with the user's JWT in the Authorization header.
- After deletion, the user is signed out and redirected to the home page.
- All styling is done with Tailwind CSS.

---

**PROJECT_OVERWRITE:** Be sure to update `.env.local` with your actual Supabase credentials before deploying.
