import React from 'react';

export async function generateStaticParams() {
  return [
    { slug: 'royal-maroon-chanderi-silk-zari-anarkali-suit-set' },
    { slug: 'emerald-green-hand-block-printed-cotton-suit-set' },
    { slug: 'indigo-blue-bagru-print-kurta-palazzo-dupatta' },
    { slug: 'mustard-yellow-festive-gota-patti-straight-suit-set' },
    { slug: 'maharaja-palace-300-tc-king-size-percale-bedsheet' },
    { slug: 'gulab-bagh-sanganeri-floral-queen-size-bedsheet-set' },
    { slug: 'prod-suit-101' },
    { slug: 'prod-suit-102' },
    { slug: 'prod-suit-103' },
    { slug: 'prod-suit-104' },
    { slug: 'prod-home-201' },
    { slug: 'prod-home-202' },
  ];
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
