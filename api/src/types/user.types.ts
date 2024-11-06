import { Avatar } from "./avatar.types";
import { BaseEntity } from "typeorm";

export interface User extends BaseEntity {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: Avatar;
}
