import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Film extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ nullable: true }) // A voir si on garde
  tmdbId!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
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

  @Field()
  @Column({ nullable: true })
  posterPath!: string;

  @Field()
  @Column()
  originalLanguage!: string;

  @Field()
  @Column({ nullable: true })
  actors!: string;

  @Field()
  @Column({ nullable: true })
  director!: string;
}
