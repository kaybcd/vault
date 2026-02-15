'use client'; // This must be at the very top!

import { useState } from 'react';
import FundAdminTable from './FundAdminTable'; // Import your fund admin table

export default function VaultDetailsTabs({ vault }: { vault: any }) {
    const [activeTab, setActiveTab] = useState('DETAILS');

    const tabs = [
        { id: 'DETAILS', label: 'Fund Details' },
        { id: 'ADMIN', label: 'Fund Admin' },
        { id: 'POSITION', label: 'Your Position' },
        { id: 'ACTIVITY', label: 'Activity' }
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

                {activeTab === 'ADMIN' && (
                    <div className="bg-[#111] p-8 rounded-3xl border border-slate-800 text-slate-400">
                        Fund admin data coming soon from Supabase...
                    </div>
                )}

                {activeTab === 'POSITION' && (
                    <div className="bg-[#111] p-8 rounded-3xl border border-slate-800 text-slate-400">
                        Current equity and share details...
                    </div>
                )}

                {activeTab === 'ACTIVITY' && (
                    <div className="bg-[#111] p-8 rounded-3xl border border-slate-800 text-slate-400">
                        Recent transaction history...
                    </div>
                )}
            </div>
        </section>
    );
}


