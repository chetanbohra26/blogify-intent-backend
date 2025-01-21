import { BaseModel } from "@intentjs/core";
import { Model } from "objection";
import { UserModel } from "./user";

export class BlogModel extends BaseModel {
  static tableName = 'blogs';

  id?: string;
  userId?: string;
  title?: string;
  slug?: string;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // related
  user?: UserModel;

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "blogs.userId",
          to: "users.id",
        },
      },
    };
  }
}