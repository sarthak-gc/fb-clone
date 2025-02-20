import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

enum Purpose {
  Registration = "registration",
  PasswordReset = "passwordReset",
}

const getHtmlTemplate = (purpose: Purpose, otp?: string) => {
  switch (purpose) {
    case Purpose.Registration:
      return `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Welcome to Facebook Clone!</h2>
          <p>Thank you for registering. Please verify your email with the OTP below:</p>
          <div style="font-size: 24px; font-weight: bold; color: blue; margin: 10px 0;">${otp}</div>
          <p>This OTP is valid for only 10 minutes.</p>
        </div>
      `;

    case Purpose.PasswordReset:
      return `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Password Reset Request</h2>
          <p>Use the OTP below to reset your password:</p>
          <div style="font-size: 24px; font-weight: bold; color: red; margin: 10px 0;">${otp}</div>
          <p>This OTP is valid for only 10 minutes.</p>
        </div>
      `;

    default:
      return `<p>Unknown purpose</p>`;
  }
};
export const sendMail = async (
  receiver: string,
  subject: string,
  purpose: Purpose,
  otp: string
) => {
  const htmlContent = getHtmlTemplate(purpose, otp);
  const info = await transporter.sendMail({
    from: '"Facebook Clone" <fbclone.np@gmail.com>',
    to: receiver,
    subject,
    text: `Your OTP is : ${otp}`,
    html: htmlContent,
  });
  console.log("Message sent: ", info.messageId);
};
