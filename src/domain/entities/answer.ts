import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-if"
import { Optional } from "../../core/types/optional"

interface Answerprops{
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    content: string
    createAt: Date
    updateAt?: Date
}

export class Answer extends Entity<Answerprops> {

    get content(){
        return this.props.content
    }
    static create(props: Optional< Answerprops, 'createAt'>, id?: UniqueEntityID){
        const answer = new Answer({
            ...props,
            createAt: new Date()
        }, id)

        return answer
    }


}