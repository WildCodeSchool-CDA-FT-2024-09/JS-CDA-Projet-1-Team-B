import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Avatar } from "./Avatar";

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

  @Field({ nullable: false })
  @Column({ type: "varchar" })
  password!: string;

  @Field(() => Avatar)
  @ManyToOne(() => Avatar, (avatar) => avatar.id)
  avatar!: Avatar;
}
