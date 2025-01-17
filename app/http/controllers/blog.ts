import {
  Controller,
  Post,
  Transformable,
} from '@intentjs/core';

@Controller('blogs')
export class BlogController extends Transformable {

  @Post()
  async createBlog() {
    return {
      success: true,
      message: 'Blog created',
    }
  }
}
