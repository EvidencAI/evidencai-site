import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const subjectLabels: Record<string, string> = {
  atelier: 'Atelier IA',
  formation: 'Formation Qualiopi',
  audit: 'Audit & Solutions',
  outil: 'Nos outils IA',
  autre: 'Autre',
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    const { name, email, phone, entreprise, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 });
    }

    const sujetLabel = subjectLabels[subject] || subject;

    await resend.emails.send({
      from: 'EvidencAI <noreply@evidencai.com>',
      to: 'stephane@commenge.net',
      subject: `[Contact] ${sujetLabel} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <div style="background: #1a1a2e; color: #E07A5F; padding: 16px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">Nouveau message de contact</h2>
            <p style="margin: 4px 0 0; font-size: 13px; color: #94a3b8;">Via evidencai.com/contact</p>
          </div>
          <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Nom</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: 600;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Téléphone</td><td style="padding: 8px 0; font-weight: 600;">${phone || 'Non renseigné'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Entreprise</td><td style="padding: 8px 0; font-weight: 600;">${entreprise || 'Non renseigné'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Sujet</td><td style="padding: 8px 0; font-weight: 600; color: #E07A5F;">${sujetLabel}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px; text-transform: uppercase;">Message</p>
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;">Répondre à cet email contactera directement ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
