import {
  Controller,
  Dto,
  Get,
  Post,
  Req,
  Request,
  Res,
  Response,
  Transformable,
  UseGuards,
  Validate,
} from '@intentjs/core';
import { JwtGuard } from '../guards';
import { CreateBlogDto, PaginationDto } from 'app/validators';
import { BlogService } from 'app/services';
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

  @Validate(PaginationDto)
  @Get()
  async getBlogs(
    @Dto() dto: PaginationDto,
    @Res() res: Response,
  ) {
    const data = await this.blogService.getBlogs(dto);

    return this.paginate(data, new BlogTransformer());
  }
}
