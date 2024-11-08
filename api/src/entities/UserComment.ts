import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../entities/User";
import { Film } from "../entities/Film";

@ObjectType()
@Entity()
export class UserComment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    update: false,
  })
  created_at!: Date;

  @Field()
  @UpdateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    update: true,
  })
  updated_at!: Date;

  @Field()
  @Column()
  content!: string;

  @Field(() => Film)
  @ManyToOne(() => Film, (Film) => Film.comment, { cascade: true })
  film!: Film;

  @Field(() => User)
  @ManyToOne(() => User, (User) => User.comment, { cascade: true })
  user!: User;
}
