import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class StartOidcLoginDto {
  @IsOptional()
  @IsString()
  tenantSlug?: string;

  @IsUrl()
  @IsNotEmpty()
  redirectUri!: string;
}
