import { Button } from '@/components/ui/button';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-6xl font-bold">Nextjs-Supabase-Clerk Starter</h1>
      <p>
        A streamlined starter kit featuring organization-based row-level
        security (RLS) and a simple onboarding system.
      </p>
      <div className="flex gap-4 items-center justify-center">
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </SignedIn>
      </div>
    </div>
  );
}
