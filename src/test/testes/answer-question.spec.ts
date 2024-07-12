import {expect, test} from 'vitest'
import { AnswerRepository } from '../../domain/repositories/answres-repository'
import { Answer } from '../../domain/entities/answer'
import { AnswerQuestionUseCase } from '../../domain/use-cases/answer-question/answer-question';

const fakeAnswersrepository:AnswerRepository= {
    create: async (answer:Answer)=>{
        return;
    }
}

test('create an answer',async ()=>{

    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersrepository)

    const answer = await answerQuestion.execute({
        content: 'Nova resposta',
        instructorId: '1',
        questionId: '1'
    })

    expect(answer.content).toEqual('Nova resposta')
})