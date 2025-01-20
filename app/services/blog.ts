import {
  Inject,
  Injectable,
} from '@intentjs/core';
import { BlogModel } from 'app/models';
import { BlogDbRepository } from 'app/repositories';
import { CreateBlogDto, PaginationDto } from 'app/validators';
import { ulid } from 'ulid';

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_DB_REPO') private blogs: BlogDbRepository,
  ) { }

  async createBlog(inputs: CreateBlogDto): Promise<BlogModel> {
    const created = await this.blogs.create({
      id: ulid(),
      title: inputs.title,
      slug: inputs.slug,
      userId: inputs.userId,
    })
    return created;
  }

  async getBlogs(inputs: PaginationDto) {
    return this.blogs.search(inputs);
  }
}
