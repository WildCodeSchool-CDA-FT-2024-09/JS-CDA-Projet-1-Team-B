import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../entities/User";
import { Film } from "../entities/Film";

@ObjectType()
@Entity()
export class UserComment extends BaseEntity {
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

  @Field()
  @ManyToMany(() => Film, (film) => film.id)
  film!: Film;

  @Field()
  @ManyToMany(() => User, (user) => user.id)
  user!: User;
}
