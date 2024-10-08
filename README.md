 # Next.js 14 Starter: Integrating Clerk Authentication and Supabase Database

This project offers a robust foundation for building modern web applications using Next.js 14. It seamlessly integrates two powerful services:

1. Secure Authentication: Leverages Clerk's advanced authentication system for user and organization management.
2. Organization-Scoped Data: Utilizes Clerk's JWT tokens, which include the org_id, to enforce data access controls.
3. Row-Level Security (RLS): Implements Supabase's RLS to ensure users can only perform CRUD operations on data within their organization.
4. Full CRUD Functionality: Supports Create, Read, Update, and Delete operations on organization-specific data.
5. Custom Organization Onboarding: A streamlined process for setting up new organizations during user sign-up.


https://github.com/user-attachments/assets/31c87e48-0b13-48c8-93ee-fb4a550be354


#### Tech Stack:

- Nextjs 14
- Clerk
- Supabase
- Shadcn

In these simple steps you can get the boilerplate up and running.

## 1. Create a SQL query that check the organization ID

Create a function named **requesting_org_id()** that will parse the Clerk organization ID from the authentication token. This function will be used to set the default value of **org_id** in a table and in the RLS policies to ensure the user can only access data within their organization.

```sql
CREATE OR REPLACE FUNCTION requesting_org_id()
RETURNS TEXT AS $$
    SELECT NULLIF(
        current_setting('request.jwt.claims', true)::json->>'org_id',
        ''
    )::text;
$$ LANGUAGE SQL STABLE;
```

## 2. Create a table and enable RLS on it

Next, you'll create a **tasks** table and enable RLS on that table. The **tasks** table will also contain a **org_id** column that will use the **requesting_org_id()** function you just created as it's default value. This column will be used in the RLS policies to only return or modify records scoped to the user's account.

To create the **tasks** table and enable RLS on it, run the following two queries:

```sql
-- Create a 'tasks' table
create table tasks(
  id serial primary key,
  name text not null,
  org_id text not null default requesting_org_id()
);

-- Enable RLS on the table
alter table `tasks` enable row level security;
```

## 3. Create ID-based RLS policies

Create RLS policies that permit users to read and insert content associated with their organization IDs only.

```sql
-- SELECT
create policy "select_org_tasks" on public.tasks
    for select
    to authenticated
    using (requesting_org_id() = org_id);

-- INSERT
create policy "insert_org_tasks" on public.tasks
    for insert
    to authenticated
    with check (requesting_org_id() = org_id);

-- UPDATE
create policy "update_org_tasks" on public.tasks
    for update
    to authenticated
    using (requesting_org_id() = org_id);

-- DELETE
create policy "delete_org_tasks" on public.tasks
    for delete
    to authenticated
    using (requesting_org_id() = org_id);
```

## 4. Get your Supabase JWT secret key

1. In the sidebar, navigate to Project **Settings > API**.
2. Under the **JWT Settings** section, save the value in the **JWT Secret** field somewhere secure. This value will be used in the next step.

## 5. Create a Supabase JWT template

Clerk's JWT templates allow you to generate a new valid Supabase authentication token for each signed in user. These tokens allow authenticated users to access your data with Supabase's API.

To create a JWT template for Supabase:

1. Navigate to the Clerk Dashboard.
2. In the navigation sidebar, select **JWT Templates**.
3. Select the **New template** button, then select **Supabase** from the list of options.
4. Configure your template:

- The value of the **Name** field will be required, name it **supabase**.
- Under **Signing key**, add the value of your Supabase **JWT secret key** from the previous step.
- Add the org_id to the token **claims**

```
{
	"aud": "authenticated",
	"role": "authenticated",
	"email": "{{user.primary_email_address}}",
	"org_id": "{{org.id}}",
	"app_metadata": {},
	"user_metadata": {}
}
```

- Select **Save** from the notification bubble to complete setup.

## 6. Add Custom Session token

Customize your session token and add the public metadata. These are needed to check in the middleware whether the user has completed onboarding

In the Clerk Sidebar, click **Session** and then click edit for **Customize session token**. Insert the public metadata for the session

```
{
	"metadata": "{{user.public_metadata}}"
}
```
