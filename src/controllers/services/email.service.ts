// import { transporter } from "../config/email.config";
// import { generateEmailTemplate } from "../utils/emailTemplates";

import { transporter } from "../../config/email.config";
import { generateEmailTemplate } from "../../utils/emailTemplates";

export class EmailService {
  static async sendContactNotification(contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      // Verify credentials are present
      if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
        throw new Error("Email credentials are not configured");
      }

      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
        subject: `New Contact Form Message: ${contactData.subject}`,
        html: generateEmailTemplate(contactData),
        replyTo: contactData.email,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);

      // Send auto-reply
      const autoReplyOptions = {
        from: `"Florien" <${process.env.EMAIL_USER}>`,
        to: contactData.email,
        subject: `Thank you for contacting me!`,
        html: `
          <h2>Thank you for your message</h2>
          <p>Hello ${contactData.name},</p>
          <p>I have received your message and we will be in touch  as soon as possible.</p>
          <p>Best regards,<br>${process.env.YOUR_NAME }</p>
        `,
      };

      await transporter.sendMail(autoReplyOptions);
      return true;
    } catch (error) {
      console.error("Email notification error:", error);
      throw new Error("Failed to send email notification");
    }
  }
}
