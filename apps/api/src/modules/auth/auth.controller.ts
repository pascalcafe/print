import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CurrentSession } from "./decorators/current-session.decorator";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import type { SessionUser } from "./types/session-user";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentSession() session: SessionUser) {
    return this.authService.me(session);
  }
}
