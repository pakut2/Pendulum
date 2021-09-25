import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../../shared/database/database.module";
import { UsersModule } from "./users/users.module";
import { FilesModule } from "./files/files.module";
import { EmailModule } from "./email/email.module";
import { EmailConfirmationModule } from "./email-confirmation/email-confirmation.module";
import configuration from "../../shared/config/configuration";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "..", "..", "client", "build"),
    }),
  ],
})
export class AppModule {}
