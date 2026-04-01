import { IsObject, IsOptional, IsString } from "class-validator";

export class RepeatPrintJobDto {
  @IsString()
  @IsOptional()
  printerId?: string;

  @IsString()
  @IsOptional()
  printProfileId?: string;

  @IsObject()
  @IsOptional()
  payload?: Record<string, unknown>;

  @IsString()
  @IsOptional()
  idempotencyKey?: string;
}
