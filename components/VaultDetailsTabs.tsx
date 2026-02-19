'use client'; // This must be at the very top!

import { useState } from 'react';
import FundAdminTable from './FundAdminTable'; // Import your fund admin table
import HoldingsTable from './HoldingsTable';
import StrategyBreakdown from './StrategyBreakdown';
import VaultDescription from './VaultDescription';

export default function VaultDetailsTabs({ vault }: { vault: any }) {
    const [activeTab, setActiveTab] = useState('DETAILS');

    const tabs = [
        { id: 'DETAILS', label: 'Fund Details' },
        { id: 'DESCRIPTION', label: 'Description' },
        { id: 'BREAKDOWN', label: 'Strategy Breakdown' },
        { id: 'FUND HOLDINGS', label: 'Fund Holdings' }
    ];

    return (
        <section className="mb-20">
            {/* Tab Navigation */}
            <div className="flex gap-8 border-b border-slate-800 mb-8 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-xs font-mono tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'text-emerald-400 border-b-2 border-emerald-400'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        {tab.label.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in duration-500">
                {activeTab === 'DETAILS' && (
                    <div className="space-y-4">
                        {/* We call the table here and pass the vault prop */}
                        <FundAdminTable vault={vault} />
                    </div>
                )}

                {activeTab === 'DESCRIPTION' && (
                    <VaultDescription vault={vault} />
                )}

                {activeTab === 'BREAKDOWN' && (
                    <StrategyBreakdown vault={vault} />
                )}

                {activeTab === 'FUND HOLDINGS' && (
                    <div className="bg-[#111] p-8 rounded-3xl border border-slate-800">
                        <h3 className="text-xl text-white mb-6">Holdings and Exposure</h3>
                        {/* Logic: If length is greater than 0, show table. Otherwise, show EmptyState */}
                        {vault.portfolios?.length > 0 ? (
                            <HoldingsTable holdings={vault.portfolios} />
                        ) : (
                            <EmptyState />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

// Put this at the very bottom of your file
function EmptyState() {
    return (
        <div className="py-10 text-center text-slate-600 italic text-sm font-mono">
            Not Applicable or No Updated Data Found
        </div>
    );
}

