import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../../repositories/answer-comment-repository'
import { AnswerRepository } from '../../repositories/answres-repository'

interface CommentOnAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository
) {}

  async execute({
    authorId,
    answerId,
    content
  }: CommentOnAnswerUseCaseRequest) : Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if(!answer){
        throw new Error('Not found')
    }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            content,
            answerId: new UniqueEntityID(answerId)
        })

        await this.answerCommentRepository.create(answerComment)

        return {
            answerComment
        }

  }
}
