-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.activity_logs (
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  subtitle text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT activity_logs_pkey PRIMARY KEY (id),
  CONSTRAINT activity_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.comment_likes (
  comment_id uuid,
  user_id uuid,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comment_likes_pkey PRIMARY KEY (id),
  CONSTRAINT comment_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT comment_likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id)
);
CREATE TABLE public.comments (
  post_id uuid,
  user_id uuid,
  content text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id),
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.daily_activity (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  weight double precision,
  water_glasses integer,
  calories_intake integer,
  sleep_hours double precision,
  date date NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT daily_activity_pkey PRIMARY KEY (id),
  CONSTRAINT daily_activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.daily_nutrition (
  user_id uuid NOT NULL,
  date date NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  total_calories integer DEFAULT 0,
  total_protein numeric DEFAULT 0,
  total_carbs numeric DEFAULT 0,
  total_fat numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  total_fiber numeric DEFAULT 0,
  total_sugar numeric DEFAULT 0,
  total_sodium numeric DEFAULT 0,
  CONSTRAINT daily_nutrition_pkey PRIMARY KEY (id),
  CONSTRAINT daily_nutrition_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.diet_meals (
  user_diet_id uuid NOT NULL,
  meal_type text NOT NULL CHECK (meal_type = ANY (ARRAY['breakfast'::text, 'lunch'::text, 'dinner'::text, 'snack'::text])),
  meal_name text NOT NULL,
  image_url text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  calories integer DEFAULT 0,
  protein numeric DEFAULT 0,
  carbs numeric DEFAULT 0,
  fat numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  fiber numeric DEFAULT 0,
  sugar numeric DEFAULT 0,
  sodium numeric DEFAULT 0,
  CONSTRAINT diet_meals_pkey PRIMARY KEY (id),
  CONSTRAINT diet_meals_user_diet_id_fkey FOREIGN KEY (user_diet_id) REFERENCES public.user_diets(id)
);
CREATE TABLE public.logged_meals (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  meal_name text NOT NULL,
  meal_type text NOT NULL CHECK (meal_type = ANY (ARRAY['breakfast'::text, 'lunch'::text, 'dinner'::text, 'snack'::text])),
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  calories integer DEFAULT 0,
  protein numeric DEFAULT 0,
  carbs numeric DEFAULT 0,
  fat numeric DEFAULT 0,
  logged_date date NOT NULL DEFAULT now(),
  fiber numeric DEFAULT 0,
  sugar numeric DEFAULT 0,
  sodium numeric DEFAULT 0,
  CONSTRAINT logged_meals_pkey PRIMARY KEY (id),
  CONSTRAINT logged_meals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.notifications (
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  icon text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  read boolean NOT NULL DEFAULT false,
  action_url text,
  actionable boolean NOT NULL DEFAULT false,
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.post_likes (
  post_id uuid,
  user_id uuid,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT post_likes_pkey PRIMARY KEY (id),
  CONSTRAINT post_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT post_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id)
);
CREATE TABLE public.posts (
  user_id uuid,
  content text,
  image_url text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT posts_pkey PRIMARY KEY (id),
  CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.reminders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  type text NOT NULL,
  time time without time zone,
  repeat_days ARRAY,
  interval_minutes integer,
  is_active boolean NOT NULL DEFAULT false,
  CONSTRAINT reminders_pkey PRIMARY KEY (id),
  CONSTRAINT reminders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.sleep_logs (
  user_id uuid,
  date date NOT NULL,
  hours numeric NOT NULL CHECK (hours >= 0::numeric),
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sleep_logs_pkey PRIMARY KEY (id),
  CONSTRAINT sleep_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.user_diets (
  user_id uuid NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  total_calories integer DEFAULT 0,
  total_protein numeric DEFAULT 0,
  total_carbs numeric DEFAULT 0,
  total_fat numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  total_fiber numeric DEFAULT 0,
  total_sugar numeric DEFAULT 0,
  total_sodium numeric DEFAULT 0,
  CONSTRAINT user_diets_pkey PRIMARY KEY (id),
  CONSTRAINT user_diets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  provider text DEFAULT 'email'::text,
  dietary_preference text CHECK (dietary_preference = ANY (ARRAY['vegetarian'::text, 'non-vegetarian'::text, 'vegan'::text])),
  notifications_enabled boolean NOT NULL DEFAULT true,
  calorie_goal integer DEFAULT 2000,
  id uuid NOT NULL,
  email text NOT NULL,
  username text,
  age integer,
  gender text,
  activitylevel text,
  goalweight numeric,
  currentweight numeric,
  weightlost numeric,
  streakdays integer,
  avatar text,
  medicalconditions ARRAY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  onboarding_completed boolean DEFAULT false,
  purpose text,
  height numeric,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.water_logs (
  user_id uuid,
  date date NOT NULL,
  glasses integer NOT NULL CHECK (glasses >= 0),
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT water_logs_pkey PRIMARY KEY (id),
  CONSTRAINT water_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.weight_logs (
  user_id uuid NOT NULL,
  weight numeric NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  date date NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
  CONSTRAINT weight_logs_pkey PRIMARY KEY (id),
  CONSTRAINT weight_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);