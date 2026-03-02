const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Create transporter using Gmail and App Password
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,       // Your Gmail account
    pass: process.env.GMAIL_PASSWORD,   // Your Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter
transport.verify()
  .then(() => console.log("✅ SMTP Server is ready to send emails"))
  .catch((err) => console.error("❌ SMTP error:", err));

// Replace placeholders in template
function replaceContent(content, creds) {
  return Object.keys(creds).reduce((updatedContent, key) => {
    return updatedContent.replace(new RegExp(`#{${key}}`, "g"), creds[key]);
  }, content);
}

// Main function to send email
const Emailhelper = async (templateName, receiverEmail, creds) => {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);

    // Read template file
    let content = await fs.promises.readFile(templatePath, "utf-8");
    content = replaceContent(content, creds);

    const emailDetails = {
      to: receiverEmail,
      from: process.env.GMAIL_USER, // Use your Gmail account here
      subject: 'Booking Details',
      html: content,
    };

    console.log("📧 Sending email to:", receiverEmail);

    await transport.sendMail(emailDetails);

    console.log("✅ Email sent successfully!");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("❌ Template file not found:", error.message);
    } else if (error.response && error.response.body) {
      console.error("❌ Error sending email:", error.response.body);
    } else {
      console.error("❌ Error occurred:", error.message);
    }
  }
};

module.exports = Emailhelper;