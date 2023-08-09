import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }));
  
  const config = new DocumentBuilder().addBearerAuth()
    .setTitle('Rejuvenics')
    .setDescription('Rejuvenics API description')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
  });
}
bootstrap();
