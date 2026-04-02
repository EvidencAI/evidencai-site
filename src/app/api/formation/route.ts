import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    const { nom, email, telephone, entreprise, session, demande } = await request.json();

    if (!nom || !email) {
      return NextResponse.json(
        { error: 'Nom et email requis.' },
        { status: 400 }
      );
    }

    const isInscription = demande === 'inscription';
    const sujet = isInscription
      ? `[Formation] Pré-inscription — ${nom} — ${session}`
      : `[Formation] Demande d'information — ${nom}`;

    await resend.emails.send({
      from: 'EvidencAI <noreply@evidencai.com>',
      to: 'stephane@commenge.net',
      subject: sujet,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <div style="background: #1a1a2e; color: #E07A5F; padding: 16px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">
              ${isInscription ? 'Nouvelle pré-inscription formation' : 'Demande d\'information formation'}
            </h2>
            <p style="margin: 4px 0 0; font-size: 13px; color: #94a3b8;">Décider avec l'IA — De l'usage à la maîtrise stratégique</p>
          </div>
          <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 120px;">Nom</td>
                <td style="padding: 8px 0; font-weight: 600;">${nom}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email</td>
                <td style="padding: 8px 0; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Téléphone</td>
                <td style="padding: 8px 0; font-weight: 600;">${telephone || 'Non renseigné'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Entreprise</td>
                <td style="padding: 8px 0; font-weight: 600;">${entreprise || 'Non renseigné'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Demande</td>
                <td style="padding: 8px 0; font-weight: 600;">${isInscription ? 'Pré-inscription' : 'Demande d\'information'}</td>
              </tr>
              ${isInscription ? `<tr>
                <td style="padding: 8px 0; color: #6b7280;">Session</td>
                <td style="padding: 8px 0; font-weight: 600; color: #E07A5F;">${session}</td>
              </tr>` : ''}
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;">
              ${isInscription
                ? 'Action : transmettre à ALIA Formation pour convention.'
                : 'Action : recontacter le prospect pour qualifier le besoin.'}
              <br/>Répondre à cet email contactera directement ${nom}.
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
