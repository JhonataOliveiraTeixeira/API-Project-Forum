import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'

export interface Answerprops {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  attachments: AnswerAttachmentList
  createAt: Date
  updateAt?: Date
}

export class Answer extends Entity<Answerprops> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  get createAt() {
    return this.props.createAt
  }

  get attachments() {
    return this.props.attachments
  }


  get updateAt() {
    return this.props.updateAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(props: Optional<Answerprops, 'createAt' | 'attachments'>, id?: UniqueEntityID) {
    const answer = new Answer(
      {
        ...props,
        createAt: props.createAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentList()
      },
      id,
    )

    return answer
  }
}
