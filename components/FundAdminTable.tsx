export default function FundAdminTable({ vault }: { vault: any }) {
    // We map the labels to the database keys we just created
    const adminDetails = [
        { label: "Strategy", value: vault.strategy_type },
        { label: "Style", value: vault.style },
        { label: "Geographical Exposure", value: vault.geo_exposure },
        { label: "Subscription Liquidity", value: vault.sub_liquidity },
        { label: "Redemption Liquidity", value: vault.redemption_liquidity },
        { label: "Minimum Initial Investment", value: vault.min_investment },
        { label: "Lock-up Period", value: vault.lockup_period },
    ];

    return (
        <div className="border border-slate-800 rounded-3xl overflow-hidden bg-[#0a0a0a]">
            {adminDetails.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row border-b border-slate-800 last:border-0 hover:bg-white/[0.01] transition-colors">
                    {/* Label Section */}
                    <div className="w-full md:w-1/3 bg-white/[0.02] p-5 text-slate-500 text-sm font-medium border-r border-slate-800">
                        {item.label}
                    </div>

                    {/* Value Section */}
                    <div className="w-full md:w-2/3 p-5 text-slate-200 text-sm font-medium">
                        {item.value || "—"}
                    </div>
                </div>
            ))}
        </div>
    );
}