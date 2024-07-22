import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '../../errors/not-allowed-error'
import { ResourceNotFoundError } from '../../errors/resorce-not-found-error'
import { AnswerRepository } from '../../repositories/answres-repository'

interface EditAnswerUseCaseRequest {
 authorId : string
 answerId: string
 content: string

}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError| NotAllowedError , {}>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content
  }: EditAnswerUseCaseRequest) : Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if(!answer){
      return left(new ResourceNotFoundError())
    }

    if(authorId !== answer.authorId.toString()){
      return left(new NotAllowedError())
    }
    
    answer.content = content

   await this.answerRepository.save(answer)


   return right({})

  }
}
