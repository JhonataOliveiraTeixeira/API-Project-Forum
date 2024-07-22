import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository} from '../repositories/in-memory-answer-repository'
import { makeAnswer } from '../factories/make-answer'
import { DeleteAnswerUseCase } from '../../use-cases/delete-answer/delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../errors/not-allowed-error'

let inMemoryAnswernRepository: InMemoryAnswerRepository
let sut : DeleteAnswerUseCase

describe('Delete Answern',()=>{

    beforeEach(()=>{

        inMemoryAnswernRepository = new InMemoryAnswerRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswernRepository)

    })

    it('should be able to delete a answern', async () => {

        const newAnswern = makeAnswer({
            authorId: new UniqueEntityID('1')
        },
            new UniqueEntityID('answern-1')
        )
        inMemoryAnswernRepository.create(newAnswern)
      
        await sut.execute({
            answerId: 'answern-1',
            authorId: '1'
        })
      
        expect(inMemoryAnswernRepository.items).toHaveLength(0)

      })

      it('should be not able to delete a answern from another user', async () => {

        const newAnswern = makeAnswer({
            authorId: new UniqueEntityID('1')
        },
            new UniqueEntityID('answern-1')
        )
        inMemoryAnswernRepository.create(newAnswern)
      
        const question = await sut.execute({
            answerId: 'answern-1',
            authorId: '2'
        })
      
        expect(question.isLeft()).toBe(true)
        expect(question.value).instanceOf(NotAllowedError)
      })

} )

