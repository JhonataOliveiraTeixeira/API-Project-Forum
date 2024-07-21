import { AnswerCommentRepository } from "../../repositories/answer-comment-repository"

interface DeleteCommentOnAnswerUseCaseRequest {
    authorId: string
    answerCommentId: string
}

interface DeleteCommentOnAnswerUseCaseResponse {
}

export class DeleteCommentOnAnswerUseCase {
  constructor(
    private answerCommentRepository: AnswerCommentRepository
) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseRequest) : Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(answerCommentId)

    if(!answerComment){
        throw new Error('Not found')
    }

    if(answerComment.authorId.toString() !== authorId){
        throw new Error('Not allowed')
    }

        await this.answerCommentRepository.delete(answerComment)


        return {
            answerComment
        }

  }
}
