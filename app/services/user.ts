import {
  Inject,
  Injectable,
} from '@intentjs/core';
import { UserDbRepository } from 'app/repositories';
import { GetProfileDto } from 'app/validators';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_DB_REPO') private users: UserDbRepository,
  ) { }

  async getProfile(inputs: GetProfileDto) {
    const user = inputs.user;
    return user;
  }
}
