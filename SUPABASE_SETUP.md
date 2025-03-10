# Setting Up Supabase with Prisma

This guide will walk you through the process of setting up Supabase as your PostgreSQL database provider for the Flight Evaluation System.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Log in to your Supabase account
2. Create a new project and note down your project URL and anon key
3. Navigate to the SQL Editor in your Supabase dashboard

## Step 2: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist already)
2. Add the following environment variables to your `.env` file:

```
# Prisma Database URL for Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-SUPABASE-ANON-KEY]"

# NextAuth configuration
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

Replace the placeholders with your actual Supabase project details.

## Step 3: Run Prisma Migrations

Since we've changed the database provider from SQLite to PostgreSQL, we need to recreate our migrations:

```bash
# Generate a new migration
npx prisma migrate dev --name init
```

This will create a new migration file and apply it to your Supabase PostgreSQL database.

## Step 4: Using Supabase in Your Application

The Supabase client is already configured in `src/lib/supabase.ts`. You can import and use it in your components or API routes:

```typescript
import { supabase } from '@/lib/supabase';

// Example: Fetch data directly from Supabase
async function fetchData() {
  const { data, error } = await supabase
    .from('your_table')
    .select('*');
  
  if (error) console.error('Error fetching data:', error);
  return data;
}
```

## Step 5: Prisma and Supabase Together

For most database operations, continue using Prisma as before:

```typescript
import { prisma } from '@/lib/db';

// Example: Fetch flights using Prisma
async function getFlights() {
  const flights = await prisma.flight.findMany({
    include: { airline: true }
  });
  return flights;
}
```

Use Supabase directly when you need its specific features like real-time subscriptions or storage:

```typescript
// Example: Real-time subscription to flight updates
supabase
  .channel('flights')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Flight' }, (payload) => {
    console.log('Flight updated:', payload.new);
  })
  .subscribe();
```

## Troubleshooting

- If you encounter connection issues, verify your DATABASE_URL is correct
- Ensure your Supabase project has the correct database permissions set up
- Check that your IP address is allowed in Supabase's network restrictions

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma with PostgreSQL Guide](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-node-postgresql)