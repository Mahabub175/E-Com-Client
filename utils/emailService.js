// utils/emailService.js
export async function sendEmail(templateParams) {
  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  const url = `https://api.emailjs.com/api/v1.0/email/send`;

  const data = {
    service_id: serviceID,
    template_id: templateID,
    user_id: publicKey,
    template_params: templateParams,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
