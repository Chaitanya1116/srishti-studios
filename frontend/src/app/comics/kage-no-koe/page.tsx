'use client';

import React from 'react';
import { getComicBySlug } from '@/utils/comicsData';
import ComicReader from '@/components/ComicReader';

export default function KageNoKoeComicPage() {
  const comic = getComicBySlug('kage-no-koe')!;
  return <ComicReader comic={comic} />;
}
