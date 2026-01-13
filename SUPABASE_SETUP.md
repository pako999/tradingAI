# 🔐 Supabase Auth Setup

To enable the Login/Upgrade features, you need to connect the frontend to a Supabase project.

1.  **Create Supabase Project**
    - Go to [Supabase.com](https://supabase.com) and create a new project "AlphaPulse".

2.  **Get Credentials**
    - Go to **Project Settings** -> **API**.
    - Copy `Project URL` and `anon public` Key.

3.  **Configure Frontend**
    - Rename/Create `.env.local` in the `frontend` folder.
    - Add these lines:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```
    - *Note:* Keep the existing `NEXT_PUBLIC_API_URL` variable there too!

4.  **Restart Server**
    - Run `npm run dev` again to load the new env vars.

Once connected, the "CONNECT" button in the top right will trigger a real GitHub/Google login flow!
