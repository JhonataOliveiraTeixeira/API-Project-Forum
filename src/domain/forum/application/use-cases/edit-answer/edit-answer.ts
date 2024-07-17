import { AnswerRepository } from '../../repositories/answres-repository'

interface EditAnswerUseCaseRequest {
 authorId : string
 answerId: string
 content: string

}

interface EditAnswerUseCaseResponse {

}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content
  }: EditAnswerUseCaseRequest) : Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if(!answer){
        throw new Error('Answer not found')
    }

    if(authorId !== answer.authorId.toString()){
        throw new Error('Not Alowed')
    }
    
    answer.content = content

   await this.answerRepository.save(answer)


   return { answer }

  }
}
