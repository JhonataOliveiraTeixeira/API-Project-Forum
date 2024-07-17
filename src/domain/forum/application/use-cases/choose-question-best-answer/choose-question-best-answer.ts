import { AnswerRepository } from '../../repositories/answres-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswerRepository
) {}

  async execute({
     answerId,
     authorId
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
     const answer = await this.answerRepository.findById(answerId)

     if (!answer){
        throw new Error('Not found')
     }

     const question = await this.questionRepository.findById(answer.questionId.toString())

     if (!question){
        throw new Error('Not found')
     }

     if(question.authorId.toString() !== authorId){
        throw new Error('Not allowed')
     }

     question.bestAnswerId = answer.id
    
     await this.questionRepository.save(question)

     return{ question}
  }
}
