import {
  Controller,
  Transformable,
} from '@intentjs/core';

@Controller('blogs')
export class BlogController extends Transformable {
  constructor() {
    super();
  }
}
