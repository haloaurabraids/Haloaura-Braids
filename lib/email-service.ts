import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Haloaura Braids" <contact@haloaurabraids.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${options.to}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

export const sendBookingConfirmationEmail = async (booking: any) => {
  const customerEmail = booking.contact.email;
  const customerName = `${booking.contact.firstName} ${booking.contact.lastName}`;
  const customerPhone = booking.contact.phone;
  const serviceName = booking.serviceName;
  
  const formattedDate = booking.date instanceof Date 
    ? booking.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : new Date(booking.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const time = booking.startTime;
  const totalPrice = booking.totalPrice;
  const depositPaid = 30;
  const remainingBalance = Math.max(0, totalPrice - depositPaid);

  let instagram = "";
  let addons = "";
  let userNotes = "";

  if (booking.customerNotes) {
    const parts = booking.customerNotes.split(" | ");
    parts.forEach((part: string) => {
      if (part.startsWith("IG: ")) {
        instagram = part.substring(4);
      } else if (part.startsWith("Addons: ")) {
        addons = part.substring(8);
      } else {
        userNotes = userNotes ? `${userNotes} | ${part}` : part;
      }
    });
  }

  const adminEmail = process.env.NOTIFICATION_EMAIL || "contact@haloaurabraids.com";

  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Appointment is Confirmed</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FFFDF9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e1e24;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFDF9; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #F1E5E9; box-shadow: 0 4px 20px rgba(217, 70, 122, 0.05);">
              <!-- Header Banner -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #D9467A 0%, #B83261 100%); padding: 40px 40px 30px 40px;">
                  <h1 style="color: #ffffff; font-family: 'Georgia', serif; font-size: 28px; font-weight: bold; margin: 0 0 10px 0; letter-spacing: 0.5px;">Haloaura Braids</h1>
                  <div style="color: rgba(255,255,255,0.9); font-size: 14px; text-transform: uppercase; tracking: 2px; font-weight: 600;">Booking Confirmation</div>
                </td>
              </tr>
              <!-- Content Block -->
              <tr>
                <td style="padding: 40px 40px 30px 40px;">
                  <h2 style="font-size: 22px; font-weight: 700; color: #1c1917; margin: 0 0 15px 0;">Your Appointment is Secured!</h2>
                  <p style="font-size: 15px; line-height: 1.6; color: #57534e; margin: 0 0 30px 0;">
                    Hi <strong>${customerName}</strong>,<br>
                    Thank you for choosing Haloaura Braids. Your booking has been processed successfully. Below are your appointment and billing summary details:
                  </p>
                  
                  <!-- Appointment Details Card -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAFaf9; border-radius: 16px; padding: 25px; border: 1px solid #f2f0ea; margin-bottom: 30px;">
                    <tr>
                      <td style="font-size: 14px; color: #78716c; padding-bottom: 8px;">Selected Style</td>
                    </tr>
                    <tr>
                      <td style="font-size: 18px; font-weight: 700; color: #1c1917; padding-bottom: 20px; border-bottom: 1px dashed #e7e5e4;">
                        ${serviceName}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 20px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td width="50%" style="vertical-align: top; padding-right: 15px;">
                              <div style="font-size: 13px; color: #78716c; margin-bottom: 4px;">Appointment Date</div>
                              <div style="font-size: 15px; font-weight: 600; color: #1c1917;">${formattedDate}</div>
                            </td>
                            <td width="50%" style="vertical-align: top;">
                              <div style="font-size: 13px; color: #78716c; margin-bottom: 4px;">Time Slot</div>
                              <div style="font-size: 15px; font-weight: 600; color: #1c1917;">${time}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Pricing Details Table -->
                  <h3 style="font-size: 16px; font-weight: 700; color: #1c1917; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px;">Billing Details</h3>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px; border-collapse: collapse;">
                    <tr>
                      <td style="font-size: 15px; padding: 12px 0; border-bottom: 1px solid #f2f0ea; color: #57534e;">Estimated Service Total</td>
                      <td align="right" style="font-size: 15px; padding: 12px 0; border-bottom: 1px solid #f2f0ea; font-weight: 600; color: #1c1917;">$${totalPrice}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 15px; padding: 12px 0; border-bottom: 1px solid #f2f0ea; color: #D9467A; font-weight: 600;">Secure Booking Deposit Paid</td>
                      <td align="right" style="font-size: 15px; padding: 12px 0; border-bottom: 1px solid #f2f0ea; font-weight: 700; color: #D9467A;">$${depositPaid}</td>
                    </tr>
                    <tr style="background-color: #FFFDF9;">
                      <td style="font-size: 16px; padding: 16px 12px; font-weight: bold; color: #1c1917;">Remaining Balance (Due at Salon)</td>
                      <td align="right" style="font-size: 18px; padding: 16px 12px; font-weight: bold; color: #1c1917;">$${remainingBalance}</td>
                    </tr>
                  </table>

                  <!-- Important Policies Reminder -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFF5F7; border-radius: 12px; padding: 20px; border: 1px solid #F1E5E9; margin-bottom: 15px;">
                    <tr>
                      <td>
                        <div style="font-size: 13px; font-weight: bold; color: #D9467A; margin-bottom: 6px; text-transform: uppercase;">Please Note:</div>
                        <div style="font-size: 13px; line-height: 1.5; color: #78716c;">
                          Your online deposit of <strong>$${depositPaid} is non-refundable</strong>. The remaining balance of <strong>$${remainingBalance}</strong> will be due at the salon in person. Final service pricing is subject to adjustments based on hair length, density, and design complexity.
                        </div>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
              <!-- Footer Branding -->
              <tr>
                <td align="center" style="background-color: #FAFaf9; padding: 30px; border-top: 1px solid #f2f0ea; text-align: center;">
                  <p style="font-size: 14px; font-weight: bold; color: #1c1917; margin: 0 0 6px 0;">Haloaura Braids Studio</p>
                  <p style="font-size: 12px; color: #78716c; margin: 0 0 15px 0;">12 R Winter Street, Worcester, MA 01604</p>
                  <p style="font-size: 11px; color: #a8a29e; margin: 0;">&copy; ${new Date().getFullYear()} Haloaura Braids. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const ownerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Received</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FFFDF9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e1e24;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFDF9; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #F1E5E9; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
              <!-- Header Banner -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #1c1917 0%, #44403c 100%); padding: 45px 40px 35px 40px;">
                  <h1 style="color: #ffffff; font-family: 'Georgia', serif; font-size: 26px; font-weight: bold; margin: 0 0 8px 0; letter-spacing: 0.5px;">New Booking Alert</h1>
                  <div style="color: #D9467A; font-size: 13px; text-transform: uppercase; tracking: 2px; font-weight: 700;">Haloaura Braids Calendar</div>
                </td>
              </tr>
              <!-- Content Block -->
              <tr>
                <td style="padding: 40px 40px 30px 40px;">
                  <p style="font-size: 15px; line-height: 1.5; color: #57534e; margin: 0 0 30px 0;">
                    A new appointment has been scheduled and secured with a <strong>$${depositPaid} deposit payment online</strong>. Below are the separate details for this appointment:
                  </p>

                  <!-- Section: Client Details -->
                  <h3 style="font-size: 14px; font-weight: 700; color: #D9467A; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #FAFaf9; padding-bottom: 6px;">Client Information</h3>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px; background-color: #FAFaf9; border-radius: 12px; padding: 20px; border: 1px solid #f2f0ea;">
                    <tr>
                      <td width="35%" style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Full Name:</strong></td>
                      <td style="font-size: 14px; color: #1c1917; padding-bottom: 8px;">${customerName}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Email Address:</strong></td>
                      <td style="font-size: 14px; color: #1c1917; padding-bottom: 8px;"><a href="mailto:${customerEmail}" style="color: #D9467A; text-decoration: none;">${customerEmail}</a></td>
                    </tr>
                    <tr>
                      <td style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Phone Number:</strong></td>
                      <td style="font-size: 14px; color: #1c1917; padding-bottom: 8px;"><a href="tel:${customerPhone}" style="color: #1c1917; text-decoration: none;">${customerPhone}</a></td>
                    </tr>
                    ${instagram ? `
                    <tr>
                      <td style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Instagram:</strong></td>
                      <td style="font-size: 14px; color: #1c1917; padding-bottom: 8px;"><a href="https://instagram.com/${instagram.replace('@', '')}" target="_blank" style="color: #D9467A; text-decoration: none;">${instagram}</a></td>
                    </tr>` : ''}
                    ${userNotes ? `
                    <tr>
                      <td style="font-size: 13px; color: #78716c; padding-top: 8px; vertical-align: top; border-top: 1px dashed #e7e5e4;"><strong>Client Notes:</strong></td>
                      <td style="font-size: 14px; color: #57534e; padding-top: 8px; vertical-align: top; border-top: 1px dashed #e7e5e4; line-height: 1.4;">${userNotes}</td>
                    </tr>` : ''}
                  </table>

                  <!-- Section: Appointment Details -->
                  <h3 style="font-size: 14px; font-weight: 700; color: #D9467A; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #FAFaf9; padding-bottom: 6px;">Appointment details</h3>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px; background-color: #FAFaf9; border-radius: 12px; padding: 20px; border: 1px solid #f2f0ea;">
                    <tr>
                      <td width="35%" style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Style Booked:</strong></td>
                      <td style="font-size: 14px; font-weight: 600; color: #1c1917; padding-bottom: 8px;">${serviceName}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Date:</strong></td>
                      <td style="font-size: 14px; color: #1c1917; padding-bottom: 8px;">${formattedDate}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Time:</strong></td>
                      <td style="font-size: 14px; color: #1c1917; padding-bottom: 8px;">${time}</td>
                    </tr>
                    ${addons ? `
                    <tr>
                      <td style="font-size: 13px; color: #78716c; padding-bottom: 8px;"><strong>Addons:</strong></td>
                      <td style="font-size: 14px; color: #57534e; padding-bottom: 8px;">${addons}</td>
                    </tr>` : ''}
                  </table>

                  <!-- Section: Financial Summary -->
                  <h3 style="font-size: 14px; font-weight: 700; color: #D9467A; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #FAFaf9; padding-bottom: 6px;">Financial Breakdown</h3>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                    <tr>
                      <td style="font-size: 14px; padding: 10px 0; border-bottom: 1px solid #f2f0ea; color: #57534e;">Estimated Style Total</td>
                      <td align="right" style="font-size: 14px; padding: 10px 0; border-bottom: 1px solid #f2f0ea; font-weight: 600; color: #1c1917;">$${totalPrice}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 14px; padding: 10px 0; border-bottom: 1px solid #f2f0ea; color: #22c55e; font-weight: 600;">Deposit Charged (Stripe)</td>
                      <td align="right" style="font-size: 14px; padding: 10px 0; border-bottom: 1px solid #f2f0ea; font-weight: 700; color: #22c55e;">$${depositPaid}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 15px; padding: 14px 0; font-weight: bold; color: #1c1917;">Collect In-Person Balance</td>
                      <td align="right" style="font-size: 16px; padding: 14px 0; font-weight: bold; color: #D9467A;">$${remainingBalance}</td>
                    </tr>
                  </table>

                </td>
              </tr>
              <!-- Footer Branding -->
              <tr>
                <td align="center" style="background-color: #FAFaf9; padding: 25px; border-top: 1px solid #f2f0ea; text-align: center;">
                  <p style="font-size: 12px; color: #78716c; margin: 0;">This email was system-generated by the Haloaura Braids scheduler portal.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Send to Customer
  await sendEmail({
    to: customerEmail,
    subject: "Your Appointment is Confirmed - Haloaura Braids",
    html: customerHtml,
  });

  // Send to Owner
  await sendEmail({
    to: adminEmail,
    subject: "New Booking Received - Haloaura Braids",
    html: ownerHtml,
  });
};
