import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { makeAnswer } from '../factories/make-answer'
import { InMemoryAnswerCommentRepository } from '../repositories/in-memory-answer-comment-repository'
import { CommentOnAnswerUseCase } from '../../use-cases/comment-on-answer/comment-on-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentRepositoy: InMemoryAnswerCommentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut : CommentOnAnswerUseCase

describe('Comment On Answer',()=>{

    beforeEach(()=>{

        inMemoryAnswerCommentRepositoy = new InMemoryAnswerCommentRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new CommentOnAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerCommentRepositoy)

    })

    it('should be able comment on answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('1'),
        },
    )

        await inMemoryAnswerRepository.create(newAnswer)

        await sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: newAnswer.authorId.toString(),
            content:'IaIaOO',
        })

      

      
        expect(inMemoryAnswerCommentRepositoy.items[0].content).toEqual('IaIaOO')

      })

} )

