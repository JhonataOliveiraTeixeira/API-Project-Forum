import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionsRepository } from "../../repositories/questions-repository";

export class InMemoryQuestionRepository implements QuestionsRepository{
    public items: Question[] = []
    
    async findBySlug(slug: string) {
        const question = this.items.find((item)=>item.slug.value === slug)

        if(!question){
            throw new Error('Question not found')
        }

        return question
    }

    async create(question: Question) {
        this.items.push(question)
    }

}