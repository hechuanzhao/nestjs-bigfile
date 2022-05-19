import { Module } from '@nestjs/common';
import { BigfileService } from './bigfile.service';
import { BigfileController } from './bigfile.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    //文件上传路径
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  controllers: [BigfileController],
  providers: [BigfileService]
})
export class BigfileModule {}
