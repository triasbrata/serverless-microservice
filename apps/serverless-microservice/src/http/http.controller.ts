import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HttpController {
  @Get()
  hello() {
    return 'hello';
  }
}
