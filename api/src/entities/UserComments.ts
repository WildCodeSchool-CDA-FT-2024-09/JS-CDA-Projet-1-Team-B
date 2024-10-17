import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Film } from "./Film";
import { User } from "./User";

@Entity()
export class UserComments {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column({ type: "datetime" })
  createdAt!: Date;

  @Column({ type: "datetime" })
  updatedAt!: Date;

  @ManyToOne(() => Film, (film) => film.comments) // Un commentaire est lié à un film
  film!: Film;

  @ManyToOne(() => User, (user) => user.comments) // Un commentaire est lié à un utilisateur
  user!: User;
}
