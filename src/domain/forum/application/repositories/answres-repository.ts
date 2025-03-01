import { PaginationParms } from '@/core/repositories/pagination-parms'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswerRepository {
  findById(answerId: string): Promise<Answer | null>
  findByAnswerId(questionId: string, params: PaginationParms): Promise <Answer[] >
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise <void>
  save(answer: Answer): Promise <void>

}
