import { Button } from '@/components/ui/button';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="p-48 space-y-12">
      <h1 className="text-6xl font-bold text-center">Landing Page</h1>

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
