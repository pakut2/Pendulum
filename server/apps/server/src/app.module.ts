import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../../shared/database/database.module";
import { UsersModule } from "./users/users.module";
import { FilesModule } from "./files/files.module";
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import configuration from "../../shared/config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    AuthModule,
    PostsModule,
    UsersModule,
    FilesModule,
    EmailModule,
    EmailConfirmationModule,
  ],
})
export class AppModule {}

// TODO
//! file upload : front - s3 direct / signed url
//* exports
