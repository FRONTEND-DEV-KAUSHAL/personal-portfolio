// Email sending utility using Resend API
// You need to set up a backend service or use serverless functions like Vercel/Netlify

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(data: ContactFormData) {
  try {
    // Always call our backend endpoint to avoid CORS issues and protect our API key
    // In production, this might be a relative path like '/api/send-email'
    const response = await fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `Server error: ${response.statusText}`);
    }

    return { success: true, message: result.message || 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}
