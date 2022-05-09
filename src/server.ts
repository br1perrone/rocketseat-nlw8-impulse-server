import express from "express"
import nodemailer from "nodemailer"
import { prisma } from "./database"

const app = express()
const port = 3333

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c7dfa3cb7c6066",
      pass: "0f28d0ae4e5eb5"
    }
})

app.use(express.json())

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
             comment,
             screenshot,
             type,
        }
    })

    await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "Bruno Perrone <brunoperrone07@gmail.com>",
        subject: "Novo feedback recebido",
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do Feedback: ${type}</p>`,
            `<p>Comentário:<br> ${comment}</p>`,
            `</div>`,
        ].join('\n')
    })

    return res.status(201).send({data: feedback})
})

app.listen(port, ()=>console.log(`Feedback HTTP Server is running at ${port}`))