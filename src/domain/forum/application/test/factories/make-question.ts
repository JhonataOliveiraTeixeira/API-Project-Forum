import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(override: Partial<QuestionProps> = {}){
    const newQuestion = Question.create({
        title: 'Example Question',
        authorId: new UniqueEntityID(),
        content:'Contente test',
        ...override,
    })
    
    return newQuestion
}