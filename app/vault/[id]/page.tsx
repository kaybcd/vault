import ChatAgent from "@/components/ChatAgent";
import VaultDetailsTabs from "@/components/VaultDetailsTabs";
import { createClient } from '@supabase/supabase-js'
import FundAdminTable from "@/components/FundAdminTable";

// 1. Keep the connection at the top
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function VaultDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 2. Fetch the data (The Logic)
  const [vaultResponse, performanceResponse] = await Promise.all([
    supabase.from('vaults').select('*').eq('id', id).single(),
    supabase.from('vault_performance').select('*').eq('vault_id', id).order('date', { ascending: false })
  ]);



  const vault = vaultResponse.data;
  const performance = performanceResponse.data;

  // 3. Safety Check
  if (!vault) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="text-xl font-mono opacity-50">VAULT NOT FOUND</p>
      </div>
    );
  }



  // --- UPDATED TRANSFORMATION LOGIC ---
  const matrix: Record<string, Record<string, number>> = {};

  performance?.forEach((row) => {
    // We split the string "2025-01-31" manually to avoid timezone shifts
    const [yearStr, monthStr] = row.date.split('-');
    const year = yearStr;

    // Convert "01" to "Jan", "02" to "Feb", etc.
    const monthIndex = parseInt(monthStr, 10) - 1;
    const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthsArr[monthIndex];

    if (!matrix[year]) matrix[year] = {};
    matrix[year][monthName] = Number(row.monthly_return);
  });

  const years = Object.keys(matrix).sort((a, b) => b.localeCompare(a));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];




  // 4. The UI (What actually shows up on the screen)
  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 md:p-16">
      {/* This wrapper creates the Two-Column Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* LEFT COLUMN: Your Original UI */}
        <div className="flex-1">

          {/* Navigation */}
          <nav className="mb-12 font-mono text-xs text-slate-500 uppercase tracking-widest">
            <a href="/" className="hover:text-emerald-400 transition-colors">← Back to Dashboard</a>
          </nav>

          {/* Fund Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-emerald-500 font-mono text-sm font-bold uppercase tracking-widest block mb-2">
                {vault.strategy}
              </span>
              <h1 className="text-5xl font-bold tracking-tight">{vault.name}</h1>
              <p className="text-slate-400 mt-2 text-lg">Managed by {vault.manager}</p>
            </div>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all transform hover:scale-105">
              Invest Now
            </button>
          </div>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-[#111] p-8 rounded-3xl border border-slate-800">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Target APY</p>
              <p className="text-3xl font-mono font-bold text-emerald-400">{vault.target_apy}%</p>
            </div>
            <div className="bg-[#111] p-8 rounded-3xl border border-slate-800">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Sharpe Ratio</p>
              <p className="text-3xl font-mono font-bold">{vault.sharpe_ratio}</p>
            </div>
            <div className="bg-[#111] p-8 rounded-3xl border border-slate-800">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Status</p>
              <p className="text-3xl font-mono font-bold text-blue-400 uppercase text-sm">Active</p>
            </div>
          </div>


          {/* Description Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Project Overview
            </h2>
            <div className="bg-[#111] border border-slate-800 p-8 rounded-3xl">
              {/* whitespace-pre-wrap is the key for mobile readability and preserving line breaks */}
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {vault.description || "No description provided for this vault yet."}
              </div>
            </div>
          </section>

          {/* Tabs */}
          <VaultDetailsTabs vault={vault} />


          {/* Monthly Performance Table */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              Historical Returns <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">%</span>
            </h2>

            <div className="bg-[#0a0a0a] rounded-3xl border border-slate-800 p-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-slate-500 text-[10px] uppercase tracking-widest">
                    <th className="p-4 text-left border-b border-slate-800">Year</th>
                    {months.map(m => (
                      <th key={m} className="p-4 text-center border-b border-slate-800 font-medium">{m}</th>
                    ))}
                    <th className="p-4 text-center border-b border-slate-800 font-bold text-white">Annual</th>
                  </tr>
                </thead>

                <tbody className="font-mono text-sm">
                  {years.map(year => {
                    const yearlyValues = Object.values(matrix[year] || {});
                    const annualTotal = yearlyValues.reduce((acc, curr) => acc + (Number(curr) || 0), 0);

                    return (
                      <tr key={year} className="border-b border-slate-800/50 last:border-0 hover:bg-white/[0.01]">
                        <td className="p-4 font-bold text-slate-400">{year}</td>

                        {months.map(month => {
                          const val = matrix[year][month];
                          const isPositive = val > 0;
                          const isNegative = val < 0;

                          return (
                            <td key={month} className="p-2">
                              <div className={`
                                w-full py-3 rounded-lg text-center transition-all text-[13px]
                                ${isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                                ${isNegative ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : ''}
                                ${val === undefined ? 'text-slate-800' : ''}
                              `}>
                                {val !== undefined ? `${isPositive ? '+' : ''}${val}%` : '—'}
                              </div>
                            </td>
                          );
                        })}

                        <td className="p-2 pl-6">
                          <div className={`
                            w-full py-3 rounded-lg text-center font-bold border text-white
                            ${annualTotal >= 0 ? 'bg-emerald-600 border-emerald-500' : 'bg-rose-600 border-rose-500'}
                          `}>
                            {annualTotal > 0 ? '+' : ''}{annualTotal.toFixed(2)}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {years.length === 0 && (
                <div className="py-20 text-center text-slate-600 italic text-sm font-mono">
                  No performance data found. Please add rows in Supabase.
                </div>
              )}
            </div>
          </section>

          {/* Updates Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Latest Updates
            </h2>
            <div className="bg-[#111] border border-slate-800 p-8 rounded-3xl">
              {/* whitespace-pre-wrap is the key for mobile readability and preserving line breaks */}
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {vault.updates || "No updates provided for this vault yet."}
              </div>
            </div>
          </section>

        </div>




        {/* RIGHT COLUMN: The Gemini AI Agent */}
        <aside className="lg:w-96">
          <div className="sticky top-8">
            <ChatAgent fundName={vault.name} strategy={vault.strategy} />
          </div>
        </aside>

      </div>
    </main >
  );
}