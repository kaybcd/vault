import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)



export default async function Home() {
  // Fetch all vaults
  const { data: vaults, error } = await supabase.from('vaults').select('*')

  if (error) return <div className="p-20 text-red-500 text-center">Error: {error.message}</div>

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">Vault Gallery</h1>
          <p className="text-slate-400 mt-2">Institutional Yield Aggregator — Management View</p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {vaults?.map((vault) => (
            <div key={vault.id} className="bg-[#111] border border-slate-800 p-6 rounded-2xl flex justify-between items-center hover:border-emerald-500/50 transition-all">
              <div>
                <h2 className="text-xl font-bold">{vault.name}</h2>
                <p className="text-sm text-slate-500">{vault.strategy}</p>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Target APY</p>
                  <p className="text-xl font-mono text-emerald-400 font-bold">{vault.target_apy}%</p>
                </div>
                <a 
                  href={`/vault/${vault.id}`} 
                  className="bg-white text-black px-6 py-2 rounded-lg font-bold text-sm uppercase hover:bg-emerald-400 transition-colors"
                >
                  View Analytics
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}


