import { PartialType } from '@nestjs/mapped-types';
import { CreateBigfileDto } from './create-bigfile.dto';

export class UpdateBigfileDto extends PartialType(CreateBigfileDto) {}
