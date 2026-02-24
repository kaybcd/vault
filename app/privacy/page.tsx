import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-slate-400 px-8 py-20 lg:py-32">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header Section */}
                <header className="space-y-8">
                    <Link href="/" className="text-slate-500 hover:text-white transition-colors text-sm">
                        ← Back to home
                    </Link>
                    <h1 className="text-6xl font-medium text-blue-400">
                        Privacy Policy
                    </h1>
                    <div className="space-y-1">
                        <h2 className="text-xl text-white font-medium">Introduction</h2>
                        <p className="italic text-slate-500 text-sm font-mono">
                            Last Revised on September 19, 2025
                        </p>
                    </div>
                </header>

                {/* Content Section */}
                <section className="space-y-8 leading-relaxed">
                    <p>
                        This Privacy Policy (<strong className="text-white">"Policy"</strong>) for the CyphaLab Association, a registered association, and its related companies (<strong className="text-white">"Association," "we," "our,"</strong> or <strong className="text-white">"us"</strong>) describes the basis on which we may use and process personal information we may collect from users of the Association’s website (cyphalab.com), the various web apps hosted at that website (including but not limited to app.cyphalab.com) and such apps collectively referred to as <strong className="text-white">"Sites"</strong>.
                    </p>

                    <p>
                        Read this Policy carefully so that you understand why and how we collect and use your personal data (hereinafter referred to as <strong className="text-white">"Personal Information"</strong>). If you do not agree to this Policy, do not use, access, connect to, interact with, or download any of the Services or otherwise provide your information to us.
                    </p>

                    <div className="space-y-6 pt-8">
                        <h3 className="text-white text-lg font-bold tracking-tight uppercase">
                            1. PERSONAL INFORMATION WE COLLECT ABOUT YOU, WHY WE PROCESS IT, AND THE LEGAL BASIS FOR PROCESSING
                        </h3>

                        <p>
                            When you access, use, connect to, or interact with the Sites and/or Services, we may collect certain categories of information about you, including personal data, from a variety of sources.
                        </p>

                        <div className="bg-slate-900/30 border-l-2 border-blue-400 p-6 space-y-4">
                            <h4 className="text-white font-medium italic">Information you provide to us:</h4>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>
                                    Personal data may include (i) any digital-asset, smart-contract, or protocol address (<strong className="text-white">"Wallet"</strong>) information.
                                </li>
                                <li>
                                    Identification information such as your name, job title, and company details provided via our Business Solutions forms.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <footer className="pt-12 border-t border-slate-800 text-xs text-slate-500 italic">
                    © 2026 CyphaLab Association. All rights reserved.
                </footer>
            </div>
        </div>
    );
}