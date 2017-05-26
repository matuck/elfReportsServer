import { Entity, Column, ManyToOne } from "typeorm"

@Entity()
export class Item {
  @Column()
  name: string;

  @ManyToOne(type => Child, child => child.list)
  child: Child;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
