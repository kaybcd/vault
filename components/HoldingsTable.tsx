export default function HoldingsTable({ holdings }: { holdings: any[] }) {
    return (
        <div className="w-full text-slate-200">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-slate-700 pb-2 mb-2">

                <span>Fund Holdings</span>
                <span>Weight</span>
            </div>
            <div className="divide-y divide-slate-800">
                {holdings?.map((item, index) => (
                    <div key={index} className="flex justify-between py-4 text-sm">
                        <span className="font-medium">{item.holding_name}</span>
                        <span className="font-mono">{Number(item.weight).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
