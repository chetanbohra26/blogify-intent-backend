import { UserModel } from "app/models";
import { IsOptional } from "class-validator";

export class GetProfileDto {
    @IsOptional()
    user: UserModel;
}
