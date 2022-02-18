import { Length, IsNumber } from "class-validator";

export class CreateProductValidate {
    @Length(10, 20)
    title: string;
}