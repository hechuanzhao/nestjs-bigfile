import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { SampleDto } from './dto/sample.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  //单文件上传
  @Post("upload")
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  //多文件上传
  @Post('upload5')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFileAny(@UploadedFiles() files) {
    console.log(files);
  }

  @Post("upload/multiple")
  @UseInterceptors(FilesInterceptor("files"))
  uploadMultiple(@UploadedFiles() files, @Body() body) {
    // files 变成数组,可以传递多个文件 
    console.log(files, body);
    return "上传成功"
  }

  //批量上传图片
  @Post("image")
  @UseInterceptors(FilesInterceptor('image'))
  uploadImage(@UploadedFiles() files){
    console.log(files)
  }

  // 文件下载(原格式：二进制格式)
  @Get(':imagepath')
  @UseInterceptors(FilesInterceptor("image"))
  downloadFile(@Param("imagepath") image, @Res() res){
    
    return res.sendFile(image, {root:'uploads'})
  }




}
