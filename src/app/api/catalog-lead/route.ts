import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Adding a fallback string prevents the SDK from crashing during the build process
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  // Check if the actual key is missing during runtime
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not defined in environment variables");
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { fullName, country, mobile, company, email, catalogLang } = body;

    const data = await resend.emails.send({
      from: 'Texlube Leads <onboarding@resend.dev>', 
      to: ['info@texlubricant.com'],
      subject: `New Catalog Download Lead: ${fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #0D243F;">New Catalog Download Request</h2>
          <p><strong>Selected Language:</strong> ${catalogLang}</p>
          <hr />
          <p style="margin-top: 20px;"><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send lead' }, { status: 500 });
  }
}