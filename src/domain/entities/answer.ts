import { Entity } from "../../core/entities/entity"

interface Answerprops{
    content: string
    authorId: string
    questionId: string
}

export class Answer extends Entity<Answerprops> {
    
    get content(){
        return this.props.content
    }


}