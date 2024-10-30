import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Avatar } from "./Avatar";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: false })
  @Column({ type: "varchar", length: 10 })
  username!: string;

  @Field({ nullable: false })
  @Column({ type: "varchar", unique: true })
  email!: string;

  @Field({ nullable: false })
  @Column({ type: "varchar" })
  password!: string;

  @Field(() => Avatar)
  @ManyToOne(() => Avatar, { nullable: false })
  avatar!: Avatar;
}
