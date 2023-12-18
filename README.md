# Welcome to the ABB9000 by the Silicon Seals

ABB9000 is your AI Crewmate that makes locating information in your manuals a breeze. Simply type your question or give commands by voice and ABB9000 will give you the answer in a snap, providing you with the corresponding sources in the manual.

## Setting up environment variables

1. Create a copy of .env.local.example in your project root and name it .env.local

2. Locate your OpenAI API key by following this guide by following [this guide](https://www.immersivelimit.com/tutorials/adding-your-openai-api-key-to-system-environment-variables) and fill it in under "YOUR_OPENAI_API_KEY" in your .env.local

3. Locate your Supabase variables and fill them in under NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY. \
   [This guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs) goes through a Supabase setup of a simple demo project.

## Running the project locally

1. Open the terminal in your project root

2. Run `npm install`

3. Run `npm run dev`

4. Open http://localhost:3000/ in your browser

5. Create an account or log in

6. Experience the new way to search documentation with ABB9000

## Supabase

The ABB-9000 uses [Supabase](supabase.com) as a back-end.
It is open-source and can be self-hosted on other platforms if desired.

Files are uploaded to a single storage bucket, and data is stored in two tables: files, and file_snippets.
It also use postgres functions for more advanced queries.

### Set up

1. Create a project
2. Create the necessary tables and storage buckets
3. Create the necessary
4. Put two keys in the .env file:
   NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY
