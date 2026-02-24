'use client';

import { useState } from 'react';
import { sendEmail } from './actions';
import Link from 'next/link';

export default function ContactPage() {
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleAction(formData: FormData) {
        setLoading(true);
        const result = await sendEmail(formData);
        if (result.success) setIsSent(true);
        setLoading(false);
    }

    if (isSent) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold">Message Sent</h1>
                    <p className="text-slate-400">Thank you for your message! We will get back to you shortly.</p>
                    <button onClick={() => setIsSent(false)} className="text-blue-500 hover:underline">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white px-8 py-20 lg:py-32">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

                {/* Left Side: Branding */}
                <div className="lg:w-1/3 space-y-6">
                    <Link href="/" className="text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors">
                        ← Back to home
                    </Link>
                    <h1 className="text-6xl font-bold leading-tight">
                        Contact <br /> Our Team
                    </h1>
                    <p className="text-xl text-slate-400 font-light">
                        Business Inquiries & Partnerships
                    </p>
                </div>

                {/* Right Side: Professional Form */}
                <div className="lg:w-2/3">
                    <form action={handleAction} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">

                        <FormInput label="Full name" name="name" placeholder="Name" required />
                        <FormInput label="Email address" name="email" type="email" placeholder="Email" required />
                        <FormInput label="Job title" name="job" placeholder="Your role" required />
                        <FormInput label="Company name" name="company" placeholder="Company" required />
                        <FormInput label="Phone Number" name="phone" placeholder="Phone Number" required />

                        <div className="md:col-span-2 space-y-4">
                            <label className="text-sm text-slate-300">Description of inquiries</label>
                            <textarea
                                name="message"
                                required
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 h-40 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end pt-4">
                            <button
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Helper component to keep the code clean
function FormInput({ label, ...props }: any) {
    return (
        <div className="space-y-4">
            <label className="text-sm text-slate-300">{label}</label>
            <input
                {...props}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 focus:border-blue-500 outline-none transition-all"
            />
        </div>
    );
}