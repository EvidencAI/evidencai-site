import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    const { name, email, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nom et email requis.' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'EvidencAI <noreply@evidencai.com>',
      to: 'info@evidencai.com',
      subject: `[CodirAI Beta] Nouvelle candidature — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <div style="background: #1a1a2e; color: #E07A5F; padding: 16px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">Nouvelle candidature beta-testeur CodirAI</h2>
          </div>
          <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #6b7280; font-size: 13px; margin-top: 0;">Reçu via le formulaire <strong>evidencai.com/outils</strong> — section CodirAI</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 100px;">Nom</td>
                <td style="padding: 8px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email</td>
                <td style="padding: 8px 0; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Message</td>
                <td style="padding: 8px 0;">${message}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;">
              Action attendue : générer un code promo CodirAI300 (1 mois gratuit) et répondre au candidat.<br/>
              Répondre directement à cet email contactera le candidat.
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi.' },
      { status: 500 }
    );
  }
}
