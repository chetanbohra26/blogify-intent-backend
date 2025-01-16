import { ConfigService, Transformer } from '@intentjs/core';
import { UserModel } from 'app/models';

export class UserTransformer extends Transformer {
  async transform(user: UserModel): Promise<Record<string, any> | null> {
    const statusMap = ConfigService.get('settings.user.statusMap');
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: statusMap[user.status],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: user?.token,
    };
  }
}
