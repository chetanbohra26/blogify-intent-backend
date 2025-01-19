import { ConfigService, Transformer } from '@intentjs/core';
import { BlogModel } from 'app/models';

export class BlogTransformer extends Transformer {
  async transform(blog: BlogModel): Promise<Record<string, any> | null> {
    const statusMap = ConfigService.get('settings.blog.statusMap');
    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      status: statusMap[blog.status],
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  }
}