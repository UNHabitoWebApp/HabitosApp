import transporter from "../config/nodeMailer.js";

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: "\"Hábitos App\" <habitosapp@gmail.com>",
            to,
            subject,
            text,
        });

        console.log("Correo enviado:", info.messageId);
    } catch (error) {
        console.error("Error enviando correo:", error);
    }
};

export default sendEmail;