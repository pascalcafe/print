import { IsOptional, IsString } from "class-validator";

export class SubmitTemplateReviewDto {
  @IsOptional()
  @IsString()
  notes?: string;
}
