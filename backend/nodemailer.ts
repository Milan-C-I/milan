'use server';

import { transporter } from "@/lib/noodemailer";

export const sendMail = async (data: {name: string, email: string, subject: string, message: string}) => {
    await transporter.sendMail({
        from: "milannodemailer@gmail.com",
        to: "milannodemailer@gmail.com, milancheriyamanep@gmail.com",
        subject: `Portfolio - ${data.email}`,
        text: `from: ${data.name}\nemail: ${data.email}\nsubject: ${data.subject}\n\n${data.message}`,
    })   
}