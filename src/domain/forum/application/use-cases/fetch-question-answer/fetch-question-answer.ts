import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerRepository } from '../../repositories/answres-repository'

interface FecthQuestionAnswersRequest {
    page: number
    questionId: string
}

interface FecthQuestionAnswersResponse {
    answers: Answer[]
}

export class FecthQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute( 
    {
         questionId,

    page
  }: FecthQuestionAnswersRequest) : Promise<FecthQuestionAnswersResponse> {
   const answers= await this.answerRepository.findByQuestionId(questionId,{ page})


   return {
    answers
   }

  }
}
