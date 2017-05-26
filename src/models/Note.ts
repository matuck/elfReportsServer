import { Entity, Column, ManyToOne } from "typeorm"

@Entity()
export class Note {
  @Column()
  good: boolean;

  @Column()
  text: string;

  @ManyToOne(type => Child, child => child.notes)
  child: Child;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
