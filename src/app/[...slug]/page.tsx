'use client';

import dynamic from "next/dynamic";

const NocoApp = dynamic(() => import('./dynamic-app'), {
  ssr: false,
});

export default function Home() {
  return (
    <NocoApp/>
  );
}
