import React from 'react';

export async function generateStaticParams() {
  return [
    { slug: 'history-of-chanderi-silk' },
    { slug: 'sanganeri-vs-bagru-block-printing' },
    { slug: 'choosing-the-right-thread-count' },
  ];
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
