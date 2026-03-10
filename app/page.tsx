
import { GlobalStats, VaultTable } from "@/components/VaultDashboard";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)



export default async function Home() {
  // 1. Keep your existing Supabase fetch
  const { data: vaultsData, error } = await supabase.from('vaults').select('*');

  if (error) return <div className="p-20 text-red-500 text-center">Error: {error.message}</div>;

  const vaultsRaw = vaultsData || [];

  // Transform data to ensure risk_score exists (mock it if missing from DB)
  const vaults = vaultsRaw.map(v => ({
    ...v,
    risk_score: v.risk_score ?? Math.floor(Math.random() * 10) + 1
  }));

  // Calculate Stats
  const avgApy = vaults.length
    ? vaults.reduce((acc, v) => acc + (v.target_apy || 0), 0) / vaults.length
    : 0;

  const avgSharpe = vaults.length
    ? vaults.reduce((acc, v) => acc + (v.sharpe_ratio || 0), 0) / vaults.length
    : 0;

  // Placeholder for fields we might not have yet
  const stats = {
    avgApy,
    avgSharpe,
    maxDrawdown: -4.2, // Placeholder
    totalTvl: "$1.2B"  // Placeholder
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">Institutional Vaults</h1>
          <p className="text-slate-400 mt-2">Institutional Yield Aggregator — Management View</p>
        </header>

        {/* 2. Add the Global Stats (Static for now or derived from data) */}
        <GlobalStats stats={stats} />

        {/* 3. Add the Vault Table and pass the vaults data to it */}
        <VaultTable vaults={vaults as any[]} />

      </div>
    </main>
  );
}