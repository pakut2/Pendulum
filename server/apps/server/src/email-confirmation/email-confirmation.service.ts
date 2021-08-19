import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService
  ) {}

  sendVerificationLink(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_VERIFICATION_TOKEN_SECRET"),
      expiresIn: "21600",
    });

    const url = `${this.configService.get("EMAIL_CONFIRMATION_URL")}/${token}`;

    const html = `<!DOCTYPE html><html><style>div{text-align: center;}button {background:#375a7f;padding:1rem;border-radius:0.5rem;}a{text-decoration;none;color:#fff;}</style><body><div><h1>Welcome to Pendulum!</h1><button><a href="${url}">Click here to confirm email address</a></button></div></body></html>`;

    return this.emailService.sendMail({
      to: email,
      subject: "Email Confirmation",
      html,
    });
  }

  async confirmEmail(email: string) {
    const user = await this.usersService.getByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException("Email already confirmed");
    }
    await this.usersService.markEmailAsConfirmed(email);
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get("JWT_VERIFICATION_TOKEN_SECRET"),
      });

      if (typeof payload === "object" && "email" in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === "TokenExpiredError") {
        throw new BadRequestException("Email confirmation token expired");
      }
      throw new BadRequestException("Bad confirmation token");
    }
  }

  async resendConfirmationLink(userId: string) {
    const user = await this.usersService.getById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException("Email already confirmed");
    }
    await this.sendVerificationLink(user.email);
  }
}
