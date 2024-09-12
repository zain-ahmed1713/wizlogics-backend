import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (userEmail, emailSubject, emailBody) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "WizLogics <onboarding@resend.dev>",
            to: userEmail,
            subject: emailSubject,
            html: emailBody,
        });

        if (error) {
            throw new Error("Email sending failed. Error:", error)
        }

    } catch (error) {
        throw new Error("Resend Email Service Error. Error:", error)
    }

}

export { sendEmail };