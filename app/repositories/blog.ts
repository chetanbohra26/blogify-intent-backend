import { DatabaseRepository, Injectable, InjectModel } from '@intentjs/core';
import { BlogModel } from 'app/models';

@Injectable()
export class BlogDbRepository extends DatabaseRepository<BlogModel> {
  @InjectModel(BlogModel)
  model: BlogModel;
}
