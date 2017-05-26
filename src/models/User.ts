import { Entity, Column, OneToMany } from "typeorm"

@Entity()
export class User {
  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  elfPassword: string;

  @Column()
  salt: string;

  @Column()
  elfsignintime: string

  @Column()
  elfname: string;

  @Column()
  resetPasswordToken: string

  @Column()
  resetPasswordExpires: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
