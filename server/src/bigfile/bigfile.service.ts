import { Injectable } from '@nestjs/common';
import { check } from 'prettier';
import { range } from 'rxjs';
import { CheckBigFileDto } from './dto/check-bigfie.dto';
import { CreateBigfileDto } from './dto/create-bigfile.dto';
import { UpdateBigfileDto } from './dto/update-bigfile.dto';
const fs = require('fs')
const {resolve} = require('path')
@Injectable()
export class BigfileService {

  create(createBigfileDto: CreateBigfileDto) {
    return 'This action adds a new bigfile';
  }

  findAll() {
    return `This action returns all bigfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bigfile`;
  }

  update(id: number, updateBigfileDto: UpdateBigfileDto) {
    return `This action updates a #${id} bigfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} bigfile`;
  }
}


