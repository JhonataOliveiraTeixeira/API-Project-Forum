import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { DeleteQuestionUseCase } from '../../use-cases/delete-question/delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut : DeleteQuestionUseCase

describe('Delete Question',()=>{

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)

    })

    it('should be able to delte a question', async () => {

        const newQuestion = makeQuestion({},
            new UniqueEntityID('question-1')
        )
        inMemoryQuestionRepository.create(newQuestion)
      
        await sut.execute({
            questionId: 'question-1'
        })
      
        expect(inMemoryQuestionRepository.items).toHaveLength(0)

      })

} )

