import { Entity } from "../../core/entities/entity"

interface Answerprops{
    content: string
    authorId: string
    questionId: string
}

export class Answer extends Entity {
    public content: string
    public authorId: string
    public questionId: string

    constructor( props: Answerprops, id?: string){
        super(id)
        this.authorId= props.authorId
        this.questionId= props.questionId
        this.content = props.content
    }

}