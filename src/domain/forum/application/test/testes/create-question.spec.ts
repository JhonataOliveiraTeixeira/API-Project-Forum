import { expect, describe, beforeEach, it } from 'vitest'
import { CreateQuestionUseCase } from '../../use-cases/create-question/create-question'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut : CreateQuestionUseCase

describe('Create Question',()=>{

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

    })

    it('should be able create a question', async () => {
      
        const {question }= await sut.execute({
          authorId: '1',
          title: 'Nova pergunta',
          content: 'Nova pergunta conteúdo'
        })
      
        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)

      })

} )

