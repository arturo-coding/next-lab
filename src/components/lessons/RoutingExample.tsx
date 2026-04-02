'use client';

import Link from 'next/link';

export default function RoutingExample() {
  return (
    <div className="p-6 glass rounded-lg border-white/5 bg-white/5 space-y-4">
      <h2 className="text-xl font-bold">Navigation Menu</h2>
      <nav className="flex gap-4 p-2 bg-black/20 rounded border border-white/10">
        <Link href="#" className="text-blue-400 hover:underline">Home</Link>
        <Link href="#" className="text-blue-400 hover:underline">About</Link>
        <Link href="#" className="text-blue-400 hover:underline">Settings</Link>
      </nav>
      <p className="text-sm text-gray-400">
        Try clicking the links above. Note that this is a simulated preview.
      </p>
    </div>
  );
}
