import { Entity, Column, OneToMany } from "typeorm"

@Entity()
export class Child {
  @Column()
  name: string;

  @Column()
  percent: number;

  @OneToMany(type => Note, note => note.child)
  notes: Note[];

  @OneToMany(type => Item, item => item.child)
  list: Item[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
