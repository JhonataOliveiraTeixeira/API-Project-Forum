import { expect, test } from 'vitest'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { CreateQuestionUseCase } from '../../use-cases/create-question/create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

test('create a question', async () => {
  const answerQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const {question }= await answerQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Nova pergunta conteúdo'
  })

  expect(question.id).toBeTruthy()
})
