import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ExchangeOidcLoginDto {
  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsUrl()
  @IsNotEmpty()
  redirectUri!: string;
}
