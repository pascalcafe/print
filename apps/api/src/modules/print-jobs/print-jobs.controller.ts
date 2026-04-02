import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { CreatePrintJobEventDto } from "./dto/create-print-job-event.dto";
import { CreatePrintJobDto } from "./dto/create-print-job.dto";
import { RepeatPrintJobDto } from "./dto/repeat-print-job.dto";
import { PrintJobsService } from "./print-jobs.service";

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("print-jobs")
export class PrintJobsController {
  constructor(private readonly printJobsService: PrintJobsService) {}

  @Get()
  @Permissions("print-job.view")
  list(
    @CurrentSession() session: SessionUser,
    @Query("search") search?: string,
    @Query("status") status?: string
  ) {
    return this.printJobsService.list(session.tenantId, { search, status });
  }

  @Get(":id")
  @Permissions("print-job.view")
  getById(@Param("id") id: string, @CurrentSession() session: SessionUser) {
    return this.printJobsService.getById(id, session.tenantId);
  }

  @Post()
  @Permissions("print-job.test")
  create(@Body() body: CreatePrintJobDto, @CurrentSession() session: SessionUser) {
    return this.printJobsService.create(body, session);
  }

  @Post(":id/events")
  @Permissions("print-job.test")
  appendEvent(
    @Param("id") id: string,
    @Body() body: CreatePrintJobEventDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.printJobsService.appendEvent(id, body, session);
  }

  @Post("test")
  @Permissions("print-job.test")
  createTest(@Body() body: CreatePrintJobDto, @CurrentSession() session: SessionUser) {
    return this.printJobsService.createTest(body, session);
  }

  @Post(":id/reprint")
  @Permissions("print-job.reprint")
  reprint(
    @Param("id") id: string,
    @Body() body: RepeatPrintJobDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.printJobsService.reprint(id, body, session);
  }

  @Post(":id/retry")
  @Permissions("print-job.retry")
  retry(
    @Param("id") id: string,
    @Body() body: RepeatPrintJobDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.printJobsService.retry(id, body, session);
  }

  @Post(":id/cancel")
  @Permissions("print-job.cancel")
  cancel(@Param("id") id: string, @CurrentSession() session: SessionUser) {
    return this.printJobsService.cancel(id, session);
  }
}
