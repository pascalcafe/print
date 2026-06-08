import { Controller, Get, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { ObservabilityService } from "./observability.service";

@Controller()
export class ObservabilityController {
  constructor(private readonly observabilityService: ObservabilityService) {}

  @Get("health/live")
  live() {
    return this.observabilityService.getLiveness();
  }

  @Get("health/ready")
  ready() {
    return this.observabilityService.getReadiness();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get("observability/metrics")
  @Permissions("observability.view")
  metrics() {
    return this.observabilityService.getMetrics();
  }
}
