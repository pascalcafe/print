import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateTemplateVersionDto {
  @IsString()
  @IsOptional()
  notes?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  sourceVersion?: number;
}
