import { expect, describe, beforeEach, it } from 'vitest'
import { AnswerQuestionUseCase } from '../../use-cases/answer-question/answer-question'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut : AnswerQuestionUseCase

describe('Create Answer',()=>{

    beforeEach(()=>{

        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)

    })

    it('should be able create a answer', async () => {
      
        const answer = await sut.execute({
          questionId: '1',
          instructorId: '1',
          content: 'Nova resposta conteúdo'
        })
      
        expect(answer.value?.answer.id).toBeTruthy()
        expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.value?.answer.id)
      })

} )

