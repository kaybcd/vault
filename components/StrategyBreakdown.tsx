// Helper to render the rows so we don't repeat code
const DataRow = ({ label, weight }: { label: string; weight: number }) => (
    <div className="flex justify-between py-2 border-b border-slate-800/50 last:border-0 hover:bg-white/5 px-2 transition-colors">
        <span className="text-slate-300 text-sm font-medium">{label}</span>
        <span className="text-white text-sm font-mono">{Number(weight).toFixed(1)}%</span>
    </div>
);

// Helper for Section Headers
const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-slate-700 pb-2 mb-2">
        <span>{title}</span>
        <span>Weight</span>
    </div>
);

export default function StrategyBreakdown({ vault }: { vault: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* 1. TRANSACTION VEHICLE */}
            <div>
                <h3 className="text-xl text-white mb-6">Asset Class</h3>
                <SectionHeader title="Category" />
                {vault.transaction_vehicle?.length > 0 ? (
                    vault.transaction_vehicle.map((item: any) => (
                        <DataRow key={item.id} label={item.category_name} weight={item.weight} />
                    ))
                ) : <EmptyState />}
            </div>

            {/* 2. ASSET CLASS */}
            <div>
                <h3 className="text-xl text-white mb-6">Transaction Vehicle</h3>
                <SectionHeader title="Strategy" />
                {vault.asset_class?.length > 0 ? (
                    vault.asset_class.map((item: any) => (
                        <DataRow key={item.id} label={item.strategy_name} weight={item.weight} />
                    ))
                ) : <EmptyState />}
            </div>

            {/* 3. GEOGRAPHY (Span full width if you like) */}
            <div className="md:col-span-2 mt-4">
                <h3 className="text-xl text-white mb-6">Geography</h3>
                <SectionHeader title="Region" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {vault.geography_breakdown?.length > 0 ? (
                        vault.geography_breakdown.map((item: any) => (
                            <DataRow key={item.id} label={item.region_name} weight={item.weight} />
                        ))
                    ) : <EmptyState />}
                </div>
            </div>
        </div>
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