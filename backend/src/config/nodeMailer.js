import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "habitosapp@gmail.com",
        pass: "vzzm gbpj qova avoi",
    },
});

export default transporter;