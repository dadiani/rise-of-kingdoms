import {
  Bind,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Message } from '@rise-of-kingdoms/api-interfaces';
import { AppService } from './app.service';
import { diskStorage, Multer } from 'multer';
import {} from 'multer';
import { extname } from 'path';
import * as xlsx from 'xlsx';
import * as multipart from 'parse-multipart';
import { FileService } from './file-service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly fileService:FileService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('fileStat', {
      storage: diskStorage({
        destination: './temp/uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  /* {dest:"./temp/uploads"} @Bind() */
  uploadFile(@Req() request: Request, @UploadedFile() file) {
    console.log('#########');
    console.log(request);
    console.log(file);

   /*  const boundary = multipart.getBoundary(request.headers['content-type']);
    const files = multipart.Parse(Buffer.from(file), boundary); */
    /*  if (!workbook.Sheets.formData) {
      throw new Error('Partenaires sheet was not found');
    } */
    /* const xlx = new File('./'); */
    /* const fileData = files[0].data;
    console.log(fileData); */
    const workbook = xlsx.readFile(file.path);
    const rawFitters: any = xlsx.utils.sheet_to_json(workbook.Sheets.kvkData);
    if (!rawFitters.length) {
      throw new Error('The input file was found empty');
    }
    console.log(rawFitters);
  }

  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('fileStat', {
      storage: diskStorage({
        destination: './temp/images',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  /* {dest:"./temp/uploads"} @Bind() */
  async extractTextFromFile(@Req() request: Request, @UploadedFile() file) {
    console.log('#########');
    console.log(request);
    console.log(file);

   /*  const boundary = multipart.getBoundary(request.headers['content-type']);
    const files = multipart.Parse(Buffer.from(file), boundary); */
    /*  if (!workbook.Sheets.formData) {
      throw new Error('Partenaires sheet was not found');
    } */
    /* const xlx = new File('./'); */
    /* const fileData = files[0].data;
    console.log(fileData); */
    return await this.fileService.extractText("./temp/images/"+file?.filename)
  }
}
