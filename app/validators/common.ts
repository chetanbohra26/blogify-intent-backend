import { ALLOWED_UPLOAD_PATHS } from "app/constants";
import { Transform } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, ValidateIf } from "class-validator";

export class GetUploadUrlDto {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  n: number;

  @IsIn(ALLOWED_UPLOAD_PATHS)
  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  extensions: string[];

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  fileNames: string[];
}

export class PaginationDto {
  @Transform((data) => data && data.value == 'true' ? true : false)
  paginate: boolean

  @ValidateIf((obj) => obj && obj.paginate)
  @Transform((obj) => parseInt(obj.value))
  @IsPositive()
  page: number

  @ValidateIf((obj) => obj && obj.paginate)
  @Transform((obj) => parseInt(obj.value))
  @IsPositive()
  perPage: number;
}

export class PaginatedQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  q: string;
}