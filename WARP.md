# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

**Created:** 2025-01-20  
**Last Updated:** 2025-01-20  
**Version:** 1.0.0

---

## Project Overview

**grainZ** is a comprehensive fitness and health tracking application developed by Maitri Ramaiya, a certified fitness trainer and nutrition specialist. The application focuses on providing personalized fitness training, nutrition coaching, and health tracking with a specific emphasis on Indian dietary preferences and cuisine.

### Key Features
- **Personalized Fitness Coaching**: One-on-one and online training programs
- **Indian Diet Integration**: AI-powered diet plans optimized for Indian users with vegetarian options
- **Health Tracking**: Daily activity monitoring (weight, water intake, sleep, calories)
- **Nutrition Management**: Macro tracking with gram-based nutritional values (protein, carbs, fats)
- **Food Snap Feature**: Quick food logging and nutritional analysis
- **User Dashboard**: Comprehensive overview of health metrics and progress
- **Admin Panel**: Analytics and user management for fitness professionals

### Technology Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with custom animations and gradients
- **UI Components**: shadcn/ui built on Radix UI primitives
- **Backend**: Supabase (Authentication, Database, Real-time)
- **Database**: PostgreSQL via Supabase
- **Package Manager**: npm/pnpm

---

## Quick Start

### Development Commands
```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server (http://localhost:3000)
npm run dev
# or  
pnpm dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Environment Setup
Create `.env.local` file in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace with your actual Supabase project credentials from the Supabase dashboard.

---

## Architecture & File Structure

### Directory Organization
```
grainz/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # User dashboard page
│   ├── admin/            # Admin analytics dashboard
│   ├── login/            # Authentication page  
│   ├── delete-account/   # Account deletion page
│   ├── layout.tsx        # Root layout with fonts (Inter, Poppins)
│   ├── page.tsx          # Landing page with hero section
│   └── globals.css       # Global styles and animations
├── components/           # Reusable React components
│   ├── ui/              # shadcn/ui components (buttons, cards, etc.)
│   ├── navigation-header.tsx  # Main navigation component
│   └── theme-provider.tsx     # Theme context provider
├── lib/                  # Utility functions and configurations
│   ├── supabaseClient.ts # Supabase client configuration
│   └── utils.ts          # Utility functions (cn, etc.)
├── hooks/                # Custom React hooks
│   ├── use-mobile.tsx    # Mobile detection hook
│   └── use-toast.ts      # Toast notification hook
├── public/               # Static assets and images
├── styles/               # Additional stylesheets
└── tailwind.config.ts    # Tailwind configuration
```

### Key Architectural Patterns
- **Next.js App Router**: File-based routing with layouts and page components
- **Server Components**: Default server-side rendering for optimal performance
- **Client Components**: Used for interactive UI elements (marked with "use client")
- **Component Composition**: shadcn/ui components composed with Tailwind utilities

---

## Supabase Integration

### Database Schema
Based on code analysis, the application uses these core tables:

**Users Table (`users`)**
- `id` (UUID, Primary Key)
- `email` (String)
- `username` (String, Optional)  
- `plan` (String) - Subscription plan
- `created_at` (Timestamp)
- `currentweight` (Number)
- `goalweight` (Number)
- `height` (Number)
- `streakdays` (Number)

**Daily Activity Table (`daily_activity`)**
- `user_id` (UUID, Foreign Key)
- `date` (Date)
- `weight` (Number)
- `water_glasses` (Number)
- `calories_intake` (Number)
- `sleep_hours` (Number)

**Daily Nutrition Table (`daily_nutrition`)**
- `user_id` (UUID, Foreign Key)
- `date` (Date)
- `total_calories` (Number)
- `total_protein` (Number) - in grams
- `total_carbs` (Number) - in grams
- `total_fat` (Number) - in grams  
- `total_fiber` (Number) - in grams
- `total_sugar` (Number) - in grams
- `total_sodium` (Number) - in milligrams

### Authentication Flow
- **Google OAuth**: Implemented via Supabase Auth
- **Session Management**: Handled by Supabase client
- **Route Protection**: Dashboard and admin routes check authentication status
- **Account Deletion**: Secure deletion via Supabase Edge Functions

---

## UI Components & Styling

### Design System
- **Color Scheme**: Orange-focused gradient palette (`from-orange-500 to-orange-600`)
- **Typography**: Inter (body text) and Poppins (headings) from Google Fonts
- **Animations**: Custom CSS animations (float, pulse-slow, fade-in-up/down, scale-in)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Component Library Usage
```typescript
// shadcn/ui components are imported from @/components/ui/
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
```

### Custom Tailwind Classes
```css
.gradient-text           # Orange gradient text effect
.section-padding         # Consistent section spacing
.container-custom        # Max-width container with padding
.card-hover             # Hover lift animation for cards
.animate-float          # Floating animation for hero image
```

---

## Feature Implementation

### Diet Planning System
The application prioritizes Indian dietary preferences as specified in the user rules:
- **Randomized AI Plans**: Diet plans should vary when AI plan button is clicked
- **Indian Cuisine Focus**: All diet recommendations center on Indian food options
- **Vegetarian Support**: User dietary preferences stored in database
- **Gram-based Nutrition**: All nutritional values displayed in grams for accurate macro estimation

### Dashboard Features
- **Health Metrics**: Real-time display of user's daily activity and nutrition data
- **Progress Tracking**: Streak days, weight progress, goal tracking
- **Data Visualization**: Cards and progress components for metric display

### Admin Analytics
- **User Management**: View total users, active users, subscription metrics
- **Revenue Tracking**: Monthly revenue, subscription plan breakdown
- **System Monitoring**: Server load, storage usage, API call tracking
- **Health Data Analytics**: Aggregate health data insights

---

## Common Development Tasks

### Adding New Pages
1. Create new directory in `/app` folder
2. Add `page.tsx` with default export React component
3. Include `layout.tsx` if custom layout needed
4. Update navigation in `navigation-header.tsx` if public route

### Creating UI Components
```bash
# Use shadcn/ui CLI to add new components
npx shadcn-ui add [component-name]
```

### Database Schema Updates
```bash
# Use Supabase CLI for migrations
supabase db push
supabase db reset
```

### Adding Animations
1. Define keyframes in `tailwind.config.ts`
2. Add animation classes in `globals.css`
3. Apply animation classes to components

### Handling Authentication
```typescript
// Check user authentication
const { data: { user } } = await supabase.auth.getUser()
if (!user) {
  router.push("/login")
  return
}
```

---

## Best Practices

### Code Style
- Use TypeScript for all new files
- Prefer server components unless interactivity needed
- Follow existing naming conventions (kebab-case for files, PascalCase for components)
- Use Tailwind utilities over custom CSS when possible

### Performance Considerations
- Optimize images using Next.js Image component
- Use React.lazy() for heavy components
- Implement proper loading states
- Minimize bundle size by importing specific utilities

### Database Best Practices  
- Always implement Row Level Security (RLS) policies
- Use TypeScript types for database schemas
- Handle loading and error states in data fetching
- Implement proper pagination for large datasets

---

## Troubleshooting

### Common Issues
- **Supabase Connection**: Verify environment variables in `.env.local`
- **Build Errors**: Check TypeScript types and imports
- **Styling Issues**: Ensure Tailwind classes are properly applied
- **Authentication**: Clear browser localStorage if auth state is stuck

### Development Tips
- Use Supabase Dashboard for real-time database monitoring
- Enable TypeScript strict mode for better error catching
- Use React Developer Tools for component debugging
- Check Network tab for API request/response issues

---

## Resources

### Documentation Links
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)

### Environment Variables Template
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: For production deployments
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### API Endpoints
- **Supabase Edge Functions**: `https://[project-id].supabase.co/functions/v1/`
- **Account Deletion**: `/functions/v1/delete-account` (requires JWT authorization)

---

*This documentation reflects the current state of the grainZ fitness application. Update this file when making significant architectural changes or adding new features.*