import { UniqueEntityID } from "../../../core/entities/unique-entity-if"
import { Answer } from "../../entities/answer"
import { AnswerRepository } from "../../repositories/answres-repository"

interface AnswerQuestionUseCaseRequest{
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase{
constructor(
    private answerRepository: AnswerRepository
){}

    async execute({instructorId,questionId, content}:AnswerQuestionUseCaseRequest){
        const answer = Answer.create ({
            content,
            authorId:new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
            
        } )
        await this.answerRepository.create(answer)

        return answer
    }
}
