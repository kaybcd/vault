'use client';

import { useState, useEffect } from 'react';

export default function DisclaimerModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the user has already confirmed in a previous visit
        const hasConfirmed = localStorage.getItem('professional_investor_confirmed');
        if (!hasConfirmed) {
            setIsOpen(true);
        }
    }, []);

    const handleConfirm = () => {
        localStorage.setItem('professional_investor_confirmed', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
            <div className="bg-slate-900 border border-slate-800 p-8 max-w-lg rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">Professional Investor Access</h2>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    By entering this site, you certify that you are a <strong>Professional Investor</strong> or
                    <strong> Accredited Investor</strong> as defined by your local jurisdiction.
                    The content on this site is for informational purposes only and does not
                    constitute financial advice.
                </p>

                <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            id="confirm-check"
                            className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                            I confirm that I am an accredited/professional investor and I accept the terms of use.
                        </span>
                    </label>

                    <button
                        onClick={handleConfirm}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-slate-200 transition-all active:scale-[0.98]"
                    >
                        Enter Site
                    </button>
                </div>
            </div>
        </div>
    );
}