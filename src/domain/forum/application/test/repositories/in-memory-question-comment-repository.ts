import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { QuestionCommentRepository } from "../../repositories/question-comments-repository";

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository{
    public items: QuestionComment[] = []

    async create(questionComment: QuestionComment){
        this.items.push(questionComment)
    }
}