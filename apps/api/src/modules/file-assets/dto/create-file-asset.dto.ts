import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateFileAssetDto {
  @IsString()
  @IsNotEmpty()
  filename!: string;

  @IsString()
  @IsNotEmpty()
  mimeType!: string;

  @IsString()
  @IsNotEmpty()
  storageKey!: string;

  @IsInt()
  @Min(1)
  sizeInBytes!: number;

  @IsString()
  @IsOptional()
  metadataJson?: string;
}
