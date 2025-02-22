import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

export enum Purpose {
  Registration = "registration",
  PasswordReset = "passwordReset",
  RegistrationSuccessful = "registrationSuccessful",
  PasswordResetSuccessful = "passwordResetSuccessful",
}

const getHtmlTemplate = (purpose: Purpose, otp?: number, password?: string) => {
  switch (purpose) {
    case Purpose.Registration:
      return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F7FB; color: #4A4A4A; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 24px; color: #1877F2; text-align: center;">Welcome to Facebook Clone!</h2>
          <p style="text-align: center;">Thank you for registering. Please verify your email with the OTP below:</p>
          <div style="font-size: 36px; font-weight: bold; color: #1877F2; text-align: center; margin: 10px 0;">${otp}</div>
          <p style="text-align: center; color: #888; font-size: 14px;">This OTP is valid for only 10 minutes.</p>
          <p style="text-align: center; color: #888; font-size: 14px;">If you did not request this, please ignore this email.</p>
        </div>
      `;
    case Purpose.PasswordReset:
      return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F7FB; color: #4A4A4A; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 24px; color: #FF4C4C; text-align: center;">Password Reset Request</h2>
          <p style="text-align: center;">Use the OTP below to reset your password:</p>
          <div style="font-size: 36px; font-weight: bold; color: #FF4C4C; text-align: center; margin: 10px 0;">${otp}</div>
          <p style="text-align: center; color: #888; font-size: 14px;">This OTP is valid for only 10 minutes.</p>
          <p style="text-align: center; color: #888; font-size: 14px;">If you did not request a password reset, please ignore this email.</p>
        </div>
      `;
    case Purpose.RegistrationSuccessful:
      return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F7FB; color: #4A4A4A; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 24px; color: #1877F2; text-align: center;">Welcome to Our Platform!</h2>
          <p style="text-align: center;">Thank you for registering with us. We're excited to have you on board!</p>
          <p style="text-align: center;">Your registration was successful, and you can now enjoy all the features available on our platform.</p>
          <p style="text-align: center; color: #888; font-size: 14px;">If you did not create this account, please contact us immediately.</p>
          <div style="font-size: 18px; font-weight: bold; color: #1877F2; text-align: center; margin: 20px 0;">Registration Successful</div>
          <p style="text-align: center;">Thank you for being part of our community!</p>
        </div>
      `;
    case Purpose.PasswordResetSuccessful:
      return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F7FB; color: #4A4A4A; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 24px; color: #4CAF50; text-align: center;">Password Reset Successful</h2>
          <p style="text-align: center;">Your password has been successfully reset. You can now log in with your new password.</p>
          <p style="text-align: center;">If you did not request a password reset, please contact us immediately.</p>
          <p style="text-align: center; color: #888; font-size: 14px;">If you encounter any issues, feel free to reach out to our support team.</p>
        </div>
      `;
    default:
      return `<p>Unknown purpose</p>`;
  }
};

const getText = (purpose: Purpose, otp?: number) => {
  switch (purpose) {
    case Purpose.Registration:
      return otp ? `Your OTP is: ${otp}` : "Registration Successful";
    case Purpose.PasswordReset:
      return otp ? `` : "Password Reset Failed";
    case Purpose.RegistrationSuccessful:
      return "Registration Successful! Welcome to our platform.";
    case Purpose.PasswordResetSuccessful:
      return "Your password has been successfully reset. You can now log in with your new password.";
    default:
      return "Unknown Purpose";
  }
};

export const sendMail = async (
  receiver: string,
  subject: string,
  purpose: Purpose,
  otp?: number,
  password?: string
) => {
  const htmlContent = getHtmlTemplate(purpose, otp, password);
  const text = getText(purpose, otp);
  const info = await transporter.sendMail({
    from: '"Your Platform" <yourplatform.email@gmail.com>',
    to: receiver,
    subject,
    text,
    html: htmlContent,
  });
  console.log("Message sent: ", info.messageId);
};
