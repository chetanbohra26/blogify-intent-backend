import {
  Controller,
  Get,
  Req,
  Request,
  Transformable,
  UseGuards,
} from '@intentjs/core';
import { UserTransformer } from 'app/transformers';
import { JwtGuard } from '../guards';
import { UserModel } from 'app/models';

@Controller('users')
export class UserController extends Transformable {
  constructor() {
    super();
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: Request) {
    console.log(req.all())
    const user: UserModel = req.$user;
    return this.item(user, new UserTransformer());
  }
}
