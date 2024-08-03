import { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div>
      <h1>Tasks</h1>
    </div>
  );
}
