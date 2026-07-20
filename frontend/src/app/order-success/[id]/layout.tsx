import React from 'react';

export async function generateStaticParams() {
  return [
    { id: 'ord-sim-101' },
    { id: 'JPL-778899' },
    { id: 'demo-order' },
    { id: '1' },
    { id: '123' },
    { id: 'latest' },
  ];
}

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
