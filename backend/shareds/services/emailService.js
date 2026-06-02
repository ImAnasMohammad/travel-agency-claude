/*
 *  FileName:-     emailService.js
 *  Description:-  Nodemailer email sending service with templates
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const nodemailer = require("nodemailer");
const { env } = require("../../configs/envConfig");
const logger = require("../utils/logger");

/*
 *  functionName:- createTransporter
 *  Description:-  Creates and returns a Nodemailer SMTP transporter instance
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_SECURE,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const transporter = createTransporter();

/*
 *  functionName:- getBaseTemplate
 *  Description:-  Returns the base HTML email template with header and footer
 *  Arguments:-    content - HTML string, subject - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getBaseTemplate = (content, subject) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
    .header { background: #1a73e8; padding: 24px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; }
    .body { padding: 32px; color: #333; line-height: 1.6; }
    .btn { display: inline-block; padding: 12px 28px; background: #1a73e8; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 16px 0; }
    .footer { background: #f4f4f4; padding: 16px; text-align: center; font-size: 12px; color: #999; }
    .otp { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1a73e8; text-align: center; margin: 24px 0; }
    .highlight { background: #e8f0fe; padding: 16px; border-radius: 4px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Travel Agency</h1></div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Travel Agency. All rights reserved.</p>
      <p>If you did not request this email, please ignore it.</p>
    </div>
  </div>
</body>
</html>`;

/*
 *  functionName:- sendEmail
 *  Description:-  Sends an email using Nodemailer transporter
 *  Arguments:-    to - string, subject - string, html - string, text - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM}>`,
      to,
      subject,
      html,
      text: text || subject,
    });
    logger.info(`Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error.message}`);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

/*
 *  functionName:- sendOtpEmail
 *  Description:-  Sends OTP verification email to user
 *  Arguments:-    to - string, otp - string, name - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendOtpEmail = async (to, otp, name = "User") => {
  const subject = "Your OTP Verification Code - Travel Agency";
  const content = `
    <h2>Hello, ${name}!</h2>
    <p>Your one-time password (OTP) for verification is:</p>
    <div class="otp">${otp}</div>
    <p>This OTP is valid for <strong>10 minutes</strong>. Do not share this with anyone.</p>
    <div class="highlight">
      <p>If you did not request this OTP, please ignore this email or contact support immediately.</p>
    </div>`;
  return sendEmail({ to, subject, html: getBaseTemplate(content, subject) });
};

/*
 *  functionName:- sendWelcomeEmail
 *  Description:-  Sends welcome email after successful registration
 *  Arguments:-    to - string, name - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendWelcomeEmail = async (to, name = "Traveller") => {
  const subject = "Welcome to Travel Agency!";
  const content = `
    <h2>Welcome aboard, ${name}!</h2>
    <p>Thank you for registering with Travel Agency. We're thrilled to have you!</p>
    <p>Start exploring our amazing travel packages and create unforgettable memories.</p>
    <a href="${env.CLIENT_URL}/packages" class="btn">Explore Packages</a>
    <div class="highlight">
      <p>Need help? Contact our support team at <a href="mailto:support@travelagency.com">support@travelagency.com</a></p>
    </div>`;
  return sendEmail({ to, subject, html: getBaseTemplate(content, subject) });
};

/*
 *  functionName:- sendPasswordResetEmail
 *  Description:-  Sends password reset link email to user
 *  Arguments:-    to - string, resetToken - string, name - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendPasswordResetEmail = async (to, resetToken, name = "User") => {
  const subject = "Reset Your Password - Travel Agency";
  const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;
  const content = `
    <h2>Hello, ${name}!</h2>
    <p>We received a request to reset your password. Click the button below to set a new password:</p>
    <a href="${resetUrl}" class="btn">Reset Password</a>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break:break-all; color: #1a73e8;">${resetUrl}</p>
    <div class="highlight">
      <p>This link is valid for <strong>1 hour</strong>. If you did not request a password reset, please ignore this email.</p>
    </div>`;
  return sendEmail({ to, subject, html: getBaseTemplate(content, subject) });
};

/*
 *  functionName:- sendBookingConfirmationEmail
 *  Description:-  Sends booking confirmation email with details
 *  Arguments:-    to - string, booking - object, name - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendBookingConfirmationEmail = async (to, booking, name = "Traveller") => {
  const subject = `Booking Confirmed! #${booking.bookingId} - Travel Agency`;
  const content = `
    <h2>Booking Confirmed, ${name}!</h2>
    <p>Your booking has been confirmed. Here are your details:</p>
    <div class="highlight">
      <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
      <p><strong>Package:</strong> ${booking.packageName}</p>
      <p><strong>Travel Date:</strong> ${new Date(booking.travelDate).toDateString()}</p>
      <p><strong>Travellers:</strong> ${booking.travellersCount}</p>
      <p><strong>Total Amount:</strong> ₹${booking.totalAmount.toLocaleString("en-IN")}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
    </div>
    <a href="${env.CLIENT_URL}/bookings/${booking._id}" class="btn">View Booking</a>`;
  return sendEmail({ to, subject, html: getBaseTemplate(content, subject) });
};

/*
 *  functionName:- sendBookingCancellationEmail
 *  Description:-  Sends booking cancellation email
 *  Arguments:-    to - string, booking - object, name - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendBookingCancellationEmail = async (to, booking, name = "Traveller") => {
  const subject = `Booking Cancelled #${booking.bookingId} - Travel Agency`;
  const content = `
    <h2>Hello, ${name}</h2>
    <p>Your booking has been cancelled as per your request.</p>
    <div class="highlight">
      <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
      <p><strong>Package:</strong> ${booking.packageName}</p>
      <p><strong>Refund Amount:</strong> ₹${booking.refundAmount ? booking.refundAmount.toLocaleString("en-IN") : "N/A"}</p>
    </div>
    <p>If you have any questions, please contact our support team.</p>`;
  return sendEmail({ to, subject, html: getBaseTemplate(content, subject) });
};

/*
 *  functionName:- verifyTransporter
 *  Description:-  Verifies SMTP connection
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    logger.info("Email transporter is ready.");
    return true;
  } catch (error) {
    logger.warn(`Email transporter verification failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  sendEmail,
  sendOtpEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendBookingConfirmationEmail,
  sendBookingCancellationEmail,
  verifyTransporter,
};
