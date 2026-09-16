'use client';

import React, { use } from 'react';
import RangRushPage from '../rangrush/page';
import AetherForgeDetails from '../aether-forge/page';
import KageNoKoeDetails from '@/components/KageNoKoeDetails';

interface GameDetailsProps {
  params: Promise<{ slug: string }>;
}

export default function GameDetails({ params }: GameDetailsProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams?.slug || '';
  const slug = rawSlug.toLowerCase();
  const normSlug = slug.replace(/[^a-z0-9]/g, '');

  if (normSlug.includes('rangrush') || normSlug.includes('rang-rush')) {
    return <RangRushPage />;
  }

  if (normSlug.includes('aetherforge') || normSlug.includes('aether-forge')) {
    return <AetherForgeDetails />;
  }

  // Default to Kage No Koe for kage-no-koe, kage-no-ko, or any in-production game route
  return <KageNoKoeDetails />;
}
