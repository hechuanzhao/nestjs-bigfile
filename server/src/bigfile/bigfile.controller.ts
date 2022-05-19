import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus, HttpException, Req } from '@nestjs/common';
import { BigfileService } from './bigfile.service';
import { CreateBigfileDto } from './dto/create-bigfile.dto';
import { UpdateBigfileDto } from './dto/update-bigfile.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ReadStream, WriteStream } from 'fs';
import multer = require('multer');
const fs = require('fs');
const path = require('path');
const outputPath = path.resolve('./uploads');
let currChunk = {}
@Controller()
export class BigfileController {
  constructor(private readonly bigfileService: BigfileService) {}
  @Post("upload")
  @UseInterceptors(AnyFilesInterceptor())
  uploadBigFile(@UploadedFiles() files, @Body() body, @Req() req){

    const [filename, fileHash, index] = req.files[0].fieldname.split('-');
    let dir = path.join(outputPath,filename)
    // 保存当前 chunk 信息，发生错误时进行返回
    currChunk = {
      filename,
      fileHash,
      index
    };

    console.log('files')
    console.log(files)
    console.log('filename')
    console.log(filename)
    console.log('fileHash')
    console.log(fileHash)
    console.log('index')
    console.log(index)
    console.log('dir')
    console.log(dir)

    // 检查文件夹是否存在如果不存在则新建文件夹
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // 覆盖文件存放的完整路径
    // files[0].path = `${dir}/${fileHash}-${index}`;
    fs.writeFile(`${dir}/${fileHash}-${index}`, files[0].buffer, (err)=>{console.log(err)})
    return { code: 2000, msg: "success" }
  }

  @Post("mergeChunks")
  @UseInterceptors(AnyFilesInterceptor())
  async mergeChunks(@UploadedFile() file, @Req() req, @Body() body){
    const { filename, size } = body;
    let filePath = path.join(outputPath, '_' + filename)
    // 合并 chunks
    const chunkDir = path.join(outputPath, filename);
    const chunkPaths = fs.readdirSync(chunkDir);

    if (!chunkPaths.length) return;

    // 根据切片下标进行排序，否则直接读取目录的获得的顺序可能会错乱
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    console.log("chunkPaths = ", chunkPaths);

    console.log('filename')
    console.log(filename)
    console.log('size')
    console.log(size)
    console.log('filepath')
    console.log(filePath)
    console.log('chunkDir')
    console.log(chunkDir)
    console.log('chunkpaths')
    console.log(chunkPaths)

    // 合并 chunks
    await mergeFileChunk(path.join(outputPath, '_' + filename), filename, size);
    return 'merge success'
  }

}


  // 通过管道处理流 
  const pipeStream = (path, writeStream) => {
    return new Promise<void>(resolve => {
      const readStream = fs.createReadStream(path);
      readStream.pipe(writeStream);
      readStream.on("end", () => {
        fs.unlinkSync(path);
        resolve();
      });
    });
  }
  
  // 合并切片
  const mergeFileChunk = async (filePath, filename, size) => {
    const chunkDir = path.join(outputPath, filename);
    const chunkPaths = fs.readdirSync(chunkDir);
  
    if (!chunkPaths.length) return;
  
    // 根据切片下标进行排序，否则直接读取目录的获得的顺序可能会错乱
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    console.log("chunkPaths = ", chunkPaths);
  
    await Promise.all(
      chunkPaths.map((chunkPath, index) =>
        pipeStream(
          path.resolve(chunkDir, chunkPath),
          // 指定位置创建可写流
          fs.createWriteStream(filePath, {
            start: index * size,
            end: (index + 1) * size
          })
        )
      )
    );
  
    // 合并后删除保存切片的目录
    fs.rmdirSync(chunkDir);
  };
  