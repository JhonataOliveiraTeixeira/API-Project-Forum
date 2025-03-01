import { PaginationParms } from "@/core/repositories/pagination-parms";
import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepository{
    findById(id: string): Promise<AnswerComment | null>
    create(answerComment : AnswerComment): Promise <void>
    delete(answerComment: AnswerComment): Promise<void>
    findManyByAnswerId(answerId: string, params: PaginationParms):  Promise<AnswerComment[]>

}