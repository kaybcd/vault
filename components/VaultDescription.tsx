import React from 'react';

export default function VaultDescription({ vault }: { vault: any }) {

    // 1. Stable access to the description object
    // Supabase can return an array (if one-to-many) or an object (if one-to-one).
    // Based on debug, it's returning an object directly.
    const rawDesc = vault?.vault_descriptions;
    const desc = Array.isArray(rawDesc) ? rawDesc[0] : rawDesc;

    // Helper to format text: 
    // 1. Treats double newlines (\n\n) as new paragraphs.
    // 2. Treats single newlines (\n) as spaces to prevent jagged text-justify.
    const formatText = (text: string) => {
        if (!text) return null;
        return text.split(/\n\n+/).map((para, index) => (
            <p key={index} className="leading-relaxed text-sm text-justify mb-4 last:mb-0">
                {para.replace(/\n/g, ' ')}
            </p>
        ));
    };

    return (
        <div className="bg-[#111] p-8 rounded-3xl border border-slate-800 space-y-12">

            {/* Section 1: Investment Strategy */}
            <div>
                <h3 className="text-xl text-white mb-6">
                    Investment Strategy
                </h3>
                <div className="text-slate-200">
                    {formatText(desc?.investment_strategy)}
                </div>
            </div>

            {/* Section 2: Portfolio Construction */}
            <div>
                <h3 className="text-xl text-white mb-6">
                    Portfolio Construction
                </h3>
                <div className="text-slate-200">
                    {formatText(desc?.portfolio_construction)}
                </div>
            </div>

        </div>
    );
}