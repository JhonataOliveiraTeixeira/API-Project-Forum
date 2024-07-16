import { AnswerRepository } from "../../repositories/answres-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository{
    public items: Answer[] = []

    async create(answer: Answer) {
        this.items.push(answer)
    }

}