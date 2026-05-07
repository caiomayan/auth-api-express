import "dotenv/config";
import { Resend } from "resend";

// using Resend API

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(to, code) {
  const { data, error } = await resend.emails.send({
    from: `Auth API <noreply@${process.env.RESEND_DOMAIN_EMAIL || "resend.dev"}>`,
    to: to,
    subject: `Your verification code is: ${code}`,
    text: `<h1>Your verification code is: ${code}</h1>`,
  });

  if (error) {
    console.error("Error sending OTP email: ", error);
    throw new Error("Failed to send OTP email");
  }

  console.log("OTP email sent successfully: ", data);
}
