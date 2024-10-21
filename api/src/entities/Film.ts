import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Film extends BaseEntity {
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
}
