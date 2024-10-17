import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { Film } from "./Film";
import { User } from "./User";

@Entity()
export class UserRating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("float")
  rating!: number;

  @ManyToOne(() => Film, (film) => film.ratings) // Une note est liée à un film
  film!: Film;

  @ManyToOne(() => User, (user) => user.ratings) // Une note est liée à un utilisateur
  user!: User;
}
