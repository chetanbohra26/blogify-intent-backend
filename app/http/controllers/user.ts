import {
  Controller,
  Dto,
  Get,
  Req,
  Request,
  Transformable,
  UseGuards,
  Validate,
} from '@intentjs/core';
import { UserTransformer } from 'app/transformers';
import { JwtGuard } from '../guards';
import { UserService } from 'app/services';
import { GetProfileDto } from 'app/validators';

@Controller('users')
export class UserController extends Transformable {
  constructor(
    private readonly usersService: UserService,
  ) {
    super();
  }

  @UseGuards(JwtGuard)
  @Validate(GetProfileDto)
  @Get('profile')
  async getProfile(@Req() req: Request, @Dto() dto: GetProfileDto) {
    dto.user = req.$user;

    const user = await this.usersService.getProfile(dto);
    return this.item(user, new UserTransformer());
  }
}
