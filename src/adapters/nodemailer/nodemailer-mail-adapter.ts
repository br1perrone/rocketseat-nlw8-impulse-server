import nodemailer from "nodemailer"

import { MailAdapter, MailAdapterData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c7dfa3cb7c6066",
      pass: "0f28d0ae4e5eb5"
    }
})

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: MailAdapterData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Bruno Perrone <brunoperrone07@gmail.com>",
            subject,
            html: body,
        })
    }
}