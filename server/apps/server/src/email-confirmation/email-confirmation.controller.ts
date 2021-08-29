import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from "@nestjs/common";
import { ConfirmEmailDto } from "./dto/confirmEmail.dto";
import { EmailConfirmationService } from "./email-confirmation.service";

@Controller("email-confirmation")
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Post("confirm")
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  @Post("resend-confirmation-link/:id")
  async resendConfirmationLink(@Param("id") id: string) {
    await this.emailConfirmationService.resendConfirmationLink(id);
  }
}
