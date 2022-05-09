import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    comment: string;
    screenshot?: string;
    type: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) {}

    async execute(request :SubmitFeedbackUseCaseRequest) {
        const {comment, screenshot, type} = request

        await this.feedbackRepository.create({
            comment,
            screenshot,
            type,
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentário:<br> ${comment}</p>`,
                `</div>`,
            ].join('\n')
        })
    }
}