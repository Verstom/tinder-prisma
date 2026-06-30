import { Injectable } from '@nestjs/common';

@Injectable()
export class InteractionsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
