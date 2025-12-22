'use server';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
  type?: string;
}

export interface ContactFormState {
  status?: 'idle' | 'success' | 'error';
  message?: string;
  errors?: FieldErrors;
}

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'contact@geobiologue-isere.fr';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'Site David Michel <noreply@geobiologue-isere.fr>';

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const phone = formData.get('phone')?.toString().trim() ?? '';
  const type = formData.get('type')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  const errors: FieldErrors = {};
  if (!name) errors.name = 'Merci de préciser votre nom.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Adresse email invalide.';
  }
  if (!type) errors.type = 'Sélectionnez le type de lieu.';
  if (!message) errors.message = 'Merci de décrire votre besoin.';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Certaines informations sont manquantes.', errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Missing RESEND_API_KEY environment variable.');
    return {
      status: 'error',
      message: 'Service de messagerie indisponible. Merci de réessayer plus tard.',
    };
  }

  const payload = {
    from: CONTACT_FROM_EMAIL,
    to: [CONTACT_EMAIL],
    reply_to: email,
    subject: `Nouveau message de ${name} - ${type}`,
    text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone || 'Non communiqué'}\nType de lieu: ${type}\n\nMessage:\n${message}`,
    html: `
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone || 'Non communiqué'}</p>
      <p><strong>Type de lieu:</strong> ${type}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend API error:', errorText);
    return {
      status: 'error',
      message: "L'envoi a échoué. Merci de réessayer dans un instant.",
    };
  }

  return {
    status: 'success',
    message: 'Merci, votre message a bien été envoyé. Je vous réponds rapidement.',
  };
}
