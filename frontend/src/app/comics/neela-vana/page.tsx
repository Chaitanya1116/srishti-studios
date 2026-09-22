'use client';

import React from 'react';
import { getComicBySlug } from '@/utils/comicsData';
import ComicReader from '@/components/ComicReader';

export default function NeelaVanaComicPage() {
  const comic = getComicBySlug('neela-vana')!;
  return <ComicReader comic={comic} />;
}
