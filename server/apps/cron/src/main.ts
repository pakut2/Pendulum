import { NestFactory } from "@nestjs/core";
import { CronModule } from "./cron.module";
import { CronService } from "./cron.service";
declare const module: any;

async function bootstrap() {
  const cron = await NestFactory.create(CronModule);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => cron.close());
  }

  const PORT = process.env.PORT_CRON || 5001;
  await cron.listen(PORT);

  const cronService = cron.get(CronService);
  cronService.postJob();
}
bootstrap();
