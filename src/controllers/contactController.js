const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Send email to you (admin)
    await resend.emails.send({
      from: 'Innodecor Creations <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });

  } catch (error) {
    console.error('Resend Error:', error);

    res.status(500).json({
      success: false,
      message: 'Email sending failed',
    });
  }
};