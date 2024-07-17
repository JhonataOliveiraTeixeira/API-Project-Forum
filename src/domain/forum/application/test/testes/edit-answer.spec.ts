import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { makeAnswer } from '../factories/make-answer'
import { EditAnswerUseCase } from '../../use-cases/edit-answer/edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut : EditAnswerUseCase

describe('Edit Answer',()=>{

    beforeEach(()=>{

        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new EditAnswerUseCase(inMemoryAnswerRepository)

    })

    it('should be able to delete a answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('1')
        },
            new UniqueEntityID('answer-1')
        )
        inMemoryAnswerRepository.create(newAnswer)
      
        await sut.execute({
            answerId: 'answer-1',
            authorId: '1',
            content: 'Nova resposta',
        })
      
        expect(inMemoryAnswerRepository.items[0]).toMatchObject({
            content: 'Nova resposta',
        })

      })

      it('should be not able to edit a answer from another user', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('1')
        },
            new UniqueEntityID('answer-1')
        )
        inMemoryAnswerRepository.create(newAnswer)
      
        
      
        expect(()=>{
            return sut.execute({
                answerId: 'answer-1',
                authorId: '2',
                content: 'Nova resposta',
            })
        }).rejects.toBeInstanceOf(Error)

      })

} )

