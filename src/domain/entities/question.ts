import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-if"
import { Optional } from "../../core/types/optional"

interface QuestionProps{
    authorId: UniqueEntityID
    bestAnswerId?: UniqueEntityID
    title: string
    content: string
    slug: Slug
    createAt: Date
    updateAt?: Date
}

export class Question extends Entity<QuestionProps> {
    static create(props: Optional< QuestionProps, 'createAt'>, id?: UniqueEntityID){
        const question = new Question({
            ...props,
            createAt: new Date()
        }, id)

        return question
    }

}

