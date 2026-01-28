import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(@Req() req): string {
    return `Hello ${req.user.preferred_username}`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  getPrivate() {
    return 'Authenticated only!';
  }
}
