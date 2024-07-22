import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { EditQuestionUseCase } from '../../use-cases/edit-question/edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut : EditQuestionUseCase

describe('Edit Question',()=>{

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionRepository)

    })

    it('should be able to delte a question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('1')
        },
            new UniqueEntityID('question-1')
        )
        inMemoryQuestionRepository.create(newQuestion)
      
        await sut.execute({
            questionId: 'question-1',
            authorId: '1',
            content: 'Nova pergunta',
            title: 'Novo titulo'
        })
      
        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            content: 'Nova pergunta',
            title: 'Novo titulo'
        })

      })

      it('should be not able to edit a question from another user', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('1')
        },
            new UniqueEntityID('question-1')
        )
        inMemoryQuestionRepository.create(newQuestion)
      
        
        const result = await sut.execute({
            questionId: 'question-1',
            authorId: '2',
            content: 'Nova pergunta',
            title: 'Novo titulo'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).instanceOf(NotAllowedError)

      })

} )

