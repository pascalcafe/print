import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { PrintJobStatus } from "@prisma/client";

export class CreatePrintJobEventDto {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsEnum(PrintJobStatus)
  @IsOptional()
  status?: PrintJobStatus;

  @IsObject()
  @IsOptional()
  payload?: Record<string, unknown>;

  @IsObject()
  @IsOptional()
  result?: Record<string, unknown>;

  @IsString()
  @IsOptional()
  failureReason?: string;
}
