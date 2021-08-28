import { Injectable } from '@nestjs/common';
import { resolveTxt } from 'node:dns';
import * as Tesseract  from 'tesseract.js'

@Injectable()
export class FileService {
  

  async extractText(path:string):Promise<string> {
   /*  Tesseract.recognize(
        path,
        "eng"
    ).then(({ data: { text } }) => {
  console.log(text);
}) */
let returnText="";
try {
    
    const worker = Tesseract.createWorker({
        logger: m => console.log(m)
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(path);
    console.log(text);
    returnText+= " " + text
    await worker.terminate();
  
} catch (error) {
    console.log(error)
}
    return returnText;
}
}