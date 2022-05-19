import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// // 封装错误返回
// import { HttpExceptionFilter } from './common/filter/http-exception.filter';
// // dto 数据验证错误处理
// import { ValidationPipe } from './common/pipe/validation.pipe';
// // 封装正确响应请求的返回
// import { TransformInterceptor } from './common/interceptor/transform.interceptor';

import * as express from 'express';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
  // const rootDir = join(__dirname, '..');
  // app.use('/public', express.static(join(rootDir, 'public')));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new TransformInterceptor());
  



  await app.listen(3001);
}
bootstrap();
