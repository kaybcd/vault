import { ArrowUpRight, ShieldCheck, Percent, Activity } from "lucide-react";
import Link from "next/link";

export interface Vault {
  id: string;
  name: string;
  manager: string;
  target_apy: number;
  sharpe_ratio: number;
  description: string;
  updates: string;
  strategy: string;
  // We can add other fields if they exist in the DB, e.g., risk_score, tvl, etc.
  // For now I'm adding optional fields just in case we mock them or find them later
  risk_score?: number;
}

export interface DashboardStats {
  avgApy: number;
  avgSharpe: number;
  maxDrawdown: number; // Placeholder or calculate if data available
  totalTvl: string;    // Placeholder
}

// --- COMPONENT 1: The Top Stats ---
export const GlobalStats = ({ stats }: { stats: DashboardStats }) => {
  const statItems = [
    { label: "Average APY", value: `${stats.avgApy.toFixed(2)}%`, icon: <Percent className="w-4 h-4" />, color: "text-green-400" },
    { label: "Avg. Sharpe Ratio", value: stats.avgSharpe.toFixed(2), icon: <ShieldCheck className="w-4 h-4" />, color: "text-blue-400" },
    { label: "Max Drawdown", value: `${stats.maxDrawdown}%`, icon: <Activity className="w-4 h-4" />, color: "text-red-400" },
    { label: "Total Strategy TVL", value: stats.totalTvl, icon: <ArrowUpRight className="w-4 h-4" />, color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((stat, i) => (
        <div key={i} className="bg-[#0D0F12] border border-gray-800 p-5 rounded-xl">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            {stat.icon} {stat.label}
          </div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT 2: The Table ---
const StrategyTag = ({ label }: { label: string }) => (
  <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-gray-800 text-gray-300 rounded-md mr-2">
    {label}
  </span>
);

export const VaultTable = ({ vaults }: { vaults: Vault[] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0D0F12]">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#16191E] text-gray-400 text-xs uppercase">
          <tr>
            <th className="p-4 font-medium">Vaults / Manager</th>
            <th className="p-4 font-medium">Strategy</th>
            <th className="p-4 font-medium text-center">APY</th>
            <th className="p-4 font-medium text-center">Risk Score</th>
            <th className="p-4 font-medium text-center">Sharpe Ratio</th>
            <th className="p-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {vaults.map((vault) => (
            <tr key={vault.id} className="hover:bg-[#16191E] transition-colors group">
              <td className="p-4">
                <div className="font-bold text-white">{vault.name}</div>
                <div className="text-xs text-gray-500">{vault.manager}</div>
              </td>
              <td className="p-4">
                {/* Treating strategy as a single string for now, but could be array in DB */}
                <StrategyTag label={vault.strategy} />
              </td>
              <td className="p-4 text-center font-mono text-green-400 font-bold">{vault.target_apy}%</td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-1">
                  {[...Array(10)].map((_, idx) => (
                    <div key={idx} className={`w-1 h-4 rounded-full ${idx < (vault.risk_score || 0) ? 'bg-blue-500' : 'bg-gray-700'}`} />
                  ))}
                </div>
              </td>
              <td className="p-4 text-center font-mono text-blue-400 font-bold">{vault.sharpe_ratio}</td>
              <td className="p-4 text-right">
                <Link href={`/vault/${vault.id}`} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 inline-block">
                  Analyze
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};