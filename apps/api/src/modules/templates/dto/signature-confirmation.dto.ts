import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignatureConfirmationDto {
  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
