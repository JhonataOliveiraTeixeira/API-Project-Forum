import { PaginationParms } from "@/core/repositories/pagination-parms";
import { AnswerRepository } from "../../repositories/answres-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerAttachmentRepository } from "../../repositories/answer-attachment-repository";

export class InMemoryAnswerRepository implements AnswerRepository{
    public items: Answer[] = []

    constructor(private answerAttachmentRepositooty: AnswerAttachmentRepository){}

    async findByAnswerId(answerId: string , {page}: PaginationParms) {
        const answers = this.items
        .filter((item) => item.questionId.toString() === answerId)
        .slice((page-1)* 20, page *20)

        return answers
    }


    async findById(id: string) {
        
        const answer = this.items.find((item)=> item.id.toString()  === id)
    
        if(!answer){
            throw new Error('Answer not found')
        }
        
        return answer
    }
    
    async create(answer: Answer) {
        this.items.push(answer)
    }
    
    async delete(answer: Answer){
        const itemIndex = this.items.findIndex(item => item.id === answer.id)

        this.items.splice(itemIndex, 1)
        this.answerAttachmentRepositooty.deleteManyByAnswerId(answer.id.toString())
    }

    async save(answer: Answer){
        const itemIndex = this.items.findIndex(item => item.id === answer.id)
        
        this.items[itemIndex] = answer
    }
}