import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from "class-validator";

export class CreatePrintJobDto {
  @IsString()
  @IsNotEmpty()
  templateId!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  copies?: number;

  @IsString()
  @IsOptional()
  source?: string;

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

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  maxAttempts?: number;

  @IsObject()
  payload!: Record<string, unknown>;

  @IsObject()
  @IsOptional()
  resolvedData?: Record<string, unknown>;
}
