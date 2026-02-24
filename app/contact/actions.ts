'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    // 1. Extract all the new fields using the 'name' attribute from your inputs
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const job = formData.get('job') as string;
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    try {
        await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'info@cyphalab.com',
            subject: `Vault Dashboard -New Business Inquiry from ${company}`,
            // 2. Format the text string to include all the data
            text: `
        New Lead Details:
        -----------------
        Name: ${name}
        Email: ${email}
        Job Title: ${job}
        Company: ${company}
        Phone Number: ${phone}
        Message/Use Case:
        ${message}
      `,
        });
        return { success: true };
    } catch (error) {
        console.error("Email Error:", error);
        return { success: false };
    }
}