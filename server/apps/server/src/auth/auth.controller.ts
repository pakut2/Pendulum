import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import RegisterDto from "./dto/register.dto";
import { LocalAuthenticationGuard } from "./guards/local.guard";
import RequestWithUser from "./interfaces/requestWithUser";
import JwtAuthenticationGuard from "./guards/jwt.guard";
import { EmailConfirmationService } from "../email-confirmation/email-confirmation.service";
import { EmailConfirmationGuard } from "../email-confirmation/guards/email-confirmation.guard";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Post("register")
  async register(@Body() registrationData: RegisterDto) {
    const user = await this.authService.register(registrationData);
    await this.emailConfirmationService.sendVerificationLink(
      registrationData.email
    );
    return user;
  }

  @HttpCode(200)
  @UseGuards(EmailConfirmationGuard)
  @UseGuards(LocalAuthenticationGuard)
  @Post("login")
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    request.res.setHeader("Set-Cookie", cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post("logout")
  async logout(@Req() request: RequestWithUser) {
    request.res.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
    request.res.sendStatus(200);
  }
}
