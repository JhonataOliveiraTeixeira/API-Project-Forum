import { QuestionCommentRepository } from '../../repositories/question-comments-repository'

interface DeleteCommentOnQuestionUseCaseRequest {
    authorId: string
    questionCommentId: string
}

interface DeleteCommentOnQuestionUseCaseResponse {
}

export class DeleteCommentOnQuestionUseCase {
  constructor(
    private questionCommentRepository: QuestionCommentRepository
) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteCommentOnQuestionUseCaseRequest) : Promise<DeleteCommentOnQuestionUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId)

    if(!questionComment){
        throw new Error('Not found')
    }

    if(questionComment.authorId.toString() !== authorId){
        throw new Error('Not allowed')
    }

        await this.questionCommentRepository.delete(questionComment)


        return {
            questionComment
        }

  }
}
