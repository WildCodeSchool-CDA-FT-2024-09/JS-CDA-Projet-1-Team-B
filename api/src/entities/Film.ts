import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Category } from "./Category";

@ObjectType()
@Entity()
export class Film extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tmdbId!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  overview!: string;

  @Field()
  @Column()
  releaseDate!: string;

  @Field()
  @Column()
  popularity!: number;

  @Field()
  @Column()
  voteAverage!: number;

  @Field()
  @Column()
  voteCount!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  posterPath!: string;

  @Field({ nullable: true })
  @Column()
  originalLanguage!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  actors!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  director!: string;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.films, { cascade: true })
  @JoinTable()
  categories: Category[];
}
