'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Email invalide' }),
  phone: z.string().optional(),
  subject: z.enum(['atelier', 'formation', 'audit', 'autre'], {
    message: 'Veuillez sélectionner un sujet',
  }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
  rgpd: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
});

export type ContactFormState = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    subject?: string[];
    message?: string[];
    rgpd?: string[];
    _form?: string[];
  };
  message?: string;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Parse and validate form data
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    subject: formData.get('subject'),
    message: formData.get('message'),
    rgpd: formData.get('rgpd') === 'on',
  };

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // TODO: Send email via Resend when RESEND_API_KEY is configured
    // For now, just log to console
    console.log('Contact form submission:', result.data);

    // Simulated email sending
    if (process.env.RESEND_API_KEY) {
      // const { Resend } = await import('resend');
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({
      //   from: 'contact@evidencai.com',
      //   to: 'stephane@evidencai.com',
      //   subject: `Nouveau contact : ${result.data.subject}`,
      //   html: `
      //     <h2>Nouveau message de contact</h2>
      //     <p><strong>Nom :</strong> ${result.data.name}</p>
      //     <p><strong>Email :</strong> ${result.data.email}</p>
      //     <p><strong>Téléphone :</strong> ${result.data.phone || 'Non renseigné'}</p>
      //     <p><strong>Sujet :</strong> ${result.data.subject}</p>
      //     <p><strong>Message :</strong></p>
      //     <p>${result.data.message}</p>
      //   `,
      // });
      console.log('Email would be sent via Resend');
    } else {
      console.log('RESEND_API_KEY not configured, email not sent');
    }

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      errors: {
        _form: ['Une erreur est survenue. Veuillez réessayer plus tard.'],
      },
    };
  }
}
