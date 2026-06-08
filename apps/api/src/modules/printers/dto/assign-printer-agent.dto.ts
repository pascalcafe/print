import { IsOptional, IsString } from "class-validator";

export class AssignPrinterAgentDto {
  @IsOptional()
  @IsString()
  agentNodeId?: string;
}
