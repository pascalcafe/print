import { IsBoolean } from "class-validator";

export class UpdatePrinterStatusDto {
  @IsBoolean()
  isActive!: boolean;
}
