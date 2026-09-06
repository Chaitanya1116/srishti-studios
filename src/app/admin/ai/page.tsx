'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAiRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/dashboard?tab=ai');
  }, [router]);
  return null;
}
