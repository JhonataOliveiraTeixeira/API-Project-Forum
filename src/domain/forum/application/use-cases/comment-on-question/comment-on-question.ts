import { QuestionsRepository } from '../../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../../repositories/question-comments-repository'

interface CommentOnQuestionUseCaseRequest {
    authorId: string
    questionId: string
    content: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentRepository
) {}

  async execute({
    authorId,
    questionId,
    content
  }: CommentOnQuestionUseCaseRequest) : Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if(!question){
        throw new Error('Not found')
    }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            content,
            questionId: new UniqueEntityID(questionId)
        })

        await this.questionCommentRepository.create(questionComment)

        return {
            questionComment
        }

  }
}
