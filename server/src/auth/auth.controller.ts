import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import RegisterDto from "./dto/register.dto";
import { LocalAuthenticationGuard } from "./guards/local.guard";
import RequestWithUser from "./interfaces/requestWithUser";
import { Response } from "express";
import JwtAuthenticationGuard from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("login")
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader("Set-Cookie", cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post("logout")
  async logout(@Res() response: Response) {
    response.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
