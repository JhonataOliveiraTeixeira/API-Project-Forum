import { Entity } from "../../core/entities/entity"

interface StudenteProps{
    name:string
}

export class Student extends Entity {
    public name: string


    constructor(props:StudenteProps, id?: string){
        super(id)
        this.name= props.name

    }
}