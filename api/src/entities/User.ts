import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Avatar } from "./Avatar";
import { UserComments } from "./UserComments";
import { UserFavorites } from "./UserFavorites";
import { UserRating } from "./UserRating";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToOne(() => Avatar) // Chaque utilisateur a un avatar unique
  @JoinColumn()
  avatar!: Avatar;

  @OneToMany(() => UserComments, (userComment) => userComment.user) // Un utilisateur peut faire plusieurs commentaires
  comments!: UserComments[];

  @OneToMany(() => UserFavorites, (userFavorite) => userFavorite.user) // Un utilisateur peut avoir plusieurs favoris
  favorites!: UserFavorites[];

  @OneToMany(() => UserRating, (userRating) => userRating.user) // Un utilisateur peut noter plusieurs films
  ratings!: UserRating[];
}
