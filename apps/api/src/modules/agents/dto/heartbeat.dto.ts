import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class HeartbeatDto {
  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  hostname?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
