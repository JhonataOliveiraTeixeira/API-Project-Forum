import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface FetchRecenteQuestionRequest {
    page: number
}

interface FetchRecenteQuestionResponse {
    question: Question[]
}

export class FetchRecenteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page
  }: FetchRecenteQuestionRequest) : Promise<FetchRecenteQuestionResponse> {
   const question = await this.questionRepository.findManyRecent({page})


   return {question}

  }
}
