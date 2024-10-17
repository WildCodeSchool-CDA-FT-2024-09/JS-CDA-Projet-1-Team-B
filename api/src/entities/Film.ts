import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserComments } from "./UserComments";
import { UserFavorites } from "./UserFavorites";
import { UserRating } from "./UserRating";

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  overview!: string;

  @Column()
  releaseDate!: string;

  @Column()
  popularity!: number;

  @Column()
  voteAverage!: number;

  @Column()
  voteCount!: number;

  @Column({ nullable: true })
  posterPath!: string;

  @Column()
  originalLanguage!: string;

  @Column({ nullable: true })
  actors!: string;

  @Column({ nullable: true })
  director!: string;

  @OneToMany(() => UserComments, (userComment) => userComment.film)
  comments!: UserComments[];

  @OneToMany(() => UserFavorites, (userFavorite) => userFavorite.film)
  favorites!: UserFavorites[];

  @OneToMany(() => UserRating, (userRating) => userRating.film)
  ratings!: UserRating[];
}
