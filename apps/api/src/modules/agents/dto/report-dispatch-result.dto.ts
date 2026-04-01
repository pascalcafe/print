import { IsBoolean, IsIn, IsObject, IsOptional, IsString } from "class-validator";

export class ReportDispatchResultDto {
  @IsString()
  @IsIn(["completed", "failed"])
  status!: "completed" | "failed";

  @IsOptional()
  @IsBoolean()
  retryable?: boolean;

  @IsOptional()
  @IsString()
  errorMessage?: string;

  @IsOptional()
  @IsObject()
  response?: Record<string, unknown>;
}
