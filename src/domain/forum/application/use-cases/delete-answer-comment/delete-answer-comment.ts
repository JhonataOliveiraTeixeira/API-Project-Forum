import { Either, left, right } from "@/core/either"
import { AnswerCommentRepository } from "../../repositories/answer-comment-repository"
import { ResourceNotFoundError } from "../../errors/resorce-not-found-error"
import { NotAllowedError } from "../../errors/not-allowed-error"

interface DeleteCommentOnAnswerUseCaseRequest {
    authorId: string
    answerCommentId: string
}

type DeleteCommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

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
        return left(new ResourceNotFoundError())
    }

    if(answerComment.authorId.toString() !== authorId){
        return left(new NotAllowedError())
    }

        await this.answerCommentRepository.delete(answerComment)


        return right({})

  }
}
