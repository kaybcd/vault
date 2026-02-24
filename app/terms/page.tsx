import Link from 'next/link';

export default function TermsOfUse() {
    return (
        <div className="min-h-screen bg-black text-slate-400 px-8 py-20 lg:py-32">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header Section */}
                <header className="space-y-8">
                    <Link href="/" className="text-slate-500 hover:text-white transition-colors text-sm">
                        ← Back to home
                    </Link>
                    <h1 className="text-6xl font-medium text-blue-300">
                        Terms of use
                    </h1>
                    <p className="italic text-slate-500 text-sm">
                        Version dated January 1, 2026
                    </p>
                </header>

                {/* Content Section */}
                <section className="space-y-8 leading-relaxed">
                    <p>
                        These Terms of Use (hereinafter referred to as the <strong className="text-white">"TOU"</strong>) are concluded between:
                    </p>

                    <ul className="list-disc pl-6 space-y-6">
                        <li>
                            firstly, the <strong className="text-white">CyphaLab Association</strong>, a registered association (the <strong className="text-white">"Association"</strong>, <strong className="text-white">"Us"</strong>, <strong className="text-white">"We"</strong>, <strong className="text-white">"Our"</strong>),
                        </li>
                        <p className="py-2">and,</p>
                        <li>
                            secondly, a natural person or legal entity (hereinafter referred to as the <strong className="text-white">"User"</strong>, <strong className="text-white">"You"</strong>, <strong className="text-white">"Yours"</strong>), who visits or uses CyphaLab Association's Sites, Services, Apps and/or Protocols.
                        </li>
                    </ul>

                    <p>
                        CyphaLab Association and the User are hereafter individually referred to as a <strong className="text-white">"Party"</strong> and referred to jointly as the <strong className="text-white">"Parties"</strong>.
                    </p>

                    <p>
                        These TOU – as may be updated from time to time – govern the terms upon which CyphaLab Association shall provide you with the Services (as defined below). Please read these TOU carefully before you use the Services. By using our Services, you expressly and irrevocably acknowledge that you have read, understood, and accepted everything outlined herein, including the risks set forth in Article 8.
                    </p>

                    <div className="pt-8 border-t border-slate-800">
                        <p className="text-sm">
                            <span className="underline text-white">Important notice:</span> no Services (as defined below) are offered to persons or entities who reside in, are citizens of, or are located in Prohibited Jurisdictions.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}