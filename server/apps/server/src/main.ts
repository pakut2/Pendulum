import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { config } from "aws-sdk";
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
    region: configService.get("AWS_REGION"),
  });

  const docs = new DocumentBuilder()
    .setTitle("Pendulum")
    .setDescription("API docs")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, docs);

  SwaggerModule.setup("api/docs", app, document, {
    explorer: true,
    swaggerOptions: {
      docExpansion: "list",
      filter: true,
      showRequestDuration: true,
    },
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.enableCors();

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
bootstrap();
