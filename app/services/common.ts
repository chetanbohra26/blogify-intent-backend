import { ulid } from 'ulid';
import {
  Injectable,
  Storage,
} from '@intentjs/core';
import { GetUploadUrlDto } from 'app/validators';
import { slugify } from 'app/utils';

@Injectable()
export class CommonService {
  async getUploadUrls(inputs: GetUploadUrlDto) {
    const urls = [];
    for (let i = 0; i < inputs.n; i++) {
      let key = ulid();
      if (inputs?.fileNames.length > 0) {
        key = slugify(`${key}-${inputs.fileNames[i]}`);
      }
      if (inputs?.extensions.length > 0) {
        key = `${key}.${inputs.extensions[i]}`;
      }

      const path = `${inputs.path}/` + key;
      const url = await Storage.disk().signedUrl(path, 60, 'put');
      const signedUrl = await Storage.disk().signedUrl(path, 60, 'get');
      urls.push({ url, key: path, signedUrl });
    }

    return urls;
  }
}
