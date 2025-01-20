import { DatabaseRepository, Injectable, InjectModel, Pagination } from '@intentjs/core';
import { BlogModel } from 'app/models';
import { PaginationDto } from 'app/validators';

@Injectable()
export class BlogDbRepository extends DatabaseRepository<BlogModel> {
  @InjectModel(BlogModel)
  model: BlogModel;

  async search(inputs: PaginationDto): Promise<Pagination<BlogModel>> {
    const query = this.query();

    if (inputs.paginate === false) {
      return query.allPages<BlogModel>();
    }
    return query.paginate<BlogModel>(inputs?.page, inputs?.perPage)
  }
}
