import "reflect-metadata";
import { Field, Float, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Column,
} from "typeorm";
import { User } from "../entities/User";
import { Film } from "../entities/Film";

@ObjectType()
@Entity()
export class UserRating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToMany(() => Film, (film) => film.id)
  film!: Film;

  @Field()
  @ManyToMany(() => User, (user) => user.id)
  user!: User;

  @Field(() => Float)
  @Column()
  rating!: number;
}
