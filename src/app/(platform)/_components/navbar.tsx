import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
  return (
    <div>
      <div className="px-6 py-4 border-b shadow-sm">
        <div className="w-3/4 mx-auto flex gap-6 justify-end items-center">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
