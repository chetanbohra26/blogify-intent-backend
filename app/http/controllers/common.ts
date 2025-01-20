import {
  Controller,
  Dto,
  Post,
  Res,
  Response,
  Transformable,
  Validate,
} from '@intentjs/core';
import { CommonService } from 'app/services';
import { GetUploadUrlDto } from 'app/validators';

@Controller('common')
export class CommonController extends Transformable {
  constructor(
    private readonly commonService: CommonService
  ) {
    super();
  }

  @Validate(GetUploadUrlDto)
  @Post('upload-url')
  async generateUploadUrl(
    @Dto() dto: GetUploadUrlDto,
    @Res() res: Response,
  ) {
    const data = await this.commonService.getUploadUrls(dto);

    return data;
  }
}
