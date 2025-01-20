import {
  Controller,
  Dto,
  Get,
  Post,
  Req,
  Request,
  Transformable,
  UseGuards,
  Validate,
} from '@intentjs/core';
import { JwtGuard } from '../guards';
import { CreateBlogDto } from 'app/validators';
import { BlogService } from 'app/services/blog';
import { BlogTransformer } from 'app/transformers';

@Controller('blogs')
export class BlogController extends Transformable {
  constructor(
    private readonly blogService: BlogService,
  ) {
    super();
  }

  @UseGuards(JwtGuard)
  @Validate(CreateBlogDto)
  @Post()
  async createBlog(@Req() req: Request, @Dto() dto: CreateBlogDto) {
    dto.userId = req.$user?.id;

    const blog = await this.blogService.createBlog(dto);
    return this.item(blog, new BlogTransformer());
  }

  @Get()
  async getBlogs() {
    const data = await this.blogService.getBlogs();

    // running transformer parallely
    const blogTransformer = new BlogTransformer();
    const transformed = await Promise.all(
      data.map(blog => blogTransformer.transform(blog))
    );

    return transformed;
    // return this.collection(data, new BlogTransformer());
  }
}
