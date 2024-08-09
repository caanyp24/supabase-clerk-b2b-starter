import { SignedIn, UserButton } from '@clerk/nextjs';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div>
        <Link href={'/'}>
          <p className="text-xl font-extrabold tracking-tighter">
            SupabaseClerk
          </p>
        </Link>
      </div>
      <div className="flex gap-6 justify-end items-center">
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
