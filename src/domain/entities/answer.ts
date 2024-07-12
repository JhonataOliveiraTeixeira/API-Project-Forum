import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"

interface Answerprops{
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    content: string
    createAt: Date
    updateAt?: Date
}

export class Answer extends Entity<Answerprops> {

    get authorId(){
        return this.props.authorId
    }  

    get questionId(){
        return this.props.questionId
    }

    get content(){
        return this.props.content
    }

    get createAt(){
        return this.props.createAt
    }

    get updateAt(){
        return this.props.updateAt
    }

    get excerpt(){
        return this.content
        .substring(0, 120)
        .trimEnd()
        .concat('...')
    }

    static create(props: Optional< Answerprops, 'createAt'>, id?: UniqueEntityID){
        const answer = new Answer({
            ...props,
            createAt: new Date()
        }, id)

        return answer
    }


}