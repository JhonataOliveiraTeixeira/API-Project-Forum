import { expect, describe, beforeEach, it } from 'vitest'
import { CreateQuestionUseCase } from '../../use-cases/create-question/create-question'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut : CreateQuestionUseCase

describe('Create Question',()=>{

    beforeEach(()=>{

        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

    })

    it('should be able create a question', async () => {
      
        const question = await sut.execute({
          authorId: '1',
          title: 'Nova pergunta',
          content: 'Nova pergunta conteúdo',
          attachmentsIds: ['1', '2']
        })
      
        expect(question.isRight()).toBeTruthy()
        expect(inMemoryQuestionRepository.items[0].id).toEqual(question.value?.question.id)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
          expect.objectContaining({attachmentId: new UniqueEntityID('1')}),
          expect.objectContaining({attachmentId: new UniqueEntityID('2')}),
        ])


      })

} )

