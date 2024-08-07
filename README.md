# Next.js 14 Starter Boilerplate with Clerk and Supabase

This is a simple nextjs 14 starter boilerplate with Clerk as an authentication provider to manage users and organizations and Supabase with a Postgres database to store data assigned to an organization and perform CRUD operations. For this we use the jwt token which contains our org_id with which we can then check RLS settings for this table so that the user can only see, insert, update and delete data within their organization.

#### Tech Stack:

- Nextjs 14
- Clerk
- Supabase
- Shadcn

In diesen einfachen Schritte bekommt ihr den Boilerplate zum laufen.

## 1. Create a SQL query that check the organization ID

Create a function named requesting_org_id() that will parse the Clerk organization ID from the authentication token. This function will be used to set the default value of org_id in a table and in the RLS policies to ensure the user can only access their data.

In the sidebar of your Supabase dashboard, navigate to SQL Editor, then select New query. Paste the following into the editor:

```sql
CREATE OR REPLACE FUNCTION requesting_org_id()
RETURNS TEXT AS $$
    SELECT NULLIF(
        current_setting('request.jwt.claims', true)::json->>'org_id',
        ''
    )::text;
$$ LANGUAGE SQL STABLE;
```

You can check the created function in Databases -> Functions

## 2. Create a table and enable RLS on it

To create the tasks table and enable RLS on it, run the following two queries:
-- Create a 'tasks' table
create table tasks(
id serial primary key,
name text not null,
user_id text not null default requesting_user_id()
);

-- Enable RLS on the table
alter table `tasks` enable row level security;

## 3. Create ID-based RLS policies

Create RLS policies that permit users to read and insert content associated with their organization IDs only.

In the sidebar, navigate to SQL Editor. Run the following queries to add policies for all statements issued on tasks:
