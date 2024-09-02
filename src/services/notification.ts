import axios from 'axios';

export async function sendEmailNotification(email: string, subject: string, body: string) {
  const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
    personalizations: [{
      to: [{ email }],
      subject,
    }],
    from: { email: 'noreply@yourdomain.com' },
    content: [{
      type: 'text/plain',
      value: body,
    }],
  }, {
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
  });

  return response.data;
}