import express from 'express';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  const { name, organization, title, email, message } = req.body;

  // Validate required fields
  if (!name || !organization || !title || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Africa-Europe Health R&D Summit <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'your-email@example.com'],
      replyTo: email,
      subject: `New Contact: ${name} from ${organization}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); padding: 32px 40px; text-align: center;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #FF8C42, #FF6B35); border-radius: 50%; display: inline-block; line-height: 50px; color: white; font-weight: bold; font-size: 18px;">AE</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-top: 16px;">
                            <h1 style="margin: 0; color: #FF8C42; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">AFRICA-EUROPE HEALTH R&D SUMMIT</h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 24px 0; color: #1a1a2e; font-size: 24px; font-weight: 600;">New Contact Form Submission</h2>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 8px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 24px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                  <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span><br>
                                  <span style="color: #1a1a2e; font-size: 16px; font-weight: 500;">${name}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                  <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Organization</span><br>
                                  <span style="color: #1a1a2e; font-size: 16px; font-weight: 500;">${organization}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                  <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Title</span><br>
                                  <span style="color: #1a1a2e; font-size: 16px; font-weight: 500;">${title}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0;">
                                  <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span><br>
                                  <a href="mailto:${email}" style="color: #FF8C42; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <div style="margin-bottom: 8px;">
                        <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                      </div>
                      <div style="background-color: #fff7ed; border-left: 4px solid #FF8C42; padding: 16px 20px; border-radius: 0 8px 8px 0;">
                        <p style="margin: 0; color: #1a1a2e; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="margin: 0; color: #6b7280; font-size: 13px;">This message was sent from the Africa-Europe Health R&D Summit contact form.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
