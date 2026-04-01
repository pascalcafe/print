import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from "class-validator";

export class CreateIdentityProviderDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsIn(["OIDC", "SAML"])
  type!: "OIDC" | "SAML";

  @IsUrl()
  issuerUrl!: string;

  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsOptional()
  @IsString()
  clientSecret?: string;

  @IsOptional()
  @IsUrl()
  authorizationUrl?: string;

  @IsOptional()
  @IsUrl()
  tokenUrl?: string;

  @IsOptional()
  @IsUrl()
  userInfoUrl?: string;

  @IsOptional()
  @IsArray()
  scopes?: string[];

  @IsOptional()
  claimMapping?: Record<string, string>;

  @IsOptional()
  @IsBoolean()
  autoProvisionUsers?: boolean;

  @IsOptional()
  @IsBoolean()
  autoLinkByEmail?: boolean;
}
