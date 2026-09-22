export interface ComicChapter {
  id: string;
  chapterNumber: number;
  title: string;
  pdfUrl: string;
  description?: string;
  pagesCount?: number;
}

export interface ComicBook {
  id: string;
  title: string;
  japaneseTitle?: string;
  subtitle: string;
  slug: string;
  coverImage: string;
  bannerImage?: string;
  shortDescription: string;
  fullDescription: string;
  releaseYear: string;
  genre: string[];
  pdfUrl: string;
  chapters?: ComicChapter[];
  author: string;
  artist: string;
}

export const COMICS_LIST: ComicBook[] = [
  {
    id: 'comic-kage-no-koe',
    title: 'KAGE NO KOE',
    japaneseTitle: '影の声',
    subtitle: 'The Voice of the Shadow',
    slug: 'kage-no-koe',
    coverImage: '/kage_no_koe_comic_cover.png',
    shortDescription: 'In a forgotten age where shadows gained consciousness, follow Renjiro Kazehara as he unravels the silent mountain sanctuary of Kagamori.',
    fullDescription: 'Deep within the mountains lies Kagamori Village, where residents observe a strict ritual of absolute silence after sunset to avoid calling forth spectral entities. Follow Renjiro Kazehara, a wandering ronin drawn to the village by mysterious murmurs, as he uncovers ancient seals, shadow combat techniques, and the dark forces lurking beyond the seven peaks.',
    releaseYear: '2026',
    genre: ['Dark Fantasy', 'Historical Mystery', 'Psychological'],
    pdfUrl: '/Kage No Koe_Chapter 1.pdf',
    author: 'Srishti Studios Story Team',
    artist: 'Srishti Visual Design Group',
    chapters: [
      {
        id: 'knk-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Voice of the Shadow',
        pdfUrl: '/Kage No Koe_Chapter 1.pdf',
        description: 'Introducing Renjiro Kazehara as he arrives in the quiet sanctuary of Kagamori and witnesses the evening bell ritual.',
        pagesCount: 40
      },
      {
        id: 'knk-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: The Mountain Beyond (山の向こう)',
        pdfUrl: '/Kage No Koe_Chapter 2.pdf',
        description: 'Expanding the mystery beyond Kagamori with Akari, the Nameless Monk, and the secrets of the Seven Mountains.',
        pagesCount: 28
      },
      {
        id: 'knk-ch3',
        chapterNumber: 3,
        title: 'Chapter 3: Echoes of the Seventh Gate',
        pdfUrl: '/Kage No Koe_Chapter 3.pdf',
        description: 'Renjiro confronts the shadow manifestation at the barrier of the seventh peak.',
        pagesCount: 24
      },
      {
        id: 'knk-ch4',
        chapterNumber: 4,
        title: 'Chapter 4: The Shattered Silence',
        pdfUrl: '/Kage No Koe_Chapter 4.pdf',
        description: 'The climactic battle for the fate of Kagamori as ancient seals begin to fracture.',
        pagesCount: 30
      }
    ]
  },
  {
    id: 'comic-neela-vana',
    title: 'NEELA VANA',
    japaneseTitle: '青い森',
    subtitle: 'The Azure Realm',
    slug: 'neela-vana',
    coverImage: '/neela_vana_comic_cover.png',
    shortDescription: 'Journey into the bioluminescent depths of the Blue Forest, where ancient celestial spirits guard the secrets of creation.',
    fullDescription: 'Neela Vana (The Blue Forest) is an original illustrated graphic novel from Srishti Studios. Step into an enchanting cosmic realm of radiant flora, floating monolithic stone arches, and primordial spirit guardians. When the azure canopy begins to fade, a solitary celestial observer must journey across sacred elemental shrines to restore harmony to the universe.',
    releaseYear: '2026',
    genre: ['Cosmic Fantasy', 'Mystical Lore', 'Adventure'],
    pdfUrl: '/Neela Vana.pdf',
    author: 'Srishti Studios Creative Labs',
    artist: 'Srishti Concept Art Studio'
  }
];

export function getComicBySlug(slug: string): ComicBook | undefined {
  if (!slug) return undefined;
  const norm = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  return COMICS_LIST.find(c => {
    const cNorm = c.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
    const idNorm = c.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return c.slug.toLowerCase() === slug.toLowerCase() || cNorm === norm || idNorm === norm;
  });
}
// Comic Data updated for 2026 release with uploaded custom PNG artwork.
