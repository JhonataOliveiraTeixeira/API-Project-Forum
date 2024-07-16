import { expect, test } from 'vitest'
import { AnswerQuestionUseCase} from '../../use-cases/answer-question/answer-question'
import {Answer} from '../../../enterprise/entities/answer'
import {AnswerRepository} from '../../repositories/answres-repository'

const fakeAnswersrepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersrepository)

  const answer = await answerQuestion.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('Nova resposta')
})
