import { AnswerRepository } from "../../repositories/answres-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository{
    public items: Answer[] = []
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
    }
}