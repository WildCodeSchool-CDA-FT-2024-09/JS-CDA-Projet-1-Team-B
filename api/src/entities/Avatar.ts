import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { User } from "./User";
@ObjectType()
@Entity()
export class Avatar extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: false })
  @Column({ type: "varchar", length: 255 })
  image!: string;

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (User) => User.avatar)
  user?: User[];
}
