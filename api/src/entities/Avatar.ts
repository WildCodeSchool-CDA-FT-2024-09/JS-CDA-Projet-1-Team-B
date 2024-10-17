import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  image!: string;
}
