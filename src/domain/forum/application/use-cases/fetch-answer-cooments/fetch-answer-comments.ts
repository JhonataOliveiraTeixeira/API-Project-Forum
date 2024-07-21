import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../../repositories/answer-comment-repository'

interface FetchAnswerCommentsRequest {
    page: number
    answerId: string
}

interface FetchAnswerCommentsResponse {
    answersComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute( 
    {
    answerId,
    page
  }: FetchAnswerCommentsRequest) : Promise<FetchAnswerCommentsResponse> {
   const answersComments = await this.answerCommentRepository.findManyByAnswerId(answerId,{ page})


   return {
    answersComments
   }

  }
}
