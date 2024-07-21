import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../../repositories/question-comments-repository'

interface FetchQuestionCommentsRequest {
    page: number
    questionId: string
}

interface FetchQuestionCommentsResponse {
    questionsComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute( 
    {
    questionId,
    page
  }: FetchQuestionCommentsRequest) : Promise<FetchQuestionCommentsResponse> {
   const questionsComments = await this.questionCommentRepository.findManyByQuestionId(questionId,{ page})


   return {
    questionsComments
   }

  }
}
