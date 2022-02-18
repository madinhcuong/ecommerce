import { IsNotEmpty, IsEmail } from "class-validator";

export class Create {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}