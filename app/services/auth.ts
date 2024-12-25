import {
  Inject,
  Injectable,
  ConfigService,
  Unauthorized,
  ValidationFailed,
} from '@intentjs/core';
import { UserModel } from 'app/models/userModel';
import { UserDbRepository } from 'app/repositories/userDbRepository';
import {
  LoginDto,
  RegisterDto,
} from 'app/validators/auth';
import { compareSync, hashSync } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ulid } from 'ulid';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    @Inject('USER_DB_REPO') private users: UserDbRepository,
  ) { }

  async register(dto: RegisterDto): Promise<UserModel> {
    const existingUser = await this.users.firstWhere(
      { email: dto.email },
      false,
    );

    if (existingUser) {
      throw new ValidationFailed({
        email: ['Email is already used by another account!'],
      });
    }

    const user = await this.users.create({
      id: ulid(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashSync(dto.password, 10),
    });

    user.token = await this.makeToken({
      sub: user.id,
      env: this.config.get('app.env'),
    });

    return user;
  }

  async login(dto: LoginDto): Promise<UserModel> {
    const user = await this.users.firstWhere({ email: dto.email });

    if (!compareSync(dto.password, user.password)) {
      throw new Unauthorized();
    }

    user.token = await this.makeToken({
      sub: user.id,
      env: this.config.get('app.env'),
    });

    return user;
  }

  async verifyToken(token: string): Promise<Record<string, any>> {
    const payload = (await verify(
      token,
      this.config.get('auth.secret') as string,
      { issuer: this.config.get('app.url') as string },
    )) as JwtPayload;

    return payload;
  }

  async makeToken(payload: Record<string, any>): Promise<string> {
    return sign(payload, this.config.get('auth.secret') as string, {
      issuer: this.config.get('app.url') as string,
      expiresIn: this.config.get('auth.ttl') as string,
    });
  }
}
