import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from "class-validator";

export class CreatePrintJobDto {
  @IsString()
  @IsNotEmpty()
  templateId!: string;

  @IsString()
  @IsOptional()
  printerId?: string;

  @IsString()
  @IsOptional()
  printProfileId?: string;

  @IsString()
  @IsOptional()
  mode?: string;

  @IsString()
  @IsOptional()
  idempotencyKey?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  maxAttempts?: number;

  @IsObject()
  payload!: Record<string, unknown>;
}
