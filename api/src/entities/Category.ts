// entities/Category.ts
import { Entity, PrimaryColumn, Column, ManyToMany, BaseEntity } from "typeorm";
import { Film } from "./Film";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Film])
  @ManyToMany(() => Film, (film) => film.categories)
  films: Film[];
}
