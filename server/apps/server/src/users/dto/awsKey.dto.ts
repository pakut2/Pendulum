import { IsString, IsNotEmpty } from "class-validator";

export class KeyDto {
  @IsString()
  @IsNotEmpty()
  key: string;
}
