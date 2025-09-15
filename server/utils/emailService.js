import nodemailer from 'nodemailer';

// Create transporter (you'll need to configure this with your email provider)
const createTransporter = () => {
  // For Gmail (you'll need to use App Passwords)
  if (process.env.EMAIL_PROVIDER === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password, not regular password
      },
    });
  }

  // For other SMTP providers (like your hosting provider)
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Send contact form notification
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();

    const { firstname, lastname, email, phone, message } = contactData;

    // Email to you (business owner)
    const ownerMailOptions = {
      from: process.env.EMAIL_FROM || email,
      to: process.env.CONTACT_EMAIL, // Your business email
      subject: `New Contact Form Submission from ${firstname} ${lastname}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Sent from Ele Gardens contact form</em></p>
      `,
    };

    // Auto-reply to the customer
    const customerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting Ele Gardens',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Dear ${firstname},</p>
        <p>Thank you for reaching out to Ele Gardens. We have received your message and will get back to you within 24-48 hours.</p>
        
        <p><strong>Your message:</strong></p>
        <p><em>${message}</em></p>
        
        <hr>
        <p>Best regards,<br>
        The Ele Gardens Team<br>
        Phone: +49 2826 91500<br>
        Email: info@elegardens.com</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(customerMailOptions);

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email notification');
  }
};
