'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';

export default function DataFetchingExample() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData({ name: 'Fetched User Data', email: 'user@example.com' });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 glass rounded-lg border-white/5 bg-white/5 text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        Simulating server-side fetch...
      </div>
    );
  }

  return (
    <div className="p-6 glass rounded-lg border-white/5 bg-white/5 space-y-4">
      <h2 className="text-xl font-bold">Fetched Content</h2>
      <div className="p-4 bg-black/20 rounded border border-white/10 space-y-2">
        <p className="text-sm text-gray-500 uppercase font-bold tracking-tighter">Name</p>
        <p className="text-lg text-white font-medium">{data.name}</p>
        <p className="text-sm text-gray-500 uppercase font-bold tracking-tighter mt-4">Email</p>
        <p className="text-lg text-white font-medium">{data.email}</p>
      </div>
    </div>
  );
}
