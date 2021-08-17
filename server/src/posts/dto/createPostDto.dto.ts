import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createPostDto {
  @IsNotEmpty()
  @IsString()
  line: string;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsNotEmpty()
  @IsString()
  closestStop: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  vehicleCode?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}

export default createPostDto;
