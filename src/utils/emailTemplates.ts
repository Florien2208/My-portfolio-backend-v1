export const generateEmailTemplate = (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${contactData.name} (${contactData.email})</p>
    <p><strong>Subject:</strong> ${contactData.subject}</p>
    <div style="margin-top: 20px;">
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    </div>
    <p style="margin-top: 20px; color: #666;">
      This is an automated notification from your portfolio contact form.
    </p>
  `;
};
