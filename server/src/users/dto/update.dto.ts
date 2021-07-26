import { IsEmail, IsString, IsNotEmpty, Length } from "class-validator";

export class UpdateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  password: string;
}

export default UpdateDto;
