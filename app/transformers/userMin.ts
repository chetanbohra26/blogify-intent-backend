import { Transformer } from '@intentjs/core';
import { UserModel } from 'app/models';

export class UserMinTransformer extends Transformer {
  async transform(user: UserModel): Promise<Record<string, any> | null> {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
