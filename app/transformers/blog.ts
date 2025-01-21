import { ConfigService, Storage, Transformer } from '@intentjs/core';
import { BlogModel } from 'app/models';
import { UserMinTransformer } from './userMin';

export class BlogTransformer extends Transformer {
  defaultIncludes = ['user'];

  async transform(blog: BlogModel): Promise<Record<string, any> | null> {
    const statusMap = ConfigService.get('settings.blog.statusMap');
    return {
      id: blog.id,
      title: blog.title,
      slug: await Storage.disk().signedUrl(blog.slug, 60, 'get'),
      status: statusMap[blog.status],
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  }

  async includeUser(blog: BlogModel) {
    const user = blog?.user;
    if (!user) return;

    return new UserMinTransformer().transform(user);
  }
}