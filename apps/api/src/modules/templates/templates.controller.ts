import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { CreateTemplateVersionDto } from "./dto/create-template-version.dto";
import { DecideTemplateApprovalDto } from "./dto/decide-template-approval.dto";
import { SaveTemplateDto } from "./dto/save-template.dto";
import { SignatureConfirmationDto } from "./dto/signature-confirmation.dto";
import { SubmitTemplateReviewDto } from "./dto/submit-template-review.dto";
import { TemplatesService } from "./templates.service";

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("templates")
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @Permissions("template.view")
  list(
    @CurrentSession() session: SessionUser,
    @Query("search") search?: string,
    @Query("status") status?: string
  ) {
    return this.templatesService.list(session.tenantId, { search, status });
  }

  @Get(":id")
  @Permissions("template.view")
  getById(@Param("id") id: string, @CurrentSession() session: SessionUser) {
    return this.templatesService.getById(id, session.tenantId);
  }

  @Get(":id/versions")
  @Permissions("template.view")
  versions(@Param("id") id: string, @CurrentSession() session: SessionUser) {
    return this.templatesService.listVersions(id, session.tenantId);
  }

  @Get(":id/approvals")
  @Permissions("template.view")
  approvals(@Param("id") id: string, @CurrentSession() session: SessionUser) {
    return this.templatesService.listApprovals(id, session.tenantId);
  }

  @Get(":id/versions/:version/compare/:againstVersion")
  @Permissions("template.view")
  compareVersions(
    @Param("id") id: string,
    @Param("version", ParseIntPipe) version: number,
    @Param("againstVersion", ParseIntPipe) againstVersion: number,
    @CurrentSession() session: SessionUser
  ) {
    return this.templatesService.compareVersions(id, version, againstVersion, session.tenantId);
  }

  @Post(":id/versions/:version/rollback")
  @Permissions("template.rollback")
  rollback(
    @Param("id") id: string,
    @Param("version", ParseIntPipe) version: number,
    @Body() body: SignatureConfirmationDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.templatesService.rollback(id, version, body, session);
  }

  @Post(":id/versions")
  @Permissions("template.version.create")
  createVersion(
    @Param("id") id: string,
    @Body() body: CreateTemplateVersionDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.templatesService.createVersion(id, body, session);
  }

  @Post()
  @Permissions("template.edit")
  create(@Body() body: SaveTemplateDto, @CurrentSession() session: SessionUser) {
    return this.templatesService.create(body, session);
  }

  @Put(":id")
  @Permissions("template.edit")
  update(
    @Param("id") id: string,
    @Body() body: SaveTemplateDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.templatesService.update(id, body, session);
  }

  @Post(":id/review")
  @Permissions("template.review")
  submitReview(
    @Param("id") id: string,
    @Body() body: SubmitTemplateReviewDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.templatesService.submitReview(id, body, session);
  }

  @Post(":id/approval")
  @Permissions("template.approve", "template.sign")
  decideApproval(
    @Param("id") id: string,
    @Body() body: DecideTemplateApprovalDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.templatesService.decideApproval(id, body, session);
  }

  @Post(":id/publish")
  @Permissions("template.publish", "template.sign")
  publish(
    @Param("id") id: string,
    @Body() body: SignatureConfirmationDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.templatesService.publish(id, body, session);
  }
}
