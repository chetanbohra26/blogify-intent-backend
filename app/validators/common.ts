import { ALLOWED_UPLOAD_PATHS } from "app/constants";
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

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
