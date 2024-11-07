import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Avatar } from "./Avatar";
import { UserComment } from "../entities/UserComment";
import { UserRating } from "../entities/UserRating";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: false })
  @Column({ type: "varchar", length: 10, unique: true })
  username!: string;

  @Field({ nullable: false })
  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Field(() => Avatar)
  @ManyToOne(() => Avatar, (avatar) => avatar.user, {
    cascade: true,
  })
  avatar!: Avatar;

  @Field(() => [UserComment], { nullable: true })
  @OneToMany(() => UserComment, (UserComment) => UserComment.user, {
    onDelete: "CASCADE",
  })
  comment?: UserComment[];

  @Field(() => [UserRating], { nullable: true })
  @OneToMany(() => UserRating, (UserRating) => UserRating.user, {
    onDelete: "CASCADE",
  })
  rating?: UserRating[];
}
