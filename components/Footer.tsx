import Link from 'next/link';

export default function Footer() {
    const footerSections = [
        {
            title: "Resources",
            links: [
                { name: "Term of Use", url: "/terms" },
                { name: "Privacy Policy", url: "/privacy" },
                { name: "Legal Notice", url: "/legalnotice" },
                { name: "Disclaimers", url: "/disclaimers" },
            ],
        },
        {
            title: "Data & Analytics",
            links: [
                { name: "RWA.xyz", url: "https://rwa.xyz" },
                { name: "Token Terminal", url: "https://linkedin.com/in/yourname" },
                { name: "Defi Llama", url: "https://linkedin.com/in/yourname" },
            ],
        },
        {
            title: "Community",
            links: [
                { name: "Twitter", url: "https://twitter.com/yourname" },
                { name: "LinkedIn", url: "https://linkedin.com/in/yourname" },
                { name: "Help Page", url: "https://linkedin.com/in/yourname" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "Home", url: "/" }, // Internal (Instant load)
                { name: "Contact", url: "/contact" }, // Internal (Instant load)
            ],
        },
    ];

    return (
        <footer className="bg-black text-white py-16 px-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                        {/* Replace with your actual logo icon */}
                        <span className="text-black font-bold text-xl">F</span>
                    </div>
                </div>

                {/* 2. Links Section (Pushed Right) */}
                <div className="flex justify-end w-full"> {/* This pushes the grid itself to the right */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-36 text-left">
                        {footerSections.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h4 className="text-slate-400 text-sm font-medium">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => {
                                        // Check if the URL starts with "http" to determine if it's external
                                        const isExternal = link.url.startsWith("http");

                                        return (
                                            <li key={link.name}>
                                                {isExternal ? (
                                                    // EXTERNAL LINK: Use standard <a> tag
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-500 hover:text-white transition-colors text-sm"
                                                    >
                                                        {link.name}
                                                    </a>
                                                ) : (
                                                    // INTERNAL LINK: Use Next.js <Link> component
                                                    <Link
                                                        href={link.url}
                                                        className="text-slate-500 hover:text-white transition-colors text-sm"
                                                    >
                                                        {link.name}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>


    );
}