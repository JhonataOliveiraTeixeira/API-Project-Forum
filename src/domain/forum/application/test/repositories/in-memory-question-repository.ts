import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionsRepository } from "../../repositories/questions-repository";

export class InMemoryQuestionRepository implements QuestionsRepository{
    public items: Question[] = []

    async create(question: Question) {
        this.items.push(question)
    }

}