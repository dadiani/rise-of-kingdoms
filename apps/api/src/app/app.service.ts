import { Injectable } from '@nestjs/common';
import { Message } from '@rise-of-kingdoms/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
