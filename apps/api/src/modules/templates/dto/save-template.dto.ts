import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from "class-validator";

class TemplateDocumentDto {
  @IsInt()
  @Min(1)
  width!: number;

  @IsInt()
  @Min(1)
  height!: number;

  @IsString()
  unit!: string;

  @IsString()
  orientation!: string;

  @IsString()
  background!: string;

  @IsInt()
  @Min(72)
  dpi!: number;
}

export class SaveTemplateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  status?: "draft" | "published" | "archived";

  @ValidateNested()
  @Type(() => TemplateDocumentDto)
  document!: TemplateDocumentDto;

  @IsArray()
  elements!: Record<string, unknown>[];

  @IsArray()
  dataSchema!: Record<string, unknown>[];

  @IsObject()
  @IsOptional()
  settings?: Record<string, unknown>;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;

  @IsString()
  @IsOptional()
  versionNotes?: string;
}
