import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createSpy },
    { sendMail: sendMailSpy },
)

describe("Submit feedback", () => {
    it("should be able to submit a feedback", async ()=>{
        await expect(submitFeedback.execute({
            comment: 'example comment',
            type: 'BUG'
        })).resolves.not.toThrow()

        expect(createSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it("should be able to submit a feedback with a valid screenshot", async ()=>{
        await expect(submitFeedback.execute({
            comment: 'example comment',
            type: 'BUG',
            screenshot: 'data:image/png;base64,r32432fdafyd8ap9fdajfk;la=//=/'
        })).resolves.not.toThrow()
    })

    it("shouldn't be able to submit a feedback with a invalid screenshot", async ()=>{
        await expect(submitFeedback.execute({
            comment: 'wrong example with invalid screenshot',
            type: 'BUG',
            screenshot: 'teste.jpg'
        })).rejects.toThrow()
    })

    it("shouldn't be able to submit a feedback without type", async ()=>{
        await expect(submitFeedback.execute({
            comment: 'wrong example without type',
            type: '',
        })).rejects.toThrow()
    })

    it("shouldn't be able to submit a feedback without comment", async ()=>{
        await expect(submitFeedback.execute({
            comment: '',
            type: 'BUG',
        })).rejects.toThrow()
    })

})