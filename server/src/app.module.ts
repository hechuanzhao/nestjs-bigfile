import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
import { FileModule } from './file/file.module';
import { BigfileModule } from './bigfile/bigfile.module';
import * as nuid from 'nuid';

@Module({
  imports: [

    FileModule,

    BigfileModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
