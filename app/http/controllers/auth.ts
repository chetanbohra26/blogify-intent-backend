import {
  Body,
  Controller,
  Post,
  Transformable,
  Validate,
} from '@intentjs/core';
import { AuthService } from 'app/services';
import { MailService } from 'app/services/mail';
import { UserTransformer } from 'app/transformers';
import { LoginDto, RegisterDto } from 'app/validators';

@Controller('auth')
export class AuthController extends Transformable {
  constructor(
    private readonly auth: AuthService,
    private readonly mailService: MailService,
  ) {
    super();
  }

  @Post('register')
  @Validate(RegisterDto)
  async register(@Body() dto: RegisterDto) {
    console.log(dto);
    const user = await this.auth.register(dto);

    await this.mailService.welcomeMail(user.firstName, user.email);

    return this.item(user, new UserTransformer());
  }

  @Post('login')
  @Validate(LoginDto)
  async login(@Body() dto: LoginDto) {
    const user = await this.auth.login(dto);
    return this.item(user, new UserTransformer());
  }
}
