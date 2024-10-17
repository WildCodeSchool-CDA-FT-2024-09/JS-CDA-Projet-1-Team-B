import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./Film";
import { User } from "./User";

@Entity()
export class UserFavorites {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Film, (film) => film.favorites) // Un favori est lié à un film
  film!: Film;

  @ManyToOne(() => User, (user) => user.favorites) // Un favori est lié à un utilisateur
  user!: User;
}
