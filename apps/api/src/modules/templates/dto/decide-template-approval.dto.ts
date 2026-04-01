import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DecideTemplateApprovalDto {
  @IsString()
  @IsIn(["approved", "rejected"])
  decision!: "approved" | "rejected";

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
