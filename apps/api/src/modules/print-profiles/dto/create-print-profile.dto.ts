import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from "class-validator";

export class CreatePrintProfileDto {
  @IsString()
  @IsNotEmpty()
  printerId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  mediaType?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  darkness?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  speed?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  copiesDefault?: number;

  @IsObject()
  @IsOptional()
  optionsJson?: Record<string, unknown>;
}
