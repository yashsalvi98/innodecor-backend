const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form email
exports.sendContactEmail = async (data) => {
  try {
    const transporter = createTransporter();

    const { name, email, phone, service, message } = data;

    // Email to company
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #C9A14A; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #000; }
            .value { color: #555; margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Innodecor Creations</h1>
              <p>New Contact Form Submission</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Service Interested In:</div>
                <div class="value">${service}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Innodecor Creations website contact form.</p>
              <p>Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send auto-reply to customer
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Innodecor Creations',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #C9A14A; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
            .gold { color: #C9A14A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Innodecor Creations</h1>
              <p style="font-style: italic;">Where Creativity Meets Craftsmanship</p>
            </div>
            <div class="content">
              <h2>Dear ${name},</h2>
              <p>Thank you for reaching out to Innodecor Creations!</p>
              <p>We have received your inquiry regarding <strong>${service}</strong> and our team will review your message carefully.</p>
              <p>One of our experts will contact you within <strong>24 hours</strong> via phone or email to discuss your requirements in detail.</p>
              <p>In the meantime, feel free to explore our services and portfolio on our website.</p>
              <p style="margin-top: 30px;">
                <strong>Contact Information:</strong><br>
                📞 Phone: +91 9826777528<br>
                📧 Email: info@innodecor.com<br>
                📍 Location: Indore, Madhya Pradesh, India
              </p>
              <p style="margin-top: 20px;">We look forward to working with you!</p>
              <p><strong class="gold">Team Innodecor Creations</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(autoReplyOptions);

    console.log('✅ Contact form emails sent successfully');
    return true;

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
};

// Test email configuration
exports.testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};
