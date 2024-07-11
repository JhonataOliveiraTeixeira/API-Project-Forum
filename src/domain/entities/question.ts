import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"

interface QuestionProps{
    title: string
    content: string
    slug: Slug
    authorId: string
}

export class Question extends Entity {
    public title: string
    public slug: Slug
    public content: string
    public authorId: string

    constructor(props: QuestionProps, id?: string){
        super(id)
        this.title = props.title
        this.slug = props.slug
        this.authorId = props.authorId
        this.content = props.content
    }

}

// new Question({
//     slug: Slug.createFromText('teste')
//     slug: Slug('testetet')
// })