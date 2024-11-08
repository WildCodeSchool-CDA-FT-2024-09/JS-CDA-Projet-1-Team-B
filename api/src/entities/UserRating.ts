import "reflect-metadata";
import { Field, Float, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../entities/User";
import { Film } from "../entities/Film";

@ObjectType()
@Entity()
export class UserRating extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Film)
  @ManyToOne(() => Film, (Film) => Film.rating, { cascade: true })
  film!: Film;

  @Field(() => User)
  @ManyToOne(() => User, (User) => User.rating, { cascade: true })
  user!: User;

  @Field(() => Float)
  @Column()
  rating!: number;
}
